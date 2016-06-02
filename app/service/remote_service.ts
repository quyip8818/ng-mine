/**
 * Created by derek on 2016/5/26.
 */

import {Injectable} from '@angular/core';

@Injectable()
export class RemoteService {
    constructor() {}

    get(id: number) {
        //return this._http.get('http://jsonplaceholder.typicode.com/posts/' + id);
    }
}