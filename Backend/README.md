# Shop Thời Trang Backend

README này mô tả các API endpoints cho Shop Thời Trang, bao gồm các chức năng quản lý người dùng và sản phẩm.

---

## Nội dung

- [User APIs](#user-apis)
  - [GET /api/users](#get-apiusers)
  - [GET /api/users/:id](#get-apiusersid)
  - [POST /api/users/register](#post-apiusersregister)
  - [POST /api/users/login](#post-apiuserslogin)
  - [POST /api/users/promote/:id](#post-apiuserspromoteid)
  - [POST /api/users/:id](#post-apiusersid)
- [Product APIs](#product-apis)
  - [GET /api/products](#get-apiproducts)
  - [GET /api/products/:id](#get-apiproductsid)

---

## User APIs

### GET /api/users
- **Mục đích:** Lấy danh sách người dùng.
- **Kết quả thành công (Code: 200):**
  ```json
  {
      "countUsers": 0,
      "users": [],
      "page": 1,
      "pages": 1
  }
### GET /api/users/:id
- **Mục đích:** Lấy thông tin của một người dùng theo `id`.
- **Kết quả thành công (Code: 200):**
  ```json
  {
      "_id": "",
      "username": "",
      "password": "",
      "firstName": "",
      "lastName": null,
      "email": "",
      "address": null,
      "phoneNumber": null,
      "role": "",
      "createdAt": "",
      "updatedAt": ""
  }
- **Kết quả thất bại (Code: 400):**
  ```json
  {
      "message": "Không tìm thấy id người dùng"
  }
### POST /api/users/register?username=`?`&email=`?`&password=`?`
- **Mục đích:** Đăng kí người dùng mới với các tham số truy vấn: `username`, `email`, `password`.
- **Kết quả thành công (Code: 201):**
  ```json
  {
      "message": "Đăng kí thành công",
      "_id": "",
      "username": "",
      "email": "",
      "role": "Client",
      "token": ""
  }
- **Kết quả thất bại (Code: 432):**
  ```json
  {
      "message": "Tên đăng nhập đã được sử dụng"
  }
### POST /api/users/login?username=`?`&password=`?`
- **Mục đích:** Đăng nhập người dùng với `username` và `password`.
- **Kết quả thành công (Code: 200):**
  ```json
  {
      "message": "Đăng nhập thành công",
      "_id": "",
      "username": "",
      "email": "",
      "role": "",
      "token": ""
  }
- **Kết quả thất bại (Code: 500):**
  ```json
  {
      "message": "Tên đăng nhập đã được sử dụng"
  }
### POST /api/users/promote/:id
- **Mục đích:** Thăng cấp người dùng lên quyền `admin`.
- **Kết quả thành công (Code: 200):**
  ```json
  {
      "message": "Đặt quyền truy cập admin thành công"
  }
- **Kết quả thất bại (Code: 400):**
  ```json
  {
      "message": "Không tìm thấy id người dùng"
  }
### POST /api/users/:id
- **Mục đích:** Xoá tài khoản người dùng theo `id`.
- **Kết quả thành công (Code: 200):**
  ```json
  {
      "message": "Đã xoá tài khoản"
  }
- **Kết quả thất bại (Code: 400):**
  ```json
  {
      "message": "Không tìm thấy id người dùng"
  }

---

## Product APIs
### GET /api/products
- **Mục đích:** Lấy danh sách sản phẩm.
- **Kết quả thành công (Code: 200):**
  ```json
  [
    {
        "_id": "",
        "name": "",
        "image": "",
        "price": "",
        "brand": "",
        "category": "",
        "description": "",
        "qty": 0,
        "reviews": []
    }
  ]
- **Kết quả thất bại (Code: 500):**
  ```json
  {
      "message": "Không tìm thấy sản phẩm"
  }
### GET /api/products
- **Mục đích:** Lấy danh sách sản phẩm.
- **Kết quả thành công (Code: 200):**
  ```json
    {
        "_id": "",
        "name": "",
        "image": "",
        "price": "",
        "brand": "",
        "category": "",
        "description": "",
        "qty": 0,
        "reviews": []
    }
- **Kết quả thất bại (Code: 500):**
  ```json
  {
      "message": "Không tìm thấy sản phẩm"
  }
---

## Environment Variables

Để chạy dự án này, bạn cần thêm các biến môi trường sau vào file `.env` của bạn:

`NODE_ENV` `MONGODB_URI` `PORT` `JWT_SECRET`

Example:

    
     NODE_ENV="development"
     MONGODB_URI="mongodb://localhost:27017/example"
     PORT="3000"
     JWT_SECRET="JWT_SECRET_KEY"
   

---

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

## Todo

   - Thêm API cho Orders.
   - Thêm API cho Upload.
