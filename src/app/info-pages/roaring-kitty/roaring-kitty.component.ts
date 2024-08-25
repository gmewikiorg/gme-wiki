import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';

@Component({
  selector: 'app-roaring-kitty',
  standalone: true,
  imports: [RouterModule, HelpContributeComponent],
  templateUrl: './roaring-kitty.component.html',
  styleUrl: './roaring-kitty.component.scss'
})
export class RoaringKittyComponent {

}
