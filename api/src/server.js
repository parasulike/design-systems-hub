import express from "express";
import "dotenv/config";
import designSystemsRouter from "./routes/design-systems.js";
import frameworksRouter from "./routes/frameworks.js";
import tagsRouter from "./routes/tags.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/design-systems", designSystemsRouter);
app.use("/frameworks", frameworksRouter);
app.use("/tags", tagsRouter);

app.use((req, res) => res.status(404).json({ error: "Not found" }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
