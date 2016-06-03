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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const default_value_1 = require('../config/default_value');
const local_service_1 = require("../service/local_service");
const events_1 = require("../config/events");
let ConfigComponent = class ConfigComponent {
    constructor(localService) {
        this.localService = localService;
        this.STATUS = {
            NEW: 0,
            SETTLED: 1
        };
        this.config = default_value_1.DefaultValue.getDefaultConfig();
        this.status = this.STATUS.NEW;
    }
    onSubmit() {
        this.status = this.STATUS.SETTLED;
        this.localService.publish(events_1.Events.INIT_MINE, this.config);
    }
    reset() {
        this.config = default_value_1.DefaultValue.resetDefaultConfig(this.config);
        this.status = this.STATUS.NEW;
    }
    finished() {
        this.localService.publish(events_1.Events.FINISHED, {});
    }
    restart() {
        this.localService.publish(events_1.Events.RESTART, {});
    }
    reconfig() {
        this.status = this.STATUS.NEW;
        this.localService.publish(events_1.Events.RECONFIG, {});
    }
    get diagnostic() { return JSON.stringify(this.config); }
};
ConfigComponent = __decorate([
    core_1.Component({
        selector: 'config-component',
        templateUrl: 'app/config_component/config.component.html',
        directives: [],
        providers: []
    }), 
    __metadata('design:paramtypes', [local_service_1.LocalService])
], ConfigComponent);
exports.ConfigComponent = ConfigComponent;
//# sourceMappingURL=config.component.js.map