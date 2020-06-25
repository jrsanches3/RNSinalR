import { noop } from "lodash";
import * as signalR from "@microsoft/signalr";

class WebSocketSignalR {

  /**
   * @param {*} callback 
   * @returns {connection}
   */ 
  static async initSocketConnection(callback) {
    if (!this.connection) {
      this.connection = await new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:44463/chatHub`, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .withHubProtocol(new signalR.JsonHubProtocol())
        .configureLogging(signalR.LogLevel.Information)
        .build();

      WebSocketSignalR.startConnection(callback);
    }
  }

  /**
   * @param {startConnection} callback 
   */
  static startConnection(callback = noop) {
    Object.defineProperty(WebSocket, 'OPEN', { value: 1 });
    this.connection
      .start()
      .then(callback)
      .catch(() => setTimeout(() => WebSocketSignalR.startConnection(), 5000));
  }

  /**
   * @param {string} name 
   * @param {*} callback 
   */
  static onReceiveMessage(name, callback) {
    this.connection.on(name, callback);
  }

  /**
   * 
   * @param {string} name 
   * @param {*} callback 
   */
  static unsubscribeMessage(name, callback) {
    this.connection.off(name, callback);
  }
}

export default WebSocketSignalR;
