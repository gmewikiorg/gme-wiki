import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CustomDropdownMenu } from './custom-dropdown-menu.class';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../services/screen-size.service';

@Component({
  selector: 'app-custom-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-dropdown-menu.component.html',
  styleUrl: './custom-dropdown-menu.component.scss'
})
export class CustomDropdownMenuComponent {

  constructor(private _screenService: ScreenService) {

  }

  private _dropdownMenu: CustomDropdownMenu = new CustomDropdownMenu([]);
  @Input() public set menu(menu: CustomDropdownMenu) { this._dropdownMenu = menu; }
  public get dropdownMenu(): CustomDropdownMenu { return this._dropdownMenu; }
  public get currentItem(): string { return this.dropdownMenu.currentMenuItem; }
  public get menuItems(): string[] { return this.dropdownMenu.menuItems; }

  private _showDropdown: boolean = false;
  public get showDropdown(): boolean { return this._showDropdown; }

  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }

  public onClickMenu() {
    this._showDropdown = !this._showDropdown;
  }

  public get menuBackgroundColor(): string {
    if (this.isDarkMode) {
      return 'black';
    } else {
      return 'white';
    }
  }

  @Output() menuItemSelected = new EventEmitter<string>();
  public onClickMenuItem(menuItem: string) {
    this._showDropdown = false;
    this._dropdownMenu.selectMenuItem(menuItem);
    this.menuItemSelected.emit(menuItem);
  }


  private _mouseIsIn: boolean = false;

  public onMouseLeave() {
    this._mouseIsIn = false;
  }
  public onMouseEnter() {
    this._mouseIsIn = true;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this._mouseIsIn === false) {
      this._showDropdown = false;
    }
  }
}
