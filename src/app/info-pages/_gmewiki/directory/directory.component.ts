import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { conceptPageItems, DirectoryItem, eventPageItems, gamestopPageItems, mainPageItems, peoplePageItems } from './directory-items';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';


@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [RouterModule, FooterComponent, CommonModule],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'gmewiki.org Directory | gmewiki.org',
    description: 'List of pages on gmewiki.org',
    url: 'https://gmewiki.org/directory',
    image: '',
    githubPageUrl: 'info-pages/_gmewiki/directory/directory.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }


  public get isMobile(): boolean { return this._screenService.screenWidth < 1200; }
  // public get isTouchDevice(): boolean { return this._screenService.isTouchDevice; }

  public get mainDirectoryItems(): DirectoryItem[] { return mainPageItems; }
  public get peopleDirectoryItems(): DirectoryItem[] { return peoplePageItems; }
  public get conceptsDirectoryItems(): DirectoryItem[] { return conceptPageItems; }
  public get eventsDirectoryItems(): DirectoryItem[] { return eventPageItems; }
  public get gameStopDirectoryItems(): DirectoryItem[] { return gamestopPageItems; }

  public get allLists(): {
    title: string,
    list: DirectoryItem[]
  }[] {
    return [
      {
        title: 'Main Pages',
        list: this.mainDirectoryItems,
      },
      {
        title: 'GameStop Information Pages',
        list: this.gameStopDirectoryItems,
      },
      {
        title: 'People Pages',
        list: this.peopleDirectoryItems,
      },
      {
        title: 'Events Pages',
        list: this.eventsDirectoryItems,
      },
      {
        title: 'Concepts and Other Information Pages',
        list: this.conceptsDirectoryItems,
      },
    ]
  }




}
