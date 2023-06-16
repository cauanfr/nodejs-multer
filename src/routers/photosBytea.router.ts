import { Router } from "express";
import { multerPhotosByteaConfig } from "../configs";
import { photosByteaControllers } from "../controllers";

const photosByteaRouter: Router = Router();

photosByteaRouter.post(
  "",
  multerPhotosByteaConfig.single("img"),
  photosByteaControllers.create
);

photosByteaRouter.get("", photosByteaControllers.read);
photosByteaRouter.get("/:id/download", photosByteaControllers.retrieve);

export default photosByteaRouter;
