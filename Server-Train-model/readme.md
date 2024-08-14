# Hướng Dẫn Cài Đặt và Thực Thi

## 1. Yêu Cầu Trước Khi Bắt Đầu

Trước khi tiến hành, hãy đảm bảo rằng bạn đã cài đặt các phần mềm sau trên hệ thống của bạn:

- Python 3.6 trở lên
- Git (không bắt buộc để clone kho lưu trữ)

## 2. Tạo Môi Trường Ảo (Khuyến nghị)

Sử dụng môi trường ảo để quản lý các phụ thuộc cho dự án của bạn. Dưới đây là cách tạo và kích hoạt môi trường ảo:

```bash
# Cài đặt virtualenv nếu bạn chưa cài đặt
pip install virtualenv

# Tạo môi trường ảo
virtualenv venv

# Kích hoạt môi trường ảo
# Trên Windows
venv\Scripts\activate
# Trên macOS và Linux
source venv/bin/activate
```
Hoặc sử dụng `conda` để tạo môi trường ảo:
- cai dat conda ở đây: [Anaconda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html)

```bash
# Tạo môi trường ảo
conda create -n venv python=3.6
# Kích hoạt môi trường ảo
conda activate venv
```
## 3. Cài Đặt Các Thư Viện
Chạy lệnh sau để cài đặt các thư viện cần thiết:

```bash
pip install -r requirements.txt
```

## 4. Chạy Ứng Dụng

```bash
python main.py
```
hoặc
```bash
python3 main.py # với máy mac hoặc linux
```

