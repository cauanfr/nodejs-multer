import { Router } from "express";
import { multerPhotosPathConfig } from "../configs";
import { photosPathControllers } from "../controllers";

const photosPathRouter: Router = Router();

photosPathRouter.post(
  "",
  multerPhotosPathConfig.single("img"),
  photosPathControllers.create
);

photosPathRouter.get("", photosPathControllers.read);
photosPathRouter.get("/:id/download", photosPathControllers.retrieve);

export default photosPathRouter;
