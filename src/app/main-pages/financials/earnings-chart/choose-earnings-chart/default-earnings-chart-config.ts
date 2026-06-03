import { EarningsChartConfig } from "../earnings-chart-config.interface";
import { EarningsChartPropertySelection } from "./earnings-chart-property-selection.enum";

export const defaultEarningsChartConfig: EarningsChartConfig = {
    period: 'QUARTER',
    startYear: 2018,
    endYear: 9999,
    selectedProperty: EarningsChartPropertySelection.REVENUE_VS_NET_INCOME,
    menuLabel: 'Revenue and Net Income',
}