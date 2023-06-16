import express, { Application } from "express";
import middlewares from "./middlewares";
import { photosByteaRouter, photosPathRouter } from "./routers";

const app: Application = express();

app.use("/photos_bytea", photosByteaRouter);
app.use("/photos_path", photosPathRouter);

app.use(middlewares.handleErrors);

export default app;
