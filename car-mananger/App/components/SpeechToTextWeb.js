import React, { useState } from 'react';
import './SpeechToTextWeb.css';

const SpeechToTextWebComponent = () => {
    const [isListening, setIsListening] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'vi-VN'; // Đặt ngôn ngữ thành Tiếng Việt
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.start();
        setIsListening(true);

        recognition.onresult = async (event) => {
            const transcript = event.results[0][0].transcript;
            setResult(transcript);
            setIsListening(false);
            await sendTextToApi(transcript); // Gửi văn bản nhận được đến API
        };

        recognition.onerror = (event) => {
            console.error('Lỗi nhận diện giọng nói:', event.error);
            setIsListening(false);
            setError('Có lỗi xảy ra khi nhận diện giọng nói.');
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    // Hàm gửi văn bản đến API
    const sendTextToApi = async (text) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Thêm các header khác nếu cần
                },
                body: JSON.stringify({ command: text }), // Gửi văn bản nhận được từ giọng nói
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('API response:', responseData);
            // Xử lý dữ liệu phản hồi từ API nếu cần
            var result = responseData;
            switch (result["predicted_title"]) {
                case "Uncertain":
                    setError('Không thể nhận diện được lệnh.');
                    break;
                default:
                    setError('');
                    break;
            }
        } catch (error) {
            console.error('Error sending text to API:', error);
            setError('Có lỗi xảy ra khi gửi văn bản đến API.');

        }
    };

    return (
        <div className="container">
            <button onClick={startListening} disabled={isListening} className="button">
                {isListening ? 'Đang nghe...' : 'Bắt đầu nói'}
            </button>
            <div className="result">
                {result ? <p>Bạn đã nói: {result}</p> : <p>Chưa có kết quả</p>}
            </div>
            <div className="error">
                {error && <p>Lỗi: {error}</p>}
            </div>
        </div>
    );
};

export default SpeechToTextWebComponent;
