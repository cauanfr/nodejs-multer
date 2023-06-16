import path from "path";
import { Request, Response } from "express";
import { photosPathServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const message: string = await photosPathServices.create(req.file!);
  return res.status(201).json({ message });
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const allPhotos = await photosPathServices.read();
  return res.status(200).json(allPhotos);
};

const retrieve = async (req: Request, res: Response): Promise<void> => {
  const { id: photoPathId } = req.params;
  const photosPath: any = await photosPathServices.retrieve(photoPathId);

  const headers = {
    contentType: "image/*",
    contentDisposition: `inline; filename=${photosPath.name}`,
  };

  return res.sendFile(path.join(__dirname, photosPath.path), { headers });
};

export default { create, read, retrieve };
