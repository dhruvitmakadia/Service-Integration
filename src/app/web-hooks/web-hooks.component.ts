import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebHookService } from '../web-hook.service';


@Component({
  selector: 'app-web-hooks',
  templateUrl: './web-hooks.component.html',
  styleUrls: ['./web-hooks.component.scss']
})
export class WebHooksComponent implements OnInit {

  webHooks: any = [];
  webHook: any = [];
  hookData: object = {};
  tokenInsert: boolean = null;
  tokenEdit: boolean = null;
  tokenSearch: boolean = null;
  id: number = null;
  name: string = null;
  description: string = null;
  methods: string = null;
  url: string = null;
  json: string = null;

  constructor(
    private httpClient: HttpClient,
    private hookService: WebHookService,

  ) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/webHooks').subscribe(data => {
      console.log(data);
      this.webHooks = data;
    });
    // this.webHooks = this.hookService.getWebHooks();
  }

  /**
   * Show Form on DOM for insert data
   */
  insertForm() {
     this.tokenInsert = true;
  }

  /**
   * Show Form on DOM for search data by ID
   */
  searchForm() {
    this.tokenSearch = true;
  }

  /**
   * Hide Open Form from DOM
   */
  hideForm() {
    this.tokenInsert = false;
    this.tokenSearch = false;
    this.tokenEdit = false;
    this.id = null;
    this.name = null;
    this.description = null;
    this.methods = null;
    this.url = null;
    this.json = null;
    this.webHook = [];
  }

  /**
   * To get search data
   */
  searchData() {
    this.httpClient.get(`http://localhost:3000/webHooks/${this.id}`).subscribe(data => {
      console.log(data);
      this.webHook = data;
    });
  }

  /**
   * To insert data
   */
  insertData() {
    this.hookData = {
      name: this.name,
      description: this.description,
      methods: this.methods,
      url: this.url,
      json: this.json
    };
    this.hookService.insertWebHooks(this.hookData);
  }

  /**
   * To delete data
   * @param id unique ID of data to delete
   */
  deleteWebHook(id: number) {
    if (confirm('Are You Sure To Delete This Record?')) {
      this.hookService.deleteWebHooks(id);
    }
  }

  /**
   * Store updated data to variables
   * @param data data that are gonna update
   */
  editWebHook(data: object) {
    this.tokenEdit = true;
    const index = this.webHooks.indexOf(data);
    this.id = this.webHooks[index].id;
    this.name = this.webHooks[index].name;
    this.description = this.webHooks[index].description;
    this.methods = this.webHooks[index].methods;
    this.url = this.webHooks[index].url;
    this.json = this.webHooks[index].json;
  }

  /**
   * Update data
   */
  updateData() {
    this.hookData = {
      name: this.name,
      description: this.description,
      methods: this.methods,
      url: this.url,
      json: this.json
    };
    this.hookService.updateWebHooks(this.id, this.hookData);
  }
}
