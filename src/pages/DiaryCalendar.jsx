import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parse,
} from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DiaryCalendar.css';
import './common.css';
import './theme.css';

export const DiaryCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaryData = async () => {
      const email = localStorage.getItem('email');
      console.log('Email from localStorage:', email);

      if (!email) {
        console.error('No email found in localStorage');
        return;
      }

      try {
        const token = localStorage.getItem('accessToken');
        console.log('Access Token:', token);

        const response = await axios.get(
          `http://localhost:8080/api/diary/get/byEmail/${email}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`,
            },
          }
        );

        const diaryEntries = response.data;
        const diaryDataTemp = {};

        diaryEntries.forEach((entry) => {
          console.log('Entry Diary Date:', entry.diaryDate);
          // 날짜 문자열을 로컬 타임존의 Date 객체로 파싱
          const date = parse(entry.diaryDate, 'yyyy-MM-dd', new Date());
          const diaryDate = format(date, 'yyyy-MM-dd');
          diaryDataTemp[diaryDate] = {
            diaryId: entry.diaryId,
            title: entry.title,
          };
        });

        console.log('Diary Data Temp:', diaryDataTemp);

        setDiaryData(diaryDataTemp);
      } catch (error) {
        console.error('Error fetching diary data:', error);
      }
    };

    fetchDiaryData();
  }, []);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
  const selectedDateFormatted = format(day, 'yyyy-MM-dd');

  if (diaryData[selectedDateFormatted]) {
    navigate(`/diary/${diaryData[selectedDateFormatted].diaryId}`, {
      state: { selectedDate: selectedDateFormatted },
    });
  } else {
    navigate('/creatediary', { state: { selectedDate: selectedDateFormatted } });
  }

  setSelectedDate(day);
};


  const RenderHeader = () => {
    return (
      <div className="header row">
        <div className="col col-start">
          <span className="text">
            <span className="text month">{format(currentMonth, 'M')}월</span>
            {format(currentMonth, 'yyyy')}
          </span>
        </div>
        <div className="col col-end">
          <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
          <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
        </div>
      </div>
    );
  };

  const RenderDays = () => {
    const days = [];
    const dateNames = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col" key={i}>
          {dateNames[i]}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const RenderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
          formattedDate = format(day, 'd');
          const cloneDay = new Date(day); // 날짜 객체 복사
          const formattedFullDate = format(day, 'yyyy-MM-dd');
          const isDiaryExist = diaryData[formattedFullDate];
          console.log('Date:', formattedFullDate, 'Diary Exists:', isDiaryExist);

        days.push(
          <div
            className={`col cell ${
              isSameMonth(day, monthStart) ? 'valid' : 'disabled'
            } ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className={`number ${!isSameMonth(day, monthStart) ? 'not-valid' : ''}`}>
              {formattedDate}
            </span>
            {/* 일기가 있는 날짜에 제목 표시 */}
            {isDiaryExist && isDiaryExist.title && (
              <div className="diary-title">{isDiaryExist.title}</div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  return (
    <div className="calendar">
      <RenderHeader />
      <RenderDays />
      <RenderCells />
    </div>
  );
};

export default DiaryCalendar;
