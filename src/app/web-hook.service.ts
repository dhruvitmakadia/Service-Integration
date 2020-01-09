import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebHookService {
  private hookUrl = 'http://localhost:3000/webHooks';

  constructor(private httpClient: HttpClient) { }

  /**
   * To send all data of json file
   */
  getWebHooks() {
    return this.httpClient.get(this.hookUrl).pipe(map(response => response));
  }

  /**
   * To insert data in json file
   * @param data get data for insert
   */
  insertWebHooks(data: object) {
    this.httpClient.post(this.hookUrl, data).subscribe();
  }

  /**
   * To update data in json file
   * @param id specific id to update
   * @param data data which has to update
   */
  updateWebHooks(id: number, data: object) {
    this.httpClient.put(`${this.hookUrl}/${id}`, data).subscribe();
  }

  /**
   * To delete data from json file
   * @param id specific id to delete
   */
  deleteWebHooks(id: number) {
    this.httpClient.delete(`${this.hookUrl}/${id}`).subscribe();
  }
}

