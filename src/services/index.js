import axios from "axios";

import { EventService } from "./event/event";

const client = axios.create({
  baseURL: process.env.BACK_URL,
  headers: { "X-Custom-Header": "idiot-game" },
});

const services = {
  events: new EventService(client),
};

export default services;
