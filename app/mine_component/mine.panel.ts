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

import {DefaultValue} from '../config/default_value';
import {Service} from "../service/Service";
import {Events} from "../config/events";
import {Subscription} from "rxjs/Subscription";
import {Cell} from "./cell";

@Component({
    selector: 'mine-panel',
    templateUrl: 'app/mine_component/mine.panel.html',
    directives: [],
    providers: []
})
export class MinePanel implements OnInit, OnDestroy {

    private config;
    cells : Cell[][];

    private serviceSubscription: Subscription;

    constructor(private service: Service) {
        this.config = DefaultValue.getDefaultConfig();
        this.initCells();
    }

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
                this.initCells();
                break;
        }
    }

    initCells() : void {
        this.cells = [];
        for (var i = 0; i < this.config.height; i++) {
            this.cells[i] = [];
            for (var j = 0; j < this.config.width; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }
        
        for (var i : number = 0; i < this.config.num_mines;) {
            if (this.putMine()) {
                i++;
            }
        }

        for (var i = 0; i < this.config.height; i++) {
            for (var j = 0; j < this.config.width; j++) {
                var rowstart = Math.max(0, i - 1);
                var rowend = Math.min(this.config.height - 1, i + 1);
                var columnstart = Math.max(0, j - 1);
                var columnend = Math.min(this.config.width -1, j + 1);
                this.cells[i][j].num_mines =
                    this.countMine(rowstart, rowend, columnstart, columnend);
            }
        }
    }
    
    putMine(): boolean {
        var row = Math.floor(Math.random() * this.config.height);
        var column = Math.floor(Math.random() * this.config.width);
        if (!this.cells[row][column].hasMine) {
            this.cells[row][column].hasMine = true;
            return true;
        } else {
            return false;
        }
    }

    countMine(rowstart: number, rowend: number, columnstart: number, columnend: number): number {
        var count = 0;
        for (var i = rowstart; i <= rowend; i++) {
            for (var j = columnstart; j <= columnend; j++) {
                if (this.cells[i][j].hasMine) {
                    count++;
                }
            }
        }
        return count;
    }

    cellClick(row: number, column: number): void {
        if (this.cells[row][column].hasMine) {
            this.cells[row][column].text = "D";
        } else if (this.cells[row][column].num_mines > 0) {
            this.cells[row][column].text = "" + this.cells[row][column].num_mines;
        } else {
            this.expandMap(row, column);
        }
        this.cells[row][column].disabled = true;
    }

    expandMap(row: number, column: number) {
        
    }

    get diagnostic() { return JSON.stringify(this.cells); }
}
