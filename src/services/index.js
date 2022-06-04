import axios from "axios";

import { EventService } from "./event";
import { ShareService } from "./share";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://idiot-game-server.alwaysdata.net/api"
      : process.env.VUE_APP_BACK_URL,
  //
  headers: { "Access-Control-Allow-Origin": "*" },
});

const services = {
  events: new EventService(client),
  share: new ShareService(client),
};

export default services;
