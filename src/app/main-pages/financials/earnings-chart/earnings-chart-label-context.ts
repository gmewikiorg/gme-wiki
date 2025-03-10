import { TooltipItem } from "chart.js";
import { EarningsChartSelection } from "../choose-earnings-chart/earnings-chart-selection.enum";

export function earningsChartLabelContext(context: TooltipItem<"bar">, chartOption: EarningsChartSelection): string{
    const numValue = Number(context.raw);
    let label = '';
    if (chartOption === EarningsChartSelection.REVENUE_VS_NET_INCOME) {
      if (context.datasetIndex === 0) {
        label = "Revenue:  $" + numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "Net Income:  $" + numberWithCommas(numValue);
      }
    } else if (chartOption === EarningsChartSelection.REVENUE_VS_COST) {
      if (context.datasetIndex === 0) {
        label = "Revenue:  $" + numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "Cost of Sales:  $" + numberWithCommas(numValue);
      }
    } else if (chartOption === EarningsChartSelection.REVENUE_VS_GROSS_PROFIT) {
      if (context.datasetIndex === 0) {
        label = "Revenue:  $" + numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "Gross Profit:  $" + numberWithCommas(numValue);
      }
    } else if (chartOption === EarningsChartSelection.REVENUE_VS_STORES) {
      if (context.datasetIndex === 0) {
        label = "Revenue:  $" + numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "Stores:  " + numberWithCommas(numValue);
      }
    } else if (chartOption === EarningsChartSelection.INTEREST_INCOME) {
      label = "Interest Income:  $" + numberWithCommas(numValue);
    } else if (chartOption === EarningsChartSelection.STOCKHOLDERS_EQUITY) {
      label = "Stockholders' Equity:  $" + numberWithCommas(numValue);
    } else if (chartOption === EarningsChartSelection.OPERATING_INCOME) {
      label = "Operating Income:  $" + numberWithCommas(numValue);
    } else if (chartOption === EarningsChartSelection.GROSS_PROFIT_VS_SGA) {
      if (context.datasetIndex === 0) {
        label = "Gross Profit:  $" + numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "SG&A Expense:  $" + numberWithCommas(numValue);
      }
    } else if (chartOption === EarningsChartSelection.OPERATIONS_VS_SGA) {
      if (context.datasetIndex === 0) {
        label = "Operating Income:  $" + numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "SG&A Expense:  $" + numberWithCommas(numValue);
      }
    }
    return label;
}

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }