// import * as data from "./event.data";

export class eventService {
  constructor(client) {
    this.client = client;
  }

  test() {
    return this.client.get("");
  }
}
