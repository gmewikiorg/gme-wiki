import annotationPlugin, { AnnotationOptions, AnnotationPluginOptions } from 'chartjs-plugin-annotation';

const x_consoleCycle1Start = 500;
const x_consoleCycle1End = 3000;
const x_consoleCycle2End = 5600;
const x_downfallPeriodEnd = 6660;
const x_limitless = 99999;
const y_labelHeight = 85;  // e.g. the GME share price on a chart.  not dynamic, needs work


const annotationLabel1FirstConsoleCycle = {
    type: 'line',
    borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
    borderWidth: 3,
    label: {
        display: true,
        backgroundColor: () => { if (_isDarkMode) { return 'rgba(0,0,0,0.5)' } return 'rgba(255,255,255,0.5)' },
        borderRadius: 3,
        color: () => { if (_isDarkMode) { return 'white' } return 'black' },
        content: 'Major console cycle',
        font: {
            size: 16,
        },
    },
    arrowHeads: {
        start: {
            display: true,
            borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
        },
        end: {
            display: true,
            borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
        }
    },
    xMax: x_consoleCycle1End,
    xMin: x_consoleCycle1Start,
    xScaleID: 'x',
    yMax: y_labelHeight,
    yMin: y_labelHeight,
    yScaleID: 'y'
}
const annotationLabel2SecondConsoleCycle = {
    type: 'line',
    borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
    borderWidth: 3,
    label: {
        display: true,
        backgroundColor: () => { if (_isDarkMode) { return 'rgba(0,0,0,0.5)' } return 'rgba(255,255,255,0.5)' },
        borderRadius: 3,
        color: () => { if (_isDarkMode) { return 'white' } return 'black' },
        content: 'Second major console cycle',
        font: {
            size: 16,
        },
    },
    arrowHeads: {
        start: {
            display: true,
            borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
        },
        end: {
            display: true,
            borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
        }
    },
    xMax: x_consoleCycle2End,
    xMin: x_consoleCycle1End,
    xScaleID: 'x',
    yMax: y_labelHeight,
    yMin: y_labelHeight,
    yScaleID: 'y'
}
const annotationLine1 = {
    type: 'line',
    borderColor: 'green',
    borderDash: [6, 6],
    borderWidth: 1,
    xMax: 500,
    xMin: 500,
    xScaleID: 'x',
    yMax: 0,
    yMin: 90,
    yScaleID: 'y'
}
const annotationLine2 = {
    type: 'line',
    borderColor: 'green',
    borderDash: [6, 6],
    borderWidth: 1,
    xMax: 3000,
    xMin: 3000,
    xScaleID: 'x',
    yMax: 0,
    yMin: 90,
    yScaleID: 'y'
}
const annotationLine3 = {
    type: 'line',
    borderColor: 'green',
    borderDash: [6, 6],
    borderWidth: 1,
    xMax: 5600,
    xMin: 5600,
    xScaleID: 'x',
    yMax: 0,
    yMin: 90,
    yScaleID: 'y'
}

const annotationLabel3TheDownfall = {
    type: 'line',
    borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
    borderWidth: 3,
    label: {
        display: true,
        backgroundColor: () => { if (_isDarkMode) { return 'rgba(0,0,0,0.5)' } return 'rgba(255,255,255,0.5)' },
        borderRadius: 3,
        color: () => { if (_isDarkMode) { return 'white' } return 'black' },
        content: 'The Downfall',
        font: {
            size: 16,
        },
    },
    arrowHeads: {
        start: {
            display: true,
            borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
        },
        end: {
            display: true,
            borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
        }
    },
    xMax: x_downfallPeriodEnd,
    xMin: x_consoleCycle2End,
    xScaleID: 'x',
    yMax: y_labelHeight,
    yMin: y_labelHeight,
    yScaleID: 'y'
}
const annotationLine4 = {
    type: 'line',
    borderColor: 'green',
    borderDash: [6, 6],
    borderWidth: 1,
    xMax: 6660,
    xMin: 6660,
    xScaleID: 'x',
    yMax: 0,
    yMin: 90,
    yScaleID: 'y'
}

const annotationLabel4TheSneeze = {
    type: 'line',
    borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
    borderWidth: 3,
    label: {
        display: true,
        backgroundColor: () => { if (_isDarkMode) { return 'rgba(0,0,0,0.8)' } return 'rgba(255,255,255,0.8)' },
        borderRadius: 3,
        color: () => { if (_isDarkMode) { return 'white' } return 'black' },
        content: 'The Sneeze & Turnaround',
        font: {
            size: 16,
        },
    },
    arrowHeads: {
        start: {
            display: true,
            borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
        },
        end: {
            display: true,
            borderColor: () => { if (_isDarkMode) { return 'rgba(255,255,255,0.2)' } return 'rgba(11, 49, 0, 0.2)' },
        }
    },
    xMax: x_limitless,
    xMin: x_downfallPeriodEnd,
    xScaleID: 'x',
    yMax: y_labelHeight,
    yMin: y_labelHeight,
    yScaleID: 'y'
}


const annotationBox1ConsoleCycle = {
    type: 'box',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    borderColor: 'rgba(255, 255, 255, 0)',
    borderWidth: 0,
    enter: function ({ element }: any) {
        element.options.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        return true;
    },
    click: function ({ element }: any) {
        console.log(element.label.options.content + ' clicked');
    },
    leave: function ({ element }: any) {
        element.options.backgroundColor = 'rgba(255, 255, 255, 0.01)';
        return true;
    },
    xMax: x_consoleCycle1End,
    xMin: x_consoleCycle1Start,
    xScaleID: 'x',
    yMax: 90,
    yMin: 0,
    yScaleID: 'y'
};
const annotationBox2ConsoleCycle = {
    type: 'box',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    borderColor: 'rgba(255, 255, 255, 0)',
    borderWidth: 0,
    enter: function ({ element }: any) {
        element.options.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        return true;
    },
    click: function ({ element }: any) {
        console.log(element.label.options.content + ' clicked');
    },
    leave: function ({ element }: any) {
        element.options.backgroundColor = 'rgba(255, 255, 255, 0.01)';
        return true;
    },
    xMax: x_consoleCycle2End,
    xMin: x_consoleCycle1End,
    xScaleID: 'x',
    yMax: 90,
    yMin: 0,
    yScaleID: 'y'
};
const annotationBox3Downfall = {
    type: 'box',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    borderColor: 'rgba(255, 255, 255, 0)',
    borderWidth: 0,
    enter: function ({ element }: any) {
        element.options.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        return true;
    },
    click: function ({ element }: any) {
        console.log(element.label.options.content + ' clicked');
    },
    leave: function ({ element }: any) {
        element.options.backgroundColor = 'rgba(255, 255, 255, 0.01)';
        return true;
    },
    xMax: x_downfallPeriodEnd,
    xMin: x_consoleCycle2End,
    xScaleID: 'x',
    yMax: 90,
    yMin: 0,
    yScaleID: 'y'
};
const annotationBox4Sneeze = {
    type: 'box',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    borderColor: 'rgba(255, 255, 255, 0)',
    borderWidth: 0,
    enter: function ({ element }: any) {
        element.options.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        return true;
    },
    click: function ({ element }: any) {
        console.log(element, ' clicked');
    },
    leave: function ({ element }: any) {
        element.options.backgroundColor = 'rgba(255, 255, 255, 0.01)';
        return true;
    },
    xMax: x_limitless,
    xMin: x_downfallPeriodEnd,
    xScaleID: 'x',
    yMax: 90,
    yMin: 0,
    yScaleID: 'y'
};

const annotationsHistoric: any = {
    annotations: {
        annotationLabel1: annotationLabel1FirstConsoleCycle,
        annotationLabel2: annotationLabel2SecondConsoleCycle,
        annotationLine1: annotationLine1,
        annotationLine2: annotationLine2,
        annotationLine3: annotationLine3,
        annotationLabel3: annotationLabel3TheDownfall,
        annotationLine4: annotationLine4,
        annotationLabel4: annotationLabel4TheSneeze,
        annotationBox1: annotationBox1ConsoleCycle,
        annotationBox2: annotationBox2ConsoleCycle,
        annotationBox3: annotationBox3Downfall,
        annotationBox4: annotationBox4Sneeze,
    },
}

let _isDarkMode: boolean = false;

export function getAnnotationConfig(isDarkMode: boolean): any {
    _isDarkMode = isDarkMode;
    return annotationsHistoric;
}