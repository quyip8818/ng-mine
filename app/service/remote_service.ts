/**
 * Created by derek on 2016/5/26.
 */

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class RemoteService {
    constructor(private _http: Http) {}

    get(id: number) {
        return this._http.get('http://jsonplaceholder.typicode.com/posts/' + id);
    }
}