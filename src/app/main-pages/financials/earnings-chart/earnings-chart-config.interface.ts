import { EarningsChartPropertySelection } from "./choose-earnings-chart/earnings-chart-property-selection.enum";

export interface EarningsChartConfig{
    period: 'QUARTER' | 'ANNUAL';
    startYear: number;
    endYear: number;
    selectedProperty: EarningsChartPropertySelection;
    menuLabel: string;
    showCustomLegend?: boolean;
}