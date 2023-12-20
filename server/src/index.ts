import "colors.ts";

import cors from "cors";
import express, { Request, Response } from "express";

import { PORT as PORT_FROM_ENV } from "./environment";

const PORT = PORT_FROM_ENV || 8080;

const app = express();

app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Successfully connected to Chat App server");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`.cyan.underline);
});
