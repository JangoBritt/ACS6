import { rightBlockLocation, leftBlockLocation } from '../util/globalVariables';

export class MfBookshelfConnection {
	onPlace(e) {
		const { block } = e;
		UpdateBookShelves(block);
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		const leftBlock = block.offset(leftBlockLocation[direction]);
		const tag = `m.${block.typeId.split(":")[1]}_${direction}`;
		if (rightBlock.hasTag(tag)) UpdateBookShelves(rightBlock);
		if (leftBlock.hasTag(tag)) UpdateBookShelves(leftBlock);
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		const leftBlock = block.offset(leftBlockLocation[direction]);
		const tag = `m.${destroyedBlockPermutation.type.id.split(":")[1]}_${direction}`;
		if (rightBlock.hasTag(tag)) UpdateBookShelves(rightBlock);
		if (leftBlock.hasTag(tag)) UpdateBookShelves(leftBlock);
	}
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const itemState = block.permutation.getState("medieval:items");
		const allowedItems = {'minecraft:book': 1,'minecraft:potion': 3,'minecraft:flower_pot': 5};
		if (item?.typeId in allowedItems) {
			const baseState = allowedItems[item.typeId];
			const randomState = baseState + Math.floor(Math.random() * 2);
			block.setPermutation(block.permutation.withState("medieval:items", randomState));
			dimension.playSound("block.itemframe.add_item", block.center());
		}
		if (player.isSneaking && itemState > 0) {
			block.setPermutation(block.permutation.withState("medieval:items", 0));
			dimension.playSound("block.itemframe.remove_item", block.center());
		}
	}
}
function UpdateBookShelves(block) {
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	const rightBlock = block.offset(rightBlockLocation[direction]);
	const leftBlock = block.offset(leftBlockLocation[direction]);
	const tag = `m.${block.typeId.split(":")[1]}_${direction}`;
	const sideState = rightBlock.hasTag(tag) ? (leftBlock.hasTag(tag) ? 3 : 2): (leftBlock.hasTag(tag) ? 1 : 0);
	block.setPermutation(block.permutation.withState("medieval:side", sideState));
}