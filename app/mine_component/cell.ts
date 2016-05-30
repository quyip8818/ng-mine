/**
 * Created by quyip on 5/28/16.
 */
export class Cell {
    public hasMine: boolean = false;
    public disabled: boolean = false;
    public num_mines: number;
    public text: String;

    constructor(public row: number, public column: number){}
    
}