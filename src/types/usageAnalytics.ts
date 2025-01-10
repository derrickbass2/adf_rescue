// src/types/usageAnalytics.ts

export interface UsageEvent {
    eventType: string;
    timestamp: Date;
    userId: string;
    details?: Record<string, any>;
}

export interface UsageAnalytics {
    logEvent(event: UsageEvent): void;
    getEvents(userId: string): UsageEvent[];
}

export class UsageAnalyticsImpl implements UsageAnalytics {
    private events: UsageEvent[] = [];

    logEvent(event: UsageEvent): void {
        this.events.push(event);
    }

    getEvents(userId: string): UsageEvent[] {
        return this.events.filter(event => event.userId === userId);
    }
}