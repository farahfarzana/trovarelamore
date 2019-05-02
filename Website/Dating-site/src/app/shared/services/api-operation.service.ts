import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiOperationService {
  environment = environment;
  constructor(private http: HttpClient) {}
  host = environment.host;
  registration(data: any) {
    return this.http.post(`${this.host}register/`, data);
  }

  login(data: any) {
    return this.http.post(`${this.host}auth`, data);
  }

  me(token) {
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    return this.http.get(`${this.host}me/`, { headers: headers });
  }

  getCafes() {
    return this.http.get(`${this.host}cafes/`);
  }

  getUsers(token) {
    return this.http.get(`${this.host}users/`, {
      headers: { Authorization: "JWT " + token }
    });
  }

  bookCafe(data) {
    return this.http.post(`${this.host}booking/`, data);
  }

  getBooking(params: string) {
    return this.http.get(`${this.host}booking/?${params}`);
  }
  getInbox(params: string) {
    return this.http.get(`${this.host}message/?${params}`);
  }
  sendMessage(data: any) {
    return this.http.post(`${this.host}message/`, data);
  }
}
