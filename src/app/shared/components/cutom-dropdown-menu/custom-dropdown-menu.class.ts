export class CustomDropdownMenu {

    private _menuItems: string[] = [];

    private _currentSelectionIndex: number = -1;

    public get menuItems(): string[] { return this._menuItems; }
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
}