import { ActionFormData } from '@minecraft/server-ui';

const createCustomUi = (pageIndex) => {
    const customUi = new ActionFormData()
        .title(`Mailbox Guidebook ${pageIndex * 2 - 1} - ${pageIndex * 2}`)
        .body("")
        .button("<")
        .button(">");
    return customUi;
};
const showCustomUi = (source, item) => {
	const totalPages = 4;
	let currentPageIndex = item.getDynamicProperty("page");
	if (!currentPageIndex) {
		currentPageIndex = 1;
		item.setDynamicProperty("page", currentPageIndex);
		source.getComponent("inventory").container.setItem(source.selectedSlotIndex, item);
	}
	const customUi = createCustomUi(currentPageIndex);
	customUi.show(source).then(response => {
		if (response.canceled) return;
		const selectedButtonIndex = response.selection;
		if (selectedButtonIndex === 0 && currentPageIndex > 1) {
			currentPageIndex--;
			item.setDynamicProperty("page", currentPageIndex);
			source.getComponent("inventory").container.setItem(source.selectedSlotIndex, item);
			source.playSound("item.book.page_turn");
			showCustomUi(source, item);
		}
		else if (selectedButtonIndex === 1 && currentPageIndex < totalPages) {
			currentPageIndex++;
			item.setDynamicProperty("page", currentPageIndex);
			source.getComponent("inventory").container.setItem(source.selectedSlotIndex, item);
			source.playSound("item.book.page_turn");
			showCustomUi(source, item);
		}
	});
};
export class MbGuidebook {
	onUse(e) {
		const { itemStack, source } = e;
		showCustomUi(source, itemStack);
	}
}