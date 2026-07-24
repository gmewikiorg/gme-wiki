import {
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';

import html2canvas from 'html2canvas';
import { ScreenService } from '../../services/screen-size.service';

@Component({
  selector: 'app-chart-export',
  standalone: true,
  templateUrl: './chart-export.component.html',
  styleUrl: './chart-export.component.scss'
})
export class ChartExportComponent {

  constructor(private _screenService: ScreenService) {

  }

  @Input() filename = 'chart';

  // Watermark text
  @Input() watermark = 'gmewiki.org';

  // Watermark opacity: 0 = invisible, 1 = fully opaque
  @Input() watermarkOpacity = 1;

  @ViewChild('exportContent', { static: true })
  exportContent!: ElementRef<HTMLElement>;

  copied = false;


  async copyChart(): Promise<void> {

    try {

      const canvas = await this.createCanvas();

      const blob = await this.canvasToBlob(canvas);

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);

      this.copied = true;

      setTimeout(() => {
        this.copied = false;
      }, 2000);

    } catch (error) {

      console.error('Could not copy chart:', error);

    }

  }


  async downloadChart(): Promise<void> {

    try {

      const canvas = await this.createCanvas();

      // const link = document.createElement('a');

      // link.download = `${this.filename}.png`;

      // link.href = canvas.toDataURL('image/png');

      // link.click();

    } catch (error) {

      console.error('Could not download chart:', error);

    }

  }


  private async createCanvas(): Promise<HTMLCanvasElement> {

    let backGroundColor = '#ffffff';
    if (this._screenService.isDarkMode) {
      backGroundColor = '#121212de'
    }
    // Capture the chart HTML
    const canvas = await html2canvas(
      this.exportContent.nativeElement,
      {
        backgroundColor: backGroundColor,
        scale: this.captureScale,
        useCORS: true,
        logging: false
      }
    );

    // Add watermark
    // this.addWatermark(canvas);
    // console.log("Watermark added")

    return canvas;

  }

  private readonly captureScale = 1;

  private addWatermark(
    canvas: HTMLCanvasElement
  ): void {

    // Don't add anything if no watermark was specified
    if (!this.watermark) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    context.save();

    /*
     * Scale font size based on exported image size.
     * Since html2canvas uses scale: 2,
     * the exported canvas is larger than the displayed chart.
     */
    const fontSize = Math.max(
      14,
      canvas.width * 0.018
    );

    context.font = `bold ${fontSize}px Arial`;

    context.textAlign = 'right';
    context.textBaseline = 'bottom';

    context.globalAlpha = this.watermarkOpacity;

    context.fillStyle = '#000000';

    // Position 20px from right and bottom
    const padding = 20;

    context.fillText(
      this.watermark,
      canvas.width - padding,
      canvas.height - padding
    );

    context.restore();

  }

  private canvasToBlob(
    canvas: HTMLCanvasElement
  ): Promise<Blob> {

    return new Promise((resolve, reject) => {

      canvas.toBlob(
        blob => {

          if (blob) {
            resolve(blob);
          } else {
            reject(
              new Error('Could not create image blob')
            );
          }

        },
        'image/png'
      );

    });

  }

}