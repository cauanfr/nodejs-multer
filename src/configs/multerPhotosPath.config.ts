import multer, { Multer } from "multer";
import { AppError } from "../errors";
import crypto from "crypto";
import path from "path";

const kb: number = 1024;

const multerPhotosPathConfig: Multer = multer({
  limits: { fileSize: 750 * kb },
  fileFilter(req, file, callback): void {
    const extentions: string[] = ["png", "jpg", "jpeg"];
    const erroMsg: string = `File extention must be ${extentions}`;

    const mime: string | undefined = file.mimetype.split("/").at(-1);
    if (!mime) return callback(new AppError(erroMsg));
    if (!extentions.includes(mime)) return callback(new AppError(erroMsg));

    return callback(null, true);
  },
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.join(__dirname, "../../upload"));
    },
    filename: (req, file, callback): void => {
      const uuid: string = crypto.randomUUID();
      const extension: string = file.mimetype.split("/").at(-1)!;
      const photoName: string = `${Date.now()}-${uuid}.${extension}`;

      callback(null, `${uuid}-${photoName}`);
    },
  }),
  // preservePath: true,
});

export default multerPhotosPathConfig;
