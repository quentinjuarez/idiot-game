import axios from "axios";

import { EventService } from "./event/event";

const client = axios.create({
  baseURL:
    process.env.VUE_APP_BACK_URL ||
    "https://idiot-game-server.alwaysdata.net/api",
  headers: { "Access-Control-Allow-Origin": "*" },
});

const services = {
  events: new EventService(client),
};

export default services;
