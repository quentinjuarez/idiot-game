export class EventService {
  constructor(client) {
    this.client = client;
  }

  create(data) {
    return this.client.post("/events", data);
  }
}
