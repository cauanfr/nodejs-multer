import multer, { Multer } from "multer";
import { AppError } from "../errors";

const kb: number = 1024;

const multerPhotosByteaConfig: Multer = multer({
  limits: { fileSize: 750 * kb },
  fileFilter(req, file, callback): void {
    const extensions: string[] = ["png", "jpg", "jpeg"];
    const errorMsg: string = `File extension must be ${extensions}`;

    const mime: string | undefined = file.mimetype.split("/").at(-1);
    if (!mime) return callback(new AppError(errorMsg));
    if (!extensions.includes(mime)) return callback(new AppError(errorMsg));

    return callback(null, true);
  },
});

export default multerPhotosByteaConfig;
