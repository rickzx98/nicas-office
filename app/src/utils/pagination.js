export function getPage(limit, page) {
  return ((page * limit) - limit);
}
