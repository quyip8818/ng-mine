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

import {Component} from '@angular/core';

import {DefaultValue} from '../config/default_value';
import {LocalService} from "../service/local_service";
import {Events} from "../config/events";

@Component({
    selector: 'config-component',
    templateUrl: 'app/config_component/config.component.html',
    directives: [],
    providers: []
})
export class ConfigComponent {

    STATUS = {
        NEW: 0,
        SETTLED: 1
    };

    config = DefaultValue.getDefaultConfig();
    status = this.STATUS.NEW;

    constructor(private localService: LocalService) {}

    onSubmit() {
        this.status = this.STATUS.SETTLED;
        this.localService.publish(Events.INIT_MINE, this.config);
    }

    reset() {
        this.config = DefaultValue.resetDefaultConfig(this.config);
        this.status = this.STATUS.NEW;
    }

    finished() {
        this.localService.publish(Events.FINISHED, {});
    }

    restart() {
        this.localService.publish(Events.RESTART, {});
    }

    reconfig() {
        this.status = this.STATUS.NEW;
        this.localService.publish(Events.RECONFIG, {});
    }

    get diagnostic() { return JSON.stringify(this.config); }
}
