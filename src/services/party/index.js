export class PartyService {
  constructor(client) {
    this.client = client;
  }

  create(data) {
    return this.client.post("/party", data);
  }

  join(user, id) {
    return this.client.post(`/party/join/${id}`, { user });
  }
}
