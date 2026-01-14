import { EarningsChartPropertySelection } from "./choose-earnings-chart/earnings-chart-property-selection.enum";


export function setEarningsChartLegend(chartOption: EarningsChartPropertySelection, chartPeriod: 'ANNUAL' | 'QUARTER' | 'QOVERQ' ){

    let customLegendItems: {title: string; color: string}[] = [];
    let showCustomLegend: boolean = false;
    if (chartOption === EarningsChartPropertySelection.REVENUE_VS_NET_INCOME) {
      customLegendItems = [
        { title: 'Revenue ($ billions)', color: 'rgba(3, 90, 252, 0.9)' },
        { title: 'Net Income ($ millions)', color: 'rgba(0, 145, 10, 0.9)' },
        { title: 'Net Loss ($ millions)', color: 'rgba(255, 0, 0, 0.9)' },
      ];
      showCustomLegend = true;
      // label = 'Revenue and Net Income ' + periodLabel;
    } else if (chartOption === EarningsChartPropertySelection.REVENUE_TYPE || chartOption === EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE) {
      // customLegendItems = [
      //   { title: 'Hardware Revenue', color: 'rgba(3, 90, 252, 0.9)' },
      //   { title: 'Software Revenue', color: 'rgba(255, 165, 0, 0.9)' },
      //   { title: 'Collectibles Revenue', color: 'rgba(7, 145, 7, 0.9)' },
      // ];
      // showCustomLegend = true;
      showCustomLegend = false;
    } else if (chartOption === EarningsChartPropertySelection.REVENUE_VS_COST) {
      customLegendItems = [
        { title: 'Revenue', color: 'rgba(3, 90, 252, 0.9)' },
        { title: 'Cost of sales', color: 'rgba(255, 165, 0, 0.9)' },
      ];
      showCustomLegend = true;
    } else if (chartOption === EarningsChartPropertySelection.REVENUE_VS_GROSS_PROFIT) {
      customLegendItems = [
        { title: 'Revenue', color: 'rgba(3, 90, 252, 0.9)' },
        { title: 'Gross Profit', color: 'rgba(7, 145, 7, 0.9)' },
      ];
      showCustomLegend = true;
    } else if (chartOption === EarningsChartPropertySelection.OPERATIONS_VS_SGA) {
      customLegendItems = [
        { title: 'Operating Income', color: 'rgba(0, 145, 10, 0.9)' },
        { title: 'Operating Loss', color: 'rgba(255, 0, 0, 0.9)' },
        { title: 'SG&A Expense', color: 'rgba(255, 165, 0, 0.9)' },
      ];
      showCustomLegend = true;
    } else if (chartOption === EarningsChartPropertySelection.GROSS_PROFIT_VS_SGA) {
      customLegendItems = [
        { title: 'Gross Profit', color: 'rgba(0, 145, 10, 0.9)' },
        { title: 'SG&A Expense', color: 'rgba(255, 165, 0, 0.9)' },
      ];
      showCustomLegend = true;
    } else if (chartOption === EarningsChartPropertySelection.REVENUE_VS_STORES) {
      if (chartPeriod === 'ANNUAL') {
        customLegendItems = [
          { title: 'Revenue', color: 'rgba(3, 90, 252, 0.9)' },
          { title: 'Store Count', color: 'rgba(255, 165, 0, 0.9)' },
        ];
      } else {
        customLegendItems = [
          { title: 'Revenue', color: 'rgba(3, 90, 252, 0.9)' },
          { title: 'Store Count (FY Values)', color: 'rgba(255, 165, 0, 0.9)' },
        ];
      }
      showCustomLegend = true;
    }
    
    return { 
        customLegendItems: customLegendItems,
        showCustomLegend: showCustomLegend,
    }
}