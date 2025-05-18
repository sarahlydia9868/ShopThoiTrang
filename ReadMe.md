# 🛍️ Shop Thời Trang

**Shop Thời Trang** là một ứng dụng **thương mại điện tử** chuyên về thời trang, được xây dựng với **Node.js + Express** cho **backend**, **MongoDB** làm cơ sở dữ liệu và **React + Vite + TailwindCSS** cho **frontend**. 

---

## 🎯 Mục tiêu dự án

- **Hiển thị sản phẩm**: Cho phép người dùng duyệt qua **bộ sưu tập thời trang**.
- **Tìm kiếm sản phẩm**: Hỗ trợ **tìm kiếm** theo **tên**, **loại sản phẩm**.
- **Giỏ hàng & thanh toán**: Người dùng có thể **thêm sản phẩm vào giỏ hàng** và **thực hiện thanh toán**.
- **Quản lý người dùng**: **Đăng ký**, **đăng nhập**, **cập nhật thông tin cá nhân**, **quản lý đơn hàng**.

---

## 🏗️ Công nghệ sử dụng

### 📡 **Backend**
- **Node.js + Express**: Xây dựng **RESTful API** cho toàn bộ ứng dụng.
- **MongoDB + Mongoose**: Lưu trữ thông tin **sản phẩm**, **người dùng**, **đơn hàng**.
- **Authentication**: Sử dụng **JWT** để xác thực người dùng.
- **Cloudinary**: Quản lý và lưu trữ hình ảnh sản phẩm.
- **Dotenv**: Quản lý biến môi trường.
- **CORS**: Hỗ trợ giao tiếp giữa frontend và backend.

### 🎨 **Frontend**
- **React + Vite**: Giao diện người dùng nhanh chóng, hiện đại.
- **TailwindCSS**: Tạo phong cách giao diện **động**, **tùy chỉnh** dễ dàng.
- **Axios**: Gọi API từ backend.
- **React Router**: Định tuyến trên giao diện người dùng.
- **Redux Toolkit**: Quản lý **state** hiệu quả.
- **React Query**: Tối ưu hóa **fetching & caching** dữ liệu API.

---
## 🚀 **Cài đặt và chạy dự án**

### **1️⃣ Clone dự án**
```bash
git clone https://github.com/sarahlydia9868/ShopThoiTrang.git
cd ShopThoiTrang
```

### **2️⃣ Cài đặt dependencies**
- **Backend**

```bash
cd backend
npm install
npm start
```

- **Frontend**

```bash
cd frontend
npm install
npm start
```
📌 Server backend sẽ chạy tại `http://localhost:9000` 📌 Server frontend sẽ chạy tại `http://localhost:5173`

### 🚀 Tính năng nổi bật
- **🔐 Xác thực hai yếu tố (2FA)**: Bảo vệ tài khoản bằng lớp bảo mật bổ sung.

- **🔑 Quản lý mật khẩu**: Kiểm tra mật khẩu nâng cao và lưu trữ an toàn.

- **📱 Thiết kế phản hồi**: Trải nghiệm mượt mà trên mọi thiết bị.

- **🛡️ Xác thực dữ liệu**: Hệ thống kiểm tra mạnh mẽ để đảm bảo tính toàn vẹn của dữ liệu.

- **🔒 Bảo mật**: Xác thực thay đổi mật khẩu qua email.

🌟 Trải nghiệm mua sắm trực tuyến thế hệ mới với nền tảng thương mại điện tử đầy đủ tính năng của chúng tôi!

### 🧑‍💻 Tài khoản Mongo
```
 username=kten89798@gmail.com
 password=matkhau123@
```
### 🧑‍💻 Tài khoản Cloudinary
```
 username=ponasot111@linxues.com
 password=Matkhau123@
```

### 🧑‍💻 Tài khoản DEMO
- **Admin**
```
 username=sarahlydia
 password=sarah123
```
```
 username=admin
 password=admin123
```
- **User**
```
 username=testaccount
 username=matkhau123
```

```
 username=nguoidung7
 username=matkhau123
```

### 💳 Thông tin thẻ test
```
https://sandbox.vnpayment.vn/apis/vnpay-demo/
```
---
### ❓ FAQ
- **1. Có xoá được sản phẩm đã được khách hàng mua không?**
  - **Có thể**: Xoá các sản phẩm khỏi cơ sở dữ liệu ngay cả khi sản phẩm đã xuất hiện trong các đơn hàng trước đó.
  - **Khi xoá sản phẩm**:
     - Các đơn hàng liên quan trong trong giỏ hàng và danh sách yêu thích của khách hàng cũng bị loại bỏ.
     - Trường hợp khách hàng đã đặt đơn hàng có chứa sản phẩm sẽ bị loại bỏ.
     - Các đơn hàng đã thành công thì vẫn giữ nguyên thông tin sản phẩm đó

- **2. Ngoại lệ xử lý khi đăng nhập thất bại được xử lý như nào?**
  - **Khi đăng nhập thất bại, hệ thống thường xử lý bằng các bước sau:**
     - Trả về mã lỗi phù hợp: 401 Unauthorized hoặc 400 Bad Request.
     - Gửi thông báo rõ ràng cho người dùng (ví dụ: "Sai email hoặc mật khẩu").

       
- **3. Hệ thống bán hàng được lợi thế gì khi sử dụng MongoDB và nhược điểm?**
  - **Ưu điểm**:
     - **Linh hoạt** với cấu trúc dữ liệu (NoSQL) – dễ dàng mở rộng sản phẩm, đơn hàng.
     - **Tốc độ nhanh** với dữ liệu dạng document.
     - **Dễ tích hợp** với Node.js (cùng dùng JavaScript).
     - Phù hợp với **dữ liệu thay đổi thường xuyên**, như giỏ hàng, sản phẩm tùy chỉnh.
  - **Nhược điểm**:
     - Không hỗ trợ giao dịch mạnh như SQL (dù có transaction từ MongoDB 4.0+).
     - Thiếu ràng buộc dữ liệu (foreign key, schema strict...).
     - Phức tạp hơn khi cần xử lý truy vấn phức tạp hoặc nhiều bảng liên kết.

- **4. Một người dùng có thể có nhiều địa chỉ giao hàng không? Địa chỉ giao hàng có khác địa chỉ cụ thể của khách?**
 - **Có**:
    - Một người dùng có thể có nhiều địa chỉ giao hàng
    - Địa chỉ giao hàng **có thể khác địa chỉ thường trú/cụ thể** mà người dùng đăng ký.
    - Trong MongoDB, địa chỉ thường được lưu dưới dạng Array trong address của `User`.
    - Example:
      ```JSON
         {
           "name": "Nguyễn Văn A",
           "phoneNumber": "0388221888",
           "province": "Tỉnh Lạng Sơn",
           "district": "Huyện Bình Gia",
           "commune": "Thị trấn Bình Gia"
         }
- **5. Web bảo mật cơ chế nào? Ưu và nhược của cơ chế bảo mật đó?**
  - **Ưu điểm**:
     - JWT có thể mang theo thông tin người dùng (ID, role...).
     - Dễ dàng xác thực mà không cần truy vấn DB mỗi lần.
     - Dùng cookies giúp gửi token tự động qua HTTP request.
  - **Nhược điểm**:
     - JWT nếu bị lộ sẽ bị lợi dụng (cần dùng HTTPS).
     - Token không thể bị thu hồi trước thời hạn trừ khi dùng blacklist (khó quản lý hơn session truyền thống).
     - Cookies cần cấu hình đúng (httpOnly, secure, SameSite) để tránh XSS hoặc CSRF.

---
       
### 🎥 Video DEMO
https://github.com/user-attachments/assets/f5f22c79-8b83-4a25-b013-394604550e89
