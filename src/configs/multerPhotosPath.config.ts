import multer, { Multer } from "multer";
import { AppError } from "../errors";
import path from "path";
import crypto from "crypto";

const kb: number = 1024;

const multerPhotosPathConfig: Multer = multer({
  limits: { fileSize: 750 * kb },
  fileFilter(req, file, callback): void {
    const extensions: string[] = ["png", "jpg", "jpeg"];
    const errorMsg: string = `File extension must be ${extensions}`;

    const mime: string | undefined = file.mimetype.split("/").at(-1);
    if (!mime) return callback(new AppError(errorMsg));
    if (!extensions.includes(mime)) return callback(new AppError(errorMsg));

    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.join(__dirname, "../../upload"));
    },
    filename(req, file, callback) {
      const uuid: string = crypto.randomUUID();
      const extension: string = file.mimetype.split("/").at(-1)!;
      const photoName: string = `${Date.now()}-${uuid}.${extension}`;

      callback(null, photoName);
    },
  }),
});

export default multerPhotosPathConfig;
