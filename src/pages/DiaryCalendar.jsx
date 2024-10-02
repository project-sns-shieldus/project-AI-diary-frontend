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

const DiaryCalendar = () => {
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
          // 날짜 문자열을 Date 객체로 변환
          const date = parse(entry.diaryDate, 'yyyy-MM-dd', new Date());
          const diaryDate = format(date, 'yyyy-MM-dd');
          diaryDataTemp[diaryDate] = {
            diaryId: entry.diaryId,
            title: entry.title,
          };
        });

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

  const RenderHeader = () => (
    <div className="header row flex-middle">
      <div className="col col-start">
        <span className="text">
          <span className="text month">{format(currentMonth, 'M')}월 </span>
          {format(currentMonth, 'yyyy')}
        </span>
      </div>
      <div className="col col-end">
        <Icon
          icon="bi:arrow-left-circle-fill"
          onClick={prevMonth}
          className="nav-icon"
        />
        <Icon
          icon="bi:arrow-right-circle-fill"
          onClick={nextMonth}
          className="nav-icon"
        />
      </div>
    </div>
  );

  const RenderDays = () => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    return (
      <div className="days row">
        {daysOfWeek.map((day, index) => (
          <div className="col col-center" key={index}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const RenderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const formattedFullDate = format(day, 'yyyy-MM-dd');
        const isDiaryExist = diaryData[formattedFullDate];
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);
        const cloneDay = new Date(day); // 날짜 객체 복사

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
            {/* 일기가 있는 날짜에 표시 */}
            {isDiaryExist && (
              <div className="diary-dot" title={isDiaryExist.title}></div>
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
    <div className="calendar-wrapper">
      <div className="calendar">
        <RenderHeader />
        <RenderDays />
        <RenderCells />
      </div>
    </div>
  );
};

export default DiaryCalendar;
