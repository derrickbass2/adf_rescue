import { MetricData } from "/Users/dbass/Documents/GitHub/adf_rescue/frontend/src/types/dashboard";
import { UsageDataCollector, AdoptionDataCollector, ResistanceDataCollector, SuccessDataCollector, DataCollector } from "/Users/dbass/Documents/GitHub/adf_rescue/frontend/src/collectors";

export class DataCollectionService {
    private static instance: DataCollectionService;
    private collectors: Map<string, DataCollector>;

    private constructor() {
        this.collectors = new Map();
        this.initializeCollectors();
    }

    public static getInstance(): DataCollectionService {
        if (!DataCollectionService.instance) {
            DataCollectionService.instance = new DataCollectionService();
        }
        return DataCollectionService.instance;
    }

    public async collectData(organizationId: string): Promise<MetricData> {
        const metrics: Partial<MetricData> = {};

        for (const [key, collector] of this.collectors) {
            metrics[key] = await collector.collect(organizationId);
        }

        return metrics as MetricData;
    }

    private initializeCollectors() {
        // Initialize different data collectors
        this.collectors.set('usage', new UsageDataCollector());
        this.collectors.set('adoption', new AdoptionDataCollector());
        this.collectors.set('resistance', new ResistanceDataCollector());
        this.collectors.set('success', new SuccessDataCollector());
    }
}
