import { EarningsChartConfig } from "./earnings-chart-config.interface";
import { EarningsChartPropertySelection } from "./earnings-chart-property-selection.enum";

export const defaultEarningsChartConfig: EarningsChartConfig = {
        period: 'QUARTER',
        startYear: 2018,
        endYear: 2025,
        selectedProperty: EarningsChartPropertySelection.REVENUE_VS_NET_INCOME,
        title: 'Revenue and Net Income by fiscal year',
}