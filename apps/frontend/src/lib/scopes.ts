export const scopes = {
  orgPage: (chainId: number, page: number, size: number) => ['orgs', 'page', chainId, page, size] as const,
  orgData: (chainId: number, addr: string) => ['orgs', 'data', chainId, addr.toLowerCase()] as const,
  orgCount: (chainId: number) => ['orgs', 'count', chainId] as const
} as const
