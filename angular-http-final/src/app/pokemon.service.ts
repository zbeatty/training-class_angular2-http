import { Injectable } from '@angular/core';
// import { Jsonp, URLSearchParams } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PokemonService {

  // constructor(private jsonp: Jsonp) { }
  constructor(private http: Http) { }

  getList() {
    let listUrl = 'http://pokeapi.co/api/v2/pokemon?limit=20';

    return this.http.get(listUrl)
      .map(res => res.json());
  }

  getByUrl(url: string) {
    return this.http.get(url)
      .map(res => res.json());
  }

  private handleError(error: any) {
    console.log('error', error);
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
