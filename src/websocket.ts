import { Request, Response } from "express";
import { io, app } from "./http";

app.get("/msg", (req: Request, res: Response) => {
  let count = 0;
  res.redirect("http://localhost:3000");
  setInterval(() => {
    io.emit("msg", count);
    console.log(count);
    count++;
  }, 1000);
});

io.on("connection", (socket) => {
  console.log(socket.id);
});
