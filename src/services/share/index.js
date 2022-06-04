export class ShareService {
  constructor(client) {
    this.client = client;
  }

  create(data) {
    return this.client.post("/share", data);
  }

  get(id) {
    return this.client.get(`/share/${id}`);
  }
}
