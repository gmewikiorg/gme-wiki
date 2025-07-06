export interface ReleaseOverview{
    quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
    year: number;
    summaryPoints: string[],
    quarterOverviewPoints: string[];
    yearOverviewPoints?: string[];
    capitalAllocationPoints?: string[];
    corporateUpdatePoints?: string[];
}