import "dotenv/config";
import app from "./app";
import database from "./database";

const PORT: number = Number(process.env.PORT || 3000);

app.listen(PORT, async (): Promise<void> => {
  await database.start();
  console.log(`App running on port ${PORT}`);
});
