const mapping: Record<string, string> = {
  events: 'event',
  meetings: 'meeting',
  organizations: 'organization',
  'sober-counters': 'sober_counter',
  songs: 'song',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
