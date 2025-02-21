import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import winston from "winston";
import expressWinston from "express-winston";
import "reflect-metadata";
import { dataSource } from "./data-source";

import indexRouter from "./controller/index";
import usersRouter from "./controller/users";

/** 初始化数据库 */
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

/** 初始化服务器实例 */
const app = express();

// 创建一个 Winston 日志记录器
winston.createLogger({
  transports: [new winston.transports.Console()],
});

// 使用 express-winston 记录请求日志
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        ),
      }),
    ],
    meta: true, // 包含请求的元数据
    msg: "HTTP {{req.method}} {{req.url}}", // 记录的信息格式
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// 使用 express-winston 记录错误日志
app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        ),
      }),
    ],
  }),
);

// 添加404错误中间件，传递给错误处理器
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理器
app.use(function (err: any, req: any, res: any) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

export default app;
