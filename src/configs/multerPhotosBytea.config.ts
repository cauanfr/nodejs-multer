import multer, { Multer } from "multer";
import { AppError } from "../errors";

const kb: number = 1024;

const multerPhotosByteaConfig: Multer = multer({
  limits: { fileSize: 750 * kb },
  fileFilter(req, file, callback): void {
    const extentions: string[] = ["png", "jpg", "jpeg"];
    const erroMsg: string = `File extention must be ${extentions}`;

    const mime: string | undefined = file.mimetype.split("/").at(-1);
    if (!mime) return callback(new AppError(erroMsg));
    if (!extentions.includes(mime)) return callback(new AppError(erroMsg));

    return callback(null, true);
  },
});

export default multerPhotosByteaConfig;
