import { spawn } from "node:child_process";

const port = process.env.PORT || "3001";

const server = spawn(
  "node",
  [
    "./node_modules/json-server/lib/bin.js",
    "db.json",
    "--host",
    "0.0.0.0",
    "--port",
    port,
  ],
  { stdio: "inherit" },
);

server.on("exit", (code) => {
  process.exit(code ?? 0);
});
