export const sortOrders = {
  ascending: 'asc',
  descending: 'desc',
};

export function parseSortParameterURLValue(value = '') {
  if (value && value.length > 0) {
    if (value[0] === '-') return { field: value.substring(1), order: sortOrders.descending };
    else return { field: value, order: sortOrders.ascending };
  }

  return undefined;
}

export function generateSortParameterURLValue({ name = '', order = sortOrders.ascending }) {
  if (name && name.length > 0) {
    if (order === sortOrders.descending) return `-${name}`;
    else return name;
  }

  return '';
}
