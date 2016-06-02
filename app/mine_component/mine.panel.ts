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
import {LocalService} from "../service/local_service";
import {Events} from "../config/events";
import {COMMON_STRING} from "../config/common_string";
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
    winLine = "";
    num_mine_left;
    finished = false;
    private serviceSubscription: Subscription;

    constructor(private localService: LocalService) {
        this.config = DefaultValue.getDefaultConfig();
        this.initCells(true);
    }

    ngOnInit():void {
        this.serviceSubscription = this.localService.coreService.subscribe(
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
                this.initCells(false);
                break;
            case Events.RESTART:
                this.initCells(false);
                break;
            case Events.RECONFIG:
                this.initCells(true);
                break;
            case Events.FINISHED:
                console.log(this.checkFinished());
                this.winLine = this.checkFinished() ? COMMON_STRING.WIN : COMMON_STRING.LOST;
                break;
        }
    }

    initCells(disabled: boolean) : void {
        this.winLine = "";
        this.finished = false;
        this.num_mine_left = this.config.num_mines;
        this.cells = [];
        for (var i = 0; i < this.config.height; i++) {
            this.cells[i] = [];
            for (var j = 0; j < this.config.width; j++) {
                this.cells[i][j] = new Cell(i, j);
                this.cells[i][j].disabled = disabled;
            }
        }
        
        for (var i : number = 0; i < this.config.num_mines;) {
            if (this.putMine()) {
                i++;
            }
        }

        for (var i = 0; i < this.config.height; i++) {
            for (var j = 0; j < this.config.width; j++) {
                this.cells[i][j].num_mines = this.countMine(i, j);
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

    getNearestEdge(i: number, j: number) {
        return {
            rowstart: Math.max(0, i - 1),
            rowend: Math.min(this.config.height - 1, i + 1),
            columnstart: Math.max(0, j - 1),
            columnend: Math.min(this.config.width - 1, j + 1)
        };
    }

    countMine(i: number, j: number): number {
        var edge = this.getNearestEdge(i, j);
        var count = 0;
        for (var i = edge.rowstart; i <= edge.rowend; i++) {
            for (var j = edge.columnstart; j <= edge.columnend; j++) {
                if (this.cells[i][j].hasMine) {
                    count++;
                }
            }
        }
        return count;
    }

    expandMap(records: {row: number, column: number}[])
            : {row: number, column: number}[] {
        var results = [];
        for (var r = 0; r < records.length; r++) {
            var row = records[r].row;
            var column = records[r].column;
            var edge = this.getNearestEdge(row, column);
            for (var i = edge.rowstart; i <= edge.rowend; i++) {
                for (var j = edge.columnstart; j <= edge.columnend; j++) {
                    if (this.cells[i][j].disabled) {
                        continue;
                    }
                    if (this.cells[i][j].num_mines > 0) {
                        this.cells[i][j].disabled = true;
                        this.cells[i][j].text = "" + this.cells[i][j].num_mines;
                    } else if (this.cells[i][j].num_mines == 0) {
                        this.cells[i][j].disabled = true;
                        results.push({row: i, column: j});
                    }
                }
            }
        }
        return results;
    }

    cellClick(event: MouseEvent, row: number, column: number): void {
        if (event.ctrlKey) {
            this.markMine(row, column);
        } else {
            this.checkMine(row, column);
        }
    }

    markMine(row: number, column: number): void {
        if (this.cells[row][column].marked) {
            this.num_mine_left++;
            this.cells[row][column].marked = false;
        } else {
            this.num_mine_left--;
            this.cells[row][column].marked = true;
        }
        console.log(this.num_mine_left);
    }

    checkMine(row: number, column: number): void {
        if (this.cells[row][column].marked) {
            return;
        }
        if (this.cells[row][column].hasMine) {
            this.finished = true;
            this.winLine = COMMON_STRING.LOST;
            this.cells[row][column].bombed = true;
        } else if (this.cells[row][column].num_mines > 0) {
            this.cells[row][column].text = "" + this.cells[row][column].num_mines;
        } else {
            var records = [{row: row, column: column}];
            while (records.length > 0) {
                records = this.expandMap(records);
            }
        }
        this.cells[row][column].disabled = true;
    }

    checkFinished(): boolean {
        this.finished = true;
        for (var i = 0; i < this.config.height; i++) {
            for (var j = 0; j < this.config.width; j++) {
                if (this.cells[i][j].marked != this.cells[i][j].hasMine) {
                    return false;
                }
            }
        }
        return true;
    }
}
