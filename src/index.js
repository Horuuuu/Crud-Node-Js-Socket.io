/*BACKEND*/ 
import express from "express";/*Framework para manejar rutas http*/ 
import { Server as WebSocketServer } from "socket.io";/*para configurar websocket en el servidor y enviar y recibir eventos */
import http from "http";
import Sockets from "./sockets";

const app = express();
const server = http.createServer(app);/*modulo servidor http con las configuracionesde de express */

app.use(express.static(__dirname + "/public"));/*El modulo static de express pinta los archivos de la carpeta /public */

const httpServer = server.listen(3000);
console.log("Server on http://localhost:3000");
/*io conexion desde el servidor */
const io = new WebSocketServer(httpServer);

Sockets(io);
