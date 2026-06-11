const CRM_API_URL = process.env.CRM_API_URL || "http://api.in.chaitin.net/crm/query";

export class CrmApiError extends Error {
  constructor(
    message: string,
    public readonly graphqlErrors?: unknown[],
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = "CrmApiError";
  }
}

export async function crmQuery(
  query: string,
  variables?: Record<string, unknown>,
): Promise<unknown> {
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
    throw new CrmApiError(
      `CRM API HTTP ${response.status}: ${text || response.statusText}`,
      undefined,
      response.status,
    );
  }

  const json = (await response.json()) as {
    data?: unknown;
    errors?: Array<{ message: string }>;
  };

  if (json.errors?.length) {
    throw new CrmApiError(
      `GraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`,
      json.errors,
    );
  }

  return json.data;
}
