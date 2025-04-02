# 🛍️ Shop Thời Trang Backend

README này mô tả các **API endpoints** cho **Shop Thời Trang**, bao gồm các chức năng quản lý **người dùng**, **sản phẩm**, **đơn hàng**, và **bộ sưu tập**.

---

## 📜 Nội dung

- 🧑‍💻 [User APIs](#user-apis)
  - 🔑 [POST /api/users/register](#post-apiusersregister)
  - 🔐 [POST /api/users/login](#post-apiuserslogin)
  - 🚪 [GET /api/users/logout](#get-apiuserslogout)
  - 🛡️ [POST /api/users/promote](#post-apiuserspromote)
  - 🔄 [POST /api/users/send-code](#post-apiuserssend-code)
  - ✅ [POST /api/users/verify-code](#post-apiusersverify-code)
  - 🔓 [POST /api/users/verify-code-password](#post-apiusersverify-code-password)
  - 🏠 [GET /api/users/me](#get-apiusersme)
  - ⚙️ [PUT /api/users/me/update](#put-apiusersmeupdate)
  - 🛍️ [PUT /api/users/me/update-item](#put-apiusersmeupdate-item)
  - 👥 [GET /api/users/all-user](#get-apiusersall-user)
  - ❌ [POST /api/users/user/delete](#post-apiusersuserdelete)
  - 🔍 [GET /api/users/user/:id](#get-apiusersuserid)
- 🛒 [Product APIs](#product-apis)
  - 📦 [GET /api/products](#get-apiproducts)
  - 🔍 [GET /api/products/:id](#get-apiproductsid)
  - ✍️ [POST /api/products/:id/reviews](#post-apiproductsidreviews)
  - ➕ [POST /api/products/new](#post-apiproductsnew)
  - ✏️ [PUT /api/products/:id](#put-apiproductsid)
  - 🗑️ [POST /api/products/delete](#post-apiproductsdelete)
- 📦 [Order APIs](#order-apis)
  - 📜 [GET /api/orders](#get-apiorders)
  - ➕ [POST /api/orders/create-order](#post-apiorderscreate-order)
  - 🧑‍💼 [POST /api/orders/orders-user](#post-apiordersorders-user)
  - 🔍 [POST /api/orders/get](#post-apiordersget)
  - ❌ [POST /api/orders/delete](#post-apiordersdelete)
  - 🔄 [POST /api/orders/update-progress](#post-apiordersupdate-progress)
- 🖼️ [Collection APIs](#collection-apis)
  - 📂 [GET /api/collections](#get-apicollections)
  - 🔍 [GET /api/collections/:id](#get-apicollectionsid)
  - ➕ [POST /api/collections/new](#post-apicollectionsnew)
  - 🗑️ [POST /api/collections/delete](#post-apicollectionsdelete)

---

## 🧑‍💻 User APIs

### 🔑 **POST /api/users/register**
- **Mục đích:** Đăng ký tài khoản mới.
- **Yêu cầu:** Không cần xác thực.
- **Kết quả thành công (Code: 201):**
  ```json
  { "message": "Đăng ký thành công" }

  ### POST /api/users/login
- **Mục đích:** Đăng nhập tài khoản.

- **Yêu cầu:** Không cần xác thực.

### 🔐 POST /api/users/login
- **Mục đích:** Đăng nhập tài khoản.

- **Yêu cầu:** Không cần xác thực.

###🚪 GET /api/users/logout
- **Mục đích:** Đăng xuất tài khoản.

### 🛡️ POST /api/users/promote
- **Mục đích:** Thăng cấp người dùng lên quyền admin.

- **Yêu cầu:** Xác thực auth và quyền admin.

---

## 🛍️ Product APIs
### 📦 GET /api/products
- **Mục đích:** Lấy danh sách sản phẩm.

### 🔍 GET /api/products/:id
- **Mục đích:** Lấy thông tin chi tiết của một sản phẩm.

### ✍️ POST /api/products/:id/reviews
- **Mục đích:** Thêm đánh giá cho sản phẩm.

### ➕ POST /api/products/new
- **Mục đích:** Tạo sản phẩm mới.

### ✏️ PUT /api/products/:id
- **Mục đích:** Cập nhật thông tin sản phẩm.

### 🗑️ POST /api/products/delete
- **Mục đích:** Xóa sản phẩm.

---

## 📦 Order APIs
📜 GET /api/orders
- **Mục đích:** Lấy danh sách đơn hàng.

### ➕ POST /api/orders/create-order
- **Mục đích:** Tạo đơn hàng mới.

### 🧑‍💼 POST /api/orders/orders-user
- **Mục đích:** Lấy danh sách đơn hàng của người dùng.

### 🔍 POST /api/orders/get
- **Mục đích:** Lấy chi tiết đơn hàng theo ID.

### ❌ POST /api/orders/delete
- **Mục đích:** Xóa đơn hàng.

### 🔄 POST /api/orders/update-progress
- **Mục đích:** Cập nhật tiến trình đơn hàng.

---

## 🖼️ Collection APIs
### 📂 GET /api/collections
Mục đích: Lấy danh sách bộ sưu tập.

### 🔍 GET /api/collections/:id
Mục đích: Lấy thông tin bộ sưu tập theo ID.

### ➕ POST /api/collections/new
Mục đích: Tạo bộ sưu tập mới.

 ### 🗑️ POST /api/collections/delete
Mục đích: Xóa bộ sưu tập.

## ⚙️ Environment Variables

Để chạy dự án này, bạn cần thêm các biến môi trường sau vào file `.env` của bạn:

`NODE_ENV` `MONGODB_URI` `PORT` `JWT_SECRET`

`CLOUDINARY_NAME` `CLOUDINARY_API_KEY` `CLOUDINARY_API_SECRET`

`SMPT_SERVICE` `SMPT_HOST` `SMPT_PORT` `SMPT_PASSWORD` `SMPT_MAIL`

Example:

    
     NODE_ENV="development"
     MONGODB_URI="mongodb://localhost:27017/example"
     PORT="9000"
     JWT_SECRET="JWT_SECRET_KEY"
     CLOUDINARY_NAME="CLOUDINARY_NAME"
     CLOUDINARY_API_KEY="CLOUDINARY_API_KEY"
     CLOUDINARY_API_SECRET="CLOUDINARY_API_SECRET"
     SMPT_SERVICE="SMPT_SERVICE"
     SMPT_HOST="SMPT_HOST"
     SMPT_PASSWORD="SMPT_PASSWORD"
     SMPT_MAIL="SMPT_MAIL"
   

---

---

## Cài đặt TypeScript

   - Chạy lệnh sau để cài đặt TypeScript:
     ```bash
     npm install typescript
     ```

## Cài đặt MongoDB

### Sử dụng MongoDB cục bộ (Localhost)
Tải và cài đặt MongoDB Community Server:
   - Truy cập trang chủ MongoDB tại [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Tải xuống phiên bản phù hợp với hệ điều hành của bạn và tiến hành cài đặt.
Khởi chạy MongoDB:
   - Sau khi cài đặt, mở terminal và chạy lệnh sau: 
     ```bash
     mongod
     ```
   - MongoDB sẽ chạy tại địa chỉ: `mongodb://localhost:27017`
Cấu hình kết nối trong ứng dụng:
   - Trong file `.env`, đặt giá trị cho `MONGODB_URI` như sau:
     ```
     MONGODB_URI=mongodb://localhost:27017/ten-database
     ```
   - Thay `ten-database` bằng tên database mà bạn muốn sử dụng.

### Sử dụng MongoDB trực tuyến (Online URL)
Đăng ký và tạo cluster trên MongoDB Atlas:
   - Truy cập [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas), đăng ký tài khoản miễn phí và tạo một cluster mới.
Cấu hình kết nối:
   - Trong MongoDB Atlas, tạo người dùng và thêm địa chỉ IP của bạn vào danh sách cho phép (whitelist).
   - Lấy URL kết nối từ dashboard của MongoDB Atlas, ví dụ:
     ```
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/ten-database?retryWrites=true&w=majority
     ```
- Thay `<username>`, `<password>` và `ten-database` bằng thông tin của bạn.
Cập nhật file `.env`:
   - đặt giá trị cho `MONGODB_URI`:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ten-database?retryWrites=true&w=majority
     ```

---

## Chạy Ứng Dụng
Cài đặt các dependencies
   - Chạy lệnh sau để cài đặt các gói cần thiết:
     ```bash
     npm install
     ```
Khởi chạy server
   - Chạy lệnh sau để khởi động server:
     ```bash
     npm start
     ```

---