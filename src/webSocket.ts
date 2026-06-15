import { WebSocket, WebSocketServer } from "ws";
import { Server } from "http";

export function startWebSocket(server: Server) {

    const userConnections = new Map();

    const wsServer = new WebSocketServer({ server });

    wsServer.on("connection", (ws) => {

        console.log("connected to web socket");

        ws.on("message", (data) => {

            const msgData = JSON.parse(data.toString());

            if (msgData.type === "register") {

                //save to map

                userConnections.set(msgData.data, ws);
                console.log("Connection Saved");


            } else if (msgData.type === "chat") {
                //send to reciver
                
                console.log(msgData.data);

            }


        });
    });

}
