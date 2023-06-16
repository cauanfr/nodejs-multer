import { Request, Response } from "express";
import { photosByteaServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const message: string = await photosByteaServices.create(req.file!);
  return res.status(201).json({ message });
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const allPhotos = await photosByteaServices.read();
  return res.status(200).json(allPhotos);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const { id: photoByteaId } = req.params;
  const photoBytea: any = await photosByteaServices.retrive(photoByteaId);

  res.setHeader("Content-Type", "image/*");
  res.setHeader("Content-Disposition", `inline; filename=${photoBytea.name}`);

  return res.status(200).send(Buffer.from(photoBytea.buffer));
};

export default { create, read, retrieve };
