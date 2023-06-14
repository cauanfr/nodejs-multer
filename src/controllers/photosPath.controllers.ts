import { Request, Response } from "express";
import { photosPathServices } from "../services";
import path from "path";

const create = async (req: Request, res: Response): Promise<Response> => {
  const message: string = await photosPathServices.create(req.file!);
  return res.status(201).json({ message });
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const photos_Path: any[] = await photosPathServices.read();
  return res.status(200).json({ photos: photos_Path });
};

const retrieve = async (req: Request, res: Response): Promise<void> => {
  const { id: photoPathId } = req.params;
  const photos_path: any = await photosPathServices.retrieve(photoPathId);

  const headers = {
    contentType: "image/*",
    contentDisposition: `inline; filename=${photos_path.name}`,
  };

  return res.sendFile(path.join(__dirname, photos_path.path), { headers });
};

export default { create, read, retrieve };
