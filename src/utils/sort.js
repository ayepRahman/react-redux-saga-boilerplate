export const sortOrders = {
  ascending: 'asc',
  descending: 'desc',
};

export function parseSortParameterURLValue(value = '') {
  if (value && value.length > 0) {
    const splitValue = value.split('.');
    const field = splitValue[0];
    const order = splitValue[1];
    console.log({ splitValue });

    if (splitValue && splitValue.length === 2) {
      return {
        field,
        order,
      };
    }
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
