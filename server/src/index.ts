import "colors.ts";

import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Successfully connected to Chat App server");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`.cyan.underline);
});
