const CRM_API_URL = process.env.CRM_API_URL || "http://api.in.chaitin.net/crm/query";
export class CrmApiError extends Error {
    graphqlErrors;
    statusCode;
    constructor(message, graphqlErrors, statusCode) {
        super(message);
        this.graphqlErrors = graphqlErrors;
        this.statusCode = statusCode;
        this.name = "CrmApiError";
    }
}
export async function crmQuery(query, variables) {
    const token = process.env.CRM_TOKEN;
    if (!token) {
        throw new CrmApiError("CRM_TOKEN environment variable is not set");
    }
    const body = JSON.stringify({ query, variables: variables ?? {} });
    const response = await fetch(CRM_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body,
    });
    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new CrmApiError(`CRM API HTTP ${response.status}: ${text || response.statusText}`, undefined, response.status);
    }
    const json = (await response.json());
    if (json.errors?.length) {
        throw new CrmApiError(`GraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`, json.errors);
    }
    return json.data;
}
//# sourceMappingURL=graphql-client.js.map