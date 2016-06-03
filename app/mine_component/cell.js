"use strict";
/**
 * Created by quyip on 5/28/16.
 */
class Cell {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.hasMine = false;
        this.disabled = false;
        this.marked = false;
        this.bombed = false;
    }
}
exports.Cell = Cell;
//# sourceMappingURL=cell.js.map