import { ImageCarouselItem } from "./image-carousel-item.interface";

export class ImageCarousel{
    private _items: ImageCarouselItem[] = [];
    public get items(): ImageCarouselItem[] { return this._items; }
    constructor(items: ImageCarouselItem[]){
        this._items = items;
    }
}