import { ChartOptions } from "chart.js";

export function earningsChartOptions() {
    let chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
            y: {
                min: minY,
                grid: {
                    color: function (context) {
                        if (context.tick.value === 0) {
                            return 'rgba(0,0,0,0.5)';
                        }
                        return 'rgba(0,0,0,0.05)';
                    },
                },
                ticks: {
                    backdropColor: 'black',
                    // Include a dollar sign in the ticks
                    callback: function (value, index, ticks) {
                        const numVal = Number(value);
                        if (numVal >= 0) {
                            if (numVal === 0) {
                                return '$0'
                            } else {
                                return '$' + (numVal / tickScale) + ' ' + tickLabel;
                            }
                        } else {
                            return '$' + (numVal / tickScale) + ' ' + tickLabel;
                        }
                    }
                }
            },
        },
        layout: {
            padding: {
                right: 10
            }
        },
        plugins: {
            datalabels: {
            },
            legend: {
                onClick: (event, array) => {
                },
                position: 'top',
                labels: {
                    padding: 20,
                    boxWidth: 12,
                    boxHeight: 12,
                },
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => { return this._labelContext(context) },
                    footer: (context) => { return this._footerContext(context) },
                    title: (context) => { return this._titleContext(context) }
                },
            },
        },
    }
}