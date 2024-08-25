import { Router } from "@angular/router";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export class MobileMenuItem{

    private _routerLink: string = '';
    private _iconOrImg: 'ICON' | 'IMAGE';
    private _icon: IconDefinition | null = null;
    private _imgSrc: string = '';
    private _label: string;
    private _isSelected: boolean = false;

    public get routerLink(): string {return this._routerLink; }
    public get iconOrImg(): 'ICON' | 'IMAGE' { return this._iconOrImg};
    public get icon(): IconDefinition | null { return this._icon};
    public get imgSrc(): string { return this._imgSrc};
    public get label(): string { return this._label};
    public get isSelected(): boolean { return this._isSelected; }

    constructor(imageOrIcon: 'ICON' | 'IMAGE', icon: IconDefinition | null, routerLink: string, imgSrc: string, label: string){
        this._iconOrImg = imageOrIcon;
        this._icon = icon;
        this._routerLink = routerLink;
        this._label = label;
        this._imgSrc = imgSrc;
    }

    public select(){ this._isSelected = true; }
    public unselect(){ this._isSelected = false;}

    public onClick(router: Router){
        let isLocal = true;
        if(this.routerLink.includes("https")){
          isLocal = false;
        }
        if(isLocal){
          router.navigate([this.routerLink]);
          this._isSelected = true;
        }else{
          window.open(this.routerLink, "_blank");
        }
    }
}