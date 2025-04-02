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

## 🎨 Pages
