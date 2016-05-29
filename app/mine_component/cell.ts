/**
 * Created by quyip on 5/28/16.
 */
export class Cell {
    public hasMine: boolean = false;
    public disabled: boolean = false;

    constructor(public row: number, public column: number){}
}