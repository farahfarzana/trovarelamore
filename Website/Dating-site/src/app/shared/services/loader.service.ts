import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  status: boolean = false;

  constructor() {}
}
