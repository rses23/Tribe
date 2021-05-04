import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _storage: Storage | null = null;
  public currentTribeNumber: number;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public setTribeNumber(value: number) {
    console.log("setting tribe number to ", value);
    return this._storage?.set("tribeNumber", value);
  }

  public getTribeNumber() {
    let result = this._storage?.get("tribeNumber");
    console.log("retrieved value is ", result)
    return result;
  }
}
