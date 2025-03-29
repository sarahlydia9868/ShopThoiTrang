"use strict";
import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { Server } from "http";
import config from "./util/config";
import { connectDataBase } from "./util/database";
import { errorHandler, notFound } from "./middleware/error";
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import orderRoutes from "./routes/order";
import collectionRoutes from "./routes/collection";
import cloudinary from "cloudinary";

const app: Application = express();

connectDataBase();

if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }))
app.use(fileUpload());


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/collections", collectionRoutes);

app.use(notFound);
app.use(errorHandler);

cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const PORT: number | string = config.PORT || 8000;

const server: Server = app.listen(PORT, () => console.log(`🟢 Server running in ${config.NODE_ENV} mode on port ${PORT}`));
