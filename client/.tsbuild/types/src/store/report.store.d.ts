export declare const useReportStore: import("pinia").StoreDefinition<"report", {
    kpi: any;
    loading: boolean;
}, {}, {
    fetchKpi(startDate: string, endDate: string): Promise<void>;
}>;
