import { Request, Response } from "express";
import { io, app } from "./http";

let segundos = 0;
let minutos = 0;
let tempo = 0;
let pausar = false;

const contadorTempo = () => {
  const idTempo = setInterval(() => {
    tempo++;
    let minutoAtual = Math.floor(tempo / 59);
    minutos = minutoAtual;
    io.emit("seg", { segundos, minutos });
    console.log(tempo);
    segundos++;
    if (segundos === 60) {
      segundos = 0;
    }
    if (pausar) {
      console.log("entrou");
      clearInterval(idTempo);
      io.emit("seg", { segundos, minutos });
    }
  }, 100);
};

app.get("/iniciar", (req: Request, res: Response) => {
  if (tempo <= 0) {
    contadorTempo();
  }
  res.redirect("http://localhost:3000");
});

app.get("/pausar", (req: Request, res: Response) => {
  pausar = true;
  io.emit("seg", { segundos, minutos });
  res.redirect("http://localhost:3000");
});

app.get("/continuar", (req: Request, res: Response) => {
  if (pausar) {
    pausar = false;
    contadorTempo();
  }
  res.redirect("http://localhost:3000");
});

app.get("/zerar", (req: Request, res: Response) => {
  segundos = 0;
  minutos = 0;
  tempo = 0;
  pausar = false;
  res.redirect("http://localhost:3000");
});

io.on("connection", (socket) => {
  console.log(socket.id);
});
