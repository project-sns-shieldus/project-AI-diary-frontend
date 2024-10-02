import React, { useState } from 'react';
import Trans from './trans';
import { useNavigate } from 'react-router-dom';

const Test = () => {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    return (
        <div>
            <textarea 
                placeholder="번역할 텍스트를 입력하세요" 
                value={inputText}
                onChange={handleInputChange} 
            />
            <Trans inputText={inputText} />
        </div>
    );
};

export default Test;
