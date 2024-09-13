import { world, ItemStack, ItemEnchantableComponent, EnchantmentTypes} from '@minecraft/server';
import { Boxes } from './OldBox.js';
import { decrementItemInHand } from '../util/utils.js';

const dataBox = new Boxes("endxBoxes");

export class MbOpenBox {
	onUse(e) {
		const { itemStack, source } = e;
		const boxData = itemStack.getDynamicProperty("mbBox");
		if (boxData) {
			const parsedBoxData = JSON.parse(boxData);
			let entityFound = false;
			const searchEntitiesInDimension = (dimension) => {
				let entityList = dimension.getEntities({ type: "mb:box_container", tags: [`${parsedBoxData.id}`] });
				if (entityList.length > 0) {
					entityFound = true;
					for (let box of entityList) {
						let boxInventory = box.getComponent("inventory").container;
						for (let i = 0; i < boxInventory.size; i++) {
							const item = boxInventory.getItem(i);
							if (!item) continue;
							source.dimension.spawnItem(item, source.location);
						}
						box.remove();
					}
				}
			};
			if (parsedBoxData.message !== '') {
				source.sendMessage({ translate: 'form.open_box.message', with: [`${parsedBoxData.message}`]});
			}
			const dimensions = ["overworld", "nether", "the_end"];
			for (let dim of dimensions) {
				let dimension = world.getDimension(dim);
				searchEntitiesInDimension(dimension);
			}
			if (!entityFound) {
				for (let i = 0; i < parsedBoxData.itemList.length; i++) {
					let itemFromBox = createItemFromData(parsedBoxData.itemList[i]);
					if (itemFromBox) {
						source.dimension.spawnItem(itemFromBox, source.location);
					}
				}
			}
			decrementItemInHand(source);
			return;
		}
		if (itemStack.typeId === "mb:box_full" && itemStack.getLore().length > 0) {
			const lore = itemStack.getLore()[0];
			const match = lore.match(/§bid:\s*(\d+)/);
			const boxId = match ? parseInt(match[1]) : null;
			if (!boxId) {
				source.sendMessage({ translate: 'form.box_already_used'});
				return;
			}
			const box = dataBox.getBoxById(boxId);
			if (!box) {
				source.sendMessage({ translate: 'form.box_already_used'});
				return;
			}
			for (let i = 0; i < box.itemList.length; i++) {
				let itemFromBox = createItemFromData(box.itemList[i]);
				if (itemFromBox) {
					source.dimension.spawnItem(itemFromBox, source.location);
				}
			}
			dataBox.openBox(boxId);
			decrementItemInHand(source);
		}
	}
}
function createItemFromData(itemData) {
	if (!itemData.id || itemData.amount === 0) return null;
	const itemFromBox = new ItemStack(itemData.id, parseInt(itemData.amount));
	if (itemData.name) itemFromBox.nameTag = itemData.name;
	if (itemData.durability > 0) itemFromBox.getComponent("durability").damage = itemData.durability;
	if (itemData.lore) itemFromBox.setLore(itemData.lore);
	if (itemData.enchantmentsList) {
		for (let enchantment of itemData.enchantmentsList) {
			itemFromBox.getComponent(ItemEnchantableComponent.componentId).addEnchantment({type:EnchantmentTypes.get(enchantment.type.id), level:enchantment.level});
		}
	}
	return itemFromBox;
}