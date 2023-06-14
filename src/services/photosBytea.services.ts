import crypto from "crypto";
import format from "pg-format";
import database from "../database";
import { QueryResult } from "pg";

const create = async (file: Express.Multer.File): Promise<string> => {
  const uuid: string = crypto.randomUUID();
  const extension: string = file.mimetype.split("/").at(-1)!;
  const photoName: string = `${Date.now()}-${uuid}.${extension}`;

  const queryFormat: string = format(
    `INSERT INTO "photos_bytea" (name, buffer) VALUES (%L);`,
    [photoName, file.buffer]
  );

  await database.client.query(queryFormat);

  return "photobytea uploaded";
};

const read = async (): Promise<any[]> => {
  const query: QueryResult = await database.client.query(
    'SELECT "id", "name" FROM "photos_bytea";'
  );

  return query.rows;
};

const retrieve = async (photoByteaId: string): Promise<any> => {
  const query: QueryResult = await database.client.query(
    'SELECT * FROM "photos_bytea" WHERE "id" = $1;',
    [photoByteaId]
  );

  return query.rows[0];
};

export default { create, read, retrieve };
