import { Router } from "express";
import { photosByteaControllers } from "../controllers";
import { multerPhotosByteaConfig } from "../configs";

const photosByteaRouter: Router = Router();

photosByteaRouter.post(
  "",
  multerPhotosByteaConfig.single("img"),
  photosByteaControllers.create
);

photosByteaRouter.get("", photosByteaControllers.read);
photosByteaRouter.get("/:id/download", photosByteaControllers.retrieve);

export default photosByteaRouter;
