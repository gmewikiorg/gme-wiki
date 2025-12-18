import { EarningsChartPropertySelection } from "./earnings-chart-property-selection.enum";

export interface EarningsChartConfig{
    period: 'QUARTER' | 'ANNUAL';
    startYear: number;
    endYear: number;
    selectedProperty: EarningsChartPropertySelection;
    menuLabel: string;
}