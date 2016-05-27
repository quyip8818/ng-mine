/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Yongsheng Li
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {Component, OnInit, OnDestroy} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {DefaultValue} from '../config/default_value';
import {Service} from "../service/Service";
import {Events} from "../config/events";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'mine-component',
    templateUrl: 'app/mine_component/mine.entry.html',
    directives: [],
    providers: []
})
export class MineComponent implements OnInit, OnDestroy {

    config = DefaultValue.getDefaultConfig();
    serviceSubscription: Subscription;

    constructor(private service: Service) {}

    ngOnInit():void {
        this.serviceSubscription = this.service.coreService.subscribe(
          data => {
              this.processData(data);
          });
    }

    ngOnDestroy():void {
        this.serviceSubscription.unsubscribe();
    }

    processData(data: {method: string, body: any}) {
        switch (data.method) {
            case Events.INIT_MINE:
                this.config = data.body;
                break;
        }
    }
}
