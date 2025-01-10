export class Integration {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public async sync(organizationId: string): Promise<void> {
        // Implementation here
    }
}

export class IntegrationService {
    private integrations: Map<string, Integration> = new Map();

    public async syncData(organizationId: string): Promise<void> {
        for (const integration of this.integrations.values()) {
            await integration.sync(organizationId);
        }
    }

    public registerIntegration(integration: Integration): void {
        this.integrations.set(integration.name, integration);
    }
}
