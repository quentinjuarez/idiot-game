import axios from "axios";

import { EventService } from "./event";
import { ShareService } from "./share";

const client = axios.create({
  baseURL:
    process.env.VUE_APP_BACK_URL ||
    "https://idiot-game-server.alwaysdata.net/api",
  //
  headers: { "Access-Control-Allow-Origin": "*" },
});

const services = {
  events: new EventService(client),
  share: new ShareService(client),
};

export default services;
