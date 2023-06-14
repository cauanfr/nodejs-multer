import { Request, Response } from "express";
import { photosByteaServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const message: string = await photosByteaServices.create(req.file!);
  return res.status(201).json({ message });
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const photos_bytea: any[] = await photosByteaServices.read();
  return res.status(200).json({ photos: photos_bytea });
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const { id: photoByteaId } = req.params;
  const photos_bytea: any = await photosByteaServices.retrieve(photoByteaId);

  res.setHeader("Content-Type", "image/*");
  res.setHeader("Content-Disposition", `inline; filename=${photos_bytea.name}`);

  return res.status(200).send(Buffer.from(photos_bytea.buffer));
};

export default { create, read, retrieve };
