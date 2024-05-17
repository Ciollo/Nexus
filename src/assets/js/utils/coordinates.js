export function getCaretCoordinates() {
	let x = 0,
		y = 0;
	const sel = window.getSelection();
	if (sel.rangeCount) {
		const range = sel.getRangeAt(0);
		if (range.getClientRects().length) {
			const rect = range.getClientRects()[0];
			x = rect.left;
			y = rect.bottom;
		}
	}
	return { x, y };
}