import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { conceptPageItems, DirectoryItem, eventPageItems, gamestopPageItems, mainPageItems, peoplePageItems } from './directory-items';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [RouterModule, FooterComponent, CommonModule],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'gmewiki.org Directory | gmewiki.org';
    const description = 'List of pages on gmewiki.org ';
    const url = 'https://gmewiki.org/directory';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }



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
