// /Users/dbass/Documents/GitHub/adf_rescue/src/types/index.tsx

// Exporting all types from a single file for better module resolution
export * from '/Users/dbass/Documents/GitHub/adf_rescue/src/services/websockets';
export * from '/Users/dbass/Documents/GitHub/adf_rescue/src/services/dataCollection';
export * from '/Users/dbass/Documents/GitHub/adf_rescue/src/services/integration';

// websockets.ts
export interface WebSocketMessage {
    type: string;
    payload: any;
}

// dashboard.ts
export interface DashboardState {
    property: string; // Ensure the property type is defined
    // Add other properties as needed
}

// dataCollection.ts
export interface DataCollection {
    id: string;
    data: any;
}

// Fixing the parameter of UnknownAction
export interface UnknownAction {
    type: string;
    [key: string]: any;
}

// Fixing the new expression whose target lacks a construct signature implicitly has an any type
export class DataCollector {
    constructor(public id: string, public data: any) {}
}
    
    export interface MetricData {
        path: string;
        value: number;
        timestamp: number;
    }