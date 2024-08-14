# Hướng Dẫn Cài Đặt và Thực Thi Dự Án React Native

## 1. Yêu Cầu Trước Khi Bắt Đầu

Trước khi bắt đầu, hãy đảm bảo rằng bạn đã cài đặt các phần mềm sau trên hệ thống của bạn:

- **Node.js** (phiên bản 12 trở lên)
- **npm** (thường đi kèm với Node.js)
- **React Native CLI** hoặc **Expo CLI** (tùy vào cách triển khai dự án) khuyến nghị sử dụng Expo CLI

## 2. Clone Dự Án Từ GitHub

Để lấy mã nguồn của dự án, sử dụng lệnh `git clone`:

```bash
git clone https://github.com/username/project-name.git
```

## 3. Cài Đặt Các Thư Viện

Di chuyển vào thư mục dự án và chạy lệnh sau để cài đặt các thư viện cần thiết:

```bash
cd project-name # thay project-name bằng tên thư mục dự án
npm install
```
## 4. Cấu Hình
- tạo file firebase.json trong thư mục car-mananger/App/config 
với nội dung được tải về từ firebase console
- truy cập vô ./car-mananger/App/services/firebase.js
thay đổi nội dung của file này với thông tin của firebase của bạn
```javascript
const firebaseConfig = {
  apiKey: "",
  authDomain: "*.firebaseapp.com",
  databaseURL: "https://tranducthien-efd22-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tranducthien-efd22",
  storageBucket: "tranducthien-efd22.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
```

## 5. Chạy Ứng Dụng

### Sử Dụng Expo CLI
```bash
npx expo start
```

