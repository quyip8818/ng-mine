/**
 * Created by derek on 2016/5/26.
 */

import {Injectable} from 'angular2/core';
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class Service {
    private _coreService = new Subject<{method: string, body: any}>();

    coreService = this._coreService.asObservable();

    publish(method: string, data) {
        let event = {
            method: method,
            body: data
        }
        this._coreService.next(event);
    }
}