import { TooltipItem } from "chart.js";
import { EarningsChartPropertySelection } from "./choose-earnings-chart/earnings-chart-property-selection.enum";


export function earningsChartLabelContext(context: TooltipItem<"bar">, chartOption: EarningsChartPropertySelection): string {
  const numValue = Number(context.raw);
  let label = '';
  if (chartOption === EarningsChartPropertySelection.REVENUE_VS_NET_INCOME) {
    if (context.datasetIndex === 0) {
      label = "Revenue:  $" + numberWithCommas(numValue);
    } else if (context.datasetIndex === 1) {
      label = "Net Income:  $" + numberWithCommas(numValue);
    }
  } else if (chartOption === EarningsChartPropertySelection.NET_PROFIT_MARGIN) {
    label = "Net Profit Margin: " + (numValue).toFixed(1) + " %";
    if (numValue < 0) {
      label = "Net Loss Margin: " + (numValue).toFixed(1) + " %";
    }
  } else if (chartOption === EarningsChartPropertySelection.REVENUE_VS_COST) {
    if (context.datasetIndex === 0) {
      label = "Revenue:  $" + numberWithCommas(numValue);
    } else if (context.datasetIndex === 1) {
      label = "Cost of Sales:  $" + numberWithCommas(numValue);
    }
  } else if (chartOption === EarningsChartPropertySelection.REVENUE_VS_GROSS_PROFIT) {
    if (context.datasetIndex === 0) {
      label = "Revenue:  $" + numberWithCommas(numValue);
    } else if (context.datasetIndex === 1) {
      label = "Gross Profit:  $" + numberWithCommas(numValue);
    }
  } else if (chartOption === EarningsChartPropertySelection.REVENUE_VS_STORES) {
    if (context.datasetIndex === 0) {
      label = "Revenue:  $" + numberWithCommas(numValue);
    } else if (context.datasetIndex === 1) {
      label = "Stores:  " + numberWithCommas(numValue);
    }
  } else if (chartOption === EarningsChartPropertySelection.INTEREST_INCOME) {
    label = "Interest Income:  $" + numberWithCommas(numValue);
  } else if (chartOption === EarningsChartPropertySelection.STOCKHOLDERS_EQUITY) {
    label = "Stockholders' Equity:  $" + numberWithCommas(numValue);
  } else if (chartOption === EarningsChartPropertySelection.OPERATING_INCOME) {
    label = "Operating Income:  $" + numberWithCommas(numValue);
  } else if (chartOption === EarningsChartPropertySelection.GROSS_PROFIT_VS_SGA) {
    if (context.datasetIndex === 0) {
      label = "Gross Profit:  $" + numberWithCommas(numValue);
    } else if (context.datasetIndex === 1) {
      label = "SG&A Expense:  $" + numberWithCommas(numValue);
    }
  } else if (chartOption === EarningsChartPropertySelection.OPERATIONS_VS_SGA) {
    if (context.datasetIndex === 0) {
      label = "Operating Income:  $" + numberWithCommas(numValue);
    } else if (context.datasetIndex === 1) {
      label = "SG&A Expense:  $" + numberWithCommas(numValue);
    }
  } else if (chartOption === EarningsChartPropertySelection.REVENUE_TYPE) {
    if (context.datasetIndex === 0) {
      label = "Hardware:  $" + numberWithCommas(numValue);
    } else if (context.datasetIndex === 1) {
      label = "Software:  $" + numberWithCommas(numValue);
    } else if (context.datasetIndex === 2) {
      label = "Collectibles: $" + numberWithCommas(numValue);
    }
  } else if (chartOption === EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE) {
    if (context.datasetIndex === 0) {
      label = "Hardware: " + (numValue).toFixed(1) + " %";
    } else if (context.datasetIndex === 1) {
      label = "Software: " + (numValue).toFixed(1) + " %";
    } else if (context.datasetIndex === 2) {
      label = "Collectibles: " + (numValue).toFixed(1) + " %";
    }
  }
  else if (chartOption === EarningsChartPropertySelection.REVENUE_PER_STORES) {

    label = "Revenue per store: $" + (numberWithCommas(Number(numValue.toFixed(0))));

  } else if (chartOption === EarningsChartPropertySelection.NET_INCOME) {
    label = 'Net income: $' + (numberWithCommas(Number(numValue.toFixed(0))));
  } else if (chartOption === EarningsChartPropertySelection.EPS) {
    label = 'Earnings per Share: $' + (numberWithCommas(Number((numValue/100).toFixed(2))));
  } else if (chartOption === EarningsChartPropertySelection.BOOK_VALUE_PER_SHARE) {
    label = 'Book value per Share: $' + (numberWithCommas(Number((numValue/100).toFixed(2))));
  }
  return label;
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}