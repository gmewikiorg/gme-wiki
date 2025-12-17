export class CustomDropdownMenu {

    private _menuItems: string[] = [];

    private _currentSelectionIndex: number = -1;

    public get menuItems(): string[] { return this._menuItems; }
    public get currentSelectionIndex(): number { return this._currentSelectionIndex; }
    public get currentMenuItem(): string {
        if (this._currentSelectionIndex > -1) {
            return this.menuItems[this._currentSelectionIndex]
        } else {
            return '';
        }
    }

    constructor(menuItems: string[]) {
        this._menuItems = menuItems;
        if (this._menuItems.length > 0) {
            this._currentSelectionIndex = 0;
        }
    }

    public selectMenuItem(menuItem: string) {
        this._currentSelectionIndex = this._menuItems.indexOf(menuItem);
    }
    public setMenuIndex(index: number){
        if(index < this.menuItems.length){
            this._currentSelectionIndex = index;
        }
    }
    public setMenuItem(value: string){
        const index = this.menuItems.indexOf(value);
        if(index > -1){
            this.setMenuIndex(index);
        }
    }
}