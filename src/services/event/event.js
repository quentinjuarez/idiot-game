// import * as data from "./event.data";

export class EventService {
  constructor(client) {
    this.client = client;
  }

  create(data) {
    return this.client.post("/events", data);
  }
}
