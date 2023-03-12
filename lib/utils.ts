export const formatSeparator = (
	price: number | string,
	separator = ','
): string => {
	if (price == null) return '';
	return price
		.toString()
		.split('')
		.reverse()
		.reduce(function (acc, num, i) {
			return price === '-' ? acc : num + (i && !(i % 3) ? separator : '') + acc;
		}, '');
};
