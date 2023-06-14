import { Client, ClientConfig } from "pg";

const clientConfig: ClientConfig = {
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT),
};

const client: Client = new Client(clientConfig);

const start = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected");
};

export default { client, start };
