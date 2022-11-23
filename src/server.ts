import { serverHttp } from "./http";
import "./websocket";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8899;

serverHttp.listen(PORT, () => {
  console.log(`Sever is running on the port ${PORT}\nhttp://localhost:${PORT}`);
});
