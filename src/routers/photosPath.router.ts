import { Router } from "express";
import { photosPathControllers } from "../controllers";
import { multerPhotosPathConfig } from "../configs";

const photosPathRouter: Router = Router();

photosPathRouter.post(
  "",
  multerPhotosPathConfig.single("img"),
  photosPathControllers.create
);

photosPathRouter.get("", photosPathControllers.read);
photosPathRouter.get("/:id/download", photosPathControllers.retrieve);

export default photosPathRouter;
