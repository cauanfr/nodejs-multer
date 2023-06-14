import express, { Application } from "express";
import { photosByteaRouter, photosPathRouter } from "./routers";
import middlewares from "./middlewares";

const app: Application = express();

app.use("/photos_bytea", photosByteaRouter);
app.use("/photos_path", photosPathRouter);

app.use(middlewares.handleErrors);
export default app;
