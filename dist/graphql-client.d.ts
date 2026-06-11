export declare class CrmApiError extends Error {
    readonly graphqlErrors?: unknown[] | undefined;
    readonly statusCode?: number | undefined;
    constructor(message: string, graphqlErrors?: unknown[] | undefined, statusCode?: number | undefined);
}
export declare function crmQuery(query: string, variables?: Record<string, unknown>): Promise<unknown>;
