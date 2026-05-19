export function filterActive<T extends { archived?: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.archived);
}

export function filterArchived<T extends { archived?: boolean }>(items: T[]): T[] {
  return items.filter((item) => item.archived);
}

export function filterBySearch<T extends { title: string }>(
  items: T[],
  query: string,
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => item.title.toLowerCase().includes(q));
}
