export function shortenString(str: string, charLimit: number) {
	if (str.length > charLimit) {
		return str.slice(0, charLimit) + '...';
	} else {
		return str;
	}
}
