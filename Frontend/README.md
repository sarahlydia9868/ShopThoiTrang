# 🛍️ Shop Thời Trang - Frontend

Frontend của **Shop Thời Trang** được xây dựng bằng **React**, **Vite**, và **TailwindCSS**, mang đến trải nghiệm nhanh chóng, tối ưu và trực quan cho người dùng.

---

## 🚀 Công nghệ sử dụng

- **React**: Thư viện JavaScript phổ biến để xây dựng giao diện người dùng.
- **Vite**: Công cụ phát triển nhanh chóng với hot module replacement (HMR).
- **TailwindCSS**: Framework CSS tiện lợi giúp tạo giao diện trực quan mà không cần viết nhiều CSS thủ công.

---

## 🔧 Cài đặt và chạy dự án

### **1️⃣ Cài đặt dependencies**

```bash
npm install
```

### **2️⃣ Chạy dự án**

```bash
npm run
```

📌 Server sẽ chạy tại http://localhost:5173

---

## 📂 Cấu trúc thư mục

```
├── public/         # Ảnh, favicon, tài nguyên tĩnh
├── src/
│   ├── actions/    # Các actions cho Redux
│   ├── components/ # Các thành phần UI tái sử dụng
│   ├── constants/  # Các hằng số sử dụng trong ứng dụng
│   ├── fonts/      # Font chữ tùy chỉnh
│   ├── pages/      # Các trang chính của ứng dụng
│   ├── redux/      # Cấu trúc Redux Store
│   ├── routes/     # Cấu hình định tuyến
│   ├── styles/     # Cấu hình Tailwind và CSS bổ sung
│   ├── utils/      # Các hàm tiện ích
│   ├── App.tsx     # Thành phần chính của ứng dụng
│   ├── index.css   # File CSS toàn cục
│   ├── main.tsx    # Entry point chính của ứng dụng
│   ├── routes.tsx  # Cấu hình các routes
│   ├── type.d.ts   # Định nghĩa kiểu dữ liệu TypeScript
│   ├── vite-env.d.ts # Cấu hình môi trường Vite
├── package.json
├── vite.config.ts
└── README.md

```

---

## 🔗 Các API chính sử dụng

Frontend sử dụng các API backend từ **Shop Thời Trang** để quản lý sản phẩm, người dùng, giỏ hàng và đơn hàng:

- **User API:**: Đăng ký, đăng nhập, quản lý tài khoản.

- **Product API**: Lấy danh sách sản phẩm, thêm/xóa sản phẩm.

- **Order API**: Tạo đơn hàng, quản lý giao vận.

- **Collection API**: Quản lý bộ sưu tập sản phẩm.

---

## 🚀 Deployment

Dự án có thể được triển khai trên các nền tảng như **Vercel**, **Netlify**, hoặc **GitHub Pages**. Để build ứng dụng, sử dụng:

```bash
npm run build
```

---

## 🎨 Hình ảnh giao diện
### **Trang chính**
![image](https://github.com/user-attachments/assets/bf4a2f32-bf52-4d29-93c4-f85bbf55e901)
![image](https://github.com/user-attachments/assets/3aadcd97-9316-4f89-8540-45890739d94c)
![image](https://github.com/user-attachments/assets/e709c152-e777-41ef-942b-f05261156107)

---
### **Trang xác thực**
![image](https://github.com/user-attachments/assets/e6606aa0-ee04-4d9f-ae7d-db2d22634830)
![image](https://github.com/user-attachments/assets/0120414e-6553-4eef-9132-c7d3ee083f2b)

---
### **Cửa hàng**
![image](https://github.com/user-attachments/assets/89bc6085-ff8f-4fad-a500-0af48d957911)
![image](https://github.com/user-attachments/assets/b64f8155-cb3c-4d15-8e0e-98cc50265f52)
![image](https://github.com/user-attachments/assets/9f479822-6254-49f2-a737-0d73d19300e2)

---
## **Thông tin sản phẩm**
![image](https://github.com/user-attachments/assets/71d9d17c-22cd-43c9-810e-f2e4484e9dd3)
![image](https://github.com/user-attachments/assets/45af8b4a-4e6a-47dd-a258-0102c39ca429)

---
## **Bộ sưu tập**
![image](https://github.com/user-attachments/assets/7047fbbd-f426-4d74-bf7e-5dee9625b467)
![image](https://github.com/user-attachments/assets/8f5e6829-b8f9-4a03-9964-b01ca54646bd)
![image](https://github.com/user-attachments/assets/357e4e29-2be6-40b3-ba77-b460315bd654)

---
## **Thông tin người dùng**
![image](https://github.com/user-attachments/assets/563063cd-7ac5-4809-8190-a33e25a573d9)
![image](https://github.com/user-attachments/assets/f4e73c47-49c5-4727-a358-33f4d00b6e53)
![image](https://github.com/user-attachments/assets/4fbbe03d-819e-4417-be66-782e92a8adb6)

--
## **Đơn hàng**
![image](https://github.com/user-attachments/assets/839811b3-4db6-4d3c-954f-bc951433ecd2)
![image](https://github.com/user-attachments/assets/d881ccaf-3ea7-4003-822b-59d0fc2b16e7)
![image](https://github.com/user-attachments/assets/73ea02af-ec6f-48a6-84eb-9f7c134d872d)
![image](https://github.com/user-attachments/assets/4409b086-b048-4ac0-b368-7960ec3558ef)

--
## **Danh sách yêu thích**
![image](https://github.com/user-attachments/assets/1827c4a6-2055-4c76-820e-902d23d36232)

--
## **Giỏ hàng**
![image](https://github.com/user-attachments/assets/ccfd85e3-c71d-4a12-b7af-b5e7d027a854)

--
## **Thanh toán**
![image](https://github.com/user-attachments/assets/d2beed77-a73a-4a3c-9ee3-5441ce0fc808)
![image](https://github.com/user-attachments/assets/cc891592-60eb-43f2-be46-d51839044b35)

--
## **404 NotFound**
![image](https://github.com/user-attachments/assets/0a340b4f-5299-46c5-b875-4dd722fa6a7b)
