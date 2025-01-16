// import { ChartOptions } from "chart.js";

// export function setLineChartOptions(isDarkMode: boolean): ChartOptions<'line'> {

//     let scaleColor = 'rgba(128,128,128,0.2)';
//     if(isDarkMode){
//        scaleColor = 'rgba(255,255,255,0.1)';
//     }

//     const img = new Image();
//     img.src = 'assets/icons/bluesky-logo.png';
    
//     return {
//       responsive: true,
//       maintainAspectRatio: false,
//       animation: false,
//       onHover: (event, array) => {
//         if (array.length > 0) {
//           if (!this._tooltipOpenedFromTimelineItems) {
//             const timelineItem = this._chartDataService.lookupEventByIndex(array[0].datasetIndex, array[0].index);
//             if (timelineItem) {
//               // if(timelineItem.hasLocalArticle){
//               //   this._timelineItemService.selectItem(timelineItem, 'CHART');
//               // }
//             } else {
//             }
//           } else {
//             this._tooltipOpenedFromTimelineItems = false;
//           }

//         } else {
//         }
        
//       },
//       onClick: (event, array) => {
//         if (array.length > 0) {
//           const timelineItem = this._chartDataService.lookupEventByIndex(array[0].datasetIndex, array[0].index);
//           if (timelineItem) {
//             this._timelineItemService.selectItem(timelineItem, 'CHART');
//             // if(timelineItem.hasLocalArticle){
//             //   this._router.navigate([timelineItem.localArticle?.url])
//             // }
//           }
//         }
//       },
//       scales: {
//         x: {
//           grid: {
//             color: 'rgba(0,0,0,0.01)'
//           }
//         },
//         y: {
//           grid: {
//             color: scaleColor // Change the color of the lines along the Y axis
//           }
//         }
//       },
//       plugins: {
//         annotation: {
//           annotations: {
//             imageAnnotation: {
//               type: 'label',
//               xValue: 500,
//               yValue: 45,
//               xAdjust: 100,
//               yAdjust: -200,
//               content: img, // <-- an Image object
//               position: {
//                 x: 'center',
//                 y: 'center'
//               },
//               width: 50,
//               height: 50,
//               // callout: {
//               //   display: true,
//               //   borderColor: 'rgba(0,0,0,0.2)',
//               // },
//               // ... other label configs
//             },
//             textAnnotation: {
//               type: 'label',
//               xValue: 500,
//               yValue: 45,
//               xAdjust: 10,
//               yAdjust: -200,
//               content: 'This is some text This is some text This is some text This is some text ',
//               backgroundColor: 'rgba(0,0,0,0.2)',
//               borderWidth: 1,
//               // drawTime: 'afterDraw',
//               callout: {
//                 display: true,
//                 borderColor: 'rgba(0,0,0,1)',
//               },
//               // ... position it near your image
//             },
//           },
//         },
//         tooltip: {
//           backgroundColor: (context) => {
//             if (context.tooltipItems.length > 0) {
//               this._getTooltipBackgroundColor(context.tooltipItems[0])
//             }
//             return this._tooltipBackgroundColor;
//           },
          
//           borderColor: 'black',
//           borderWidth: 1,
//           displayColors: false,
//           bodyFont: {
//             size: 16,
//             weight: 'bold',
//           },
//           titleFont: {
//             weight: 'normal',
//           },
//           footerFont: {
//             weight: 'normal',
//           },
//           callbacks: {
//             title: (context) => { return this._titleContext(context) },
//             label: (context) => { return this._labelContext(context) },
//             // footer: (context) => { return this._footerContext(context) },
//           },
//         },
//         legend: {
//           display: true,
//           labels: {
//             color: 'rgb(0, 0, 0)',
//             usePointStyle: true
//           },
//           position: 'left'
//         }
//       },

//     };
//   }
