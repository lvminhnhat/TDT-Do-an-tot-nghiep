// src/services/serviceApi.js

import apiConfig from '../config/apiConfig.json';

const makeApiRequest = async (data) => {
  const { url, type, headers } = apiConfig;

  try {
    const response = await fetch(url, {
      method: type, // Phương thức HTTP (POST, GET, PUT, DELETE, ...)
      headers: headers,
      body: JSON.stringify({ command: data }), // Thêm `command` vào body
    });

    if (!response.ok) {
      // Xử lý lỗi nếu có
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json(); // Chuyển đổi dữ liệu trả về từ JSON
    return responseData;
  } catch (error) {
    // Xử lý lỗi trong khi thực hiện request
    console.error('Error making API request:', error);
    throw error;
  }
};

export default makeApiRequest;
