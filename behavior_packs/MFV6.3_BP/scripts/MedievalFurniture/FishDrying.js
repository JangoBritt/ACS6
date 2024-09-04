import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative } from '../util/utils';
import { rightBlockLocation, leftBlockLocation } from '../util/globalVariables';

export class MfFishDrying {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const fishLeft = block.permutation.getState("medieval:fish_left");
		const fishRight = block.permutation.getState("medieval:fish_right");
		const allowedItems = ['minecraft:salmon', 'minecraft:cod'];
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		function handleFishPlacement(side, fishState) {
			block.setPermutation(block.permutation.withState(`medieval:fish_${side}`, fishState));
			if (!isCreative(player)) decrementItemInHand(player);
			dimension.playSound("block.itemframe.add_item", block.center());
		}
		function handleFishRemoval(side, fishState) {
			block.setPermutation(block.permutation.withState(`medieval:fish_${side}`, 0));
			if (!isCreative(player)) addItemOrSpawn(player, new ItemStack(allowedItems[fishState - 1], 1));
			dimension.playSound("block.itemframe.remove_item", block.center());
		}
		if (allowedItems.includes(item?.typeId)) {
			const fishState = allowedItems.indexOf(item.typeId) + 1;
			if (fishLeft === 0) handleFishPlacement('left', fishState);
			else if (fishRight === 0) handleFishPlacement('right', fishState);
		} else {
			if (fishRight > 0) handleFishRemoval('right', fishRight);
			else if (fishLeft > 0) handleFishRemoval('left', fishLeft);
		}
	}
	onPlace(e) {
		const { block } = e;
		UpdateFishDrying(block);
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		const leftBlock = block.offset(leftBlockLocation[direction]);
		if (rightBlock.typeId === block.typeId) UpdateFishDrying(rightBlock);
		if (leftBlock.typeId === block.typeId) UpdateFishDrying(leftBlock);
	}
	onPlayerDestroy(e) {
		const { player, block, destroyedBlockPermutation, dimension } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		const leftBlock = block.offset(leftBlockLocation[direction]);
		if (rightBlock.typeId === destroyedBlockPermutation.type.id) UpdateFishDrying(rightBlock);
		if (leftBlock.typeId === destroyedBlockPermutation.type.id) UpdateFishDrying(leftBlock);
		const fishLeft = destroyedBlockPermutation.getState("medieval:fish_left");
		const fishRight = destroyedBlockPermutation.getState("medieval:fish_right");
		const allowedItems = ['minecraft:salmon', 'minecraft:cod'];
		if (!isCreative(player)) dimension.spawnItem(new ItemStack(allowedItems[fishLeft - 1], 1), block.center());
		if (!isCreative(player)) dimension.spawnItem(new ItemStack(allowedItems[fishRight - 1], 1), block.center());
	}
}
function UpdateFishDrying(block) {
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	const rightMatch = block.offset(rightBlockLocation[direction]);
	const leftMatch = block.offset(leftBlockLocation[direction]);

	const sideState = rightMatch.typeId === block.typeId && rightMatch.permutation.getState("minecraft:cardinal_direction") === direction ? leftMatch.typeId === block.typeId && leftMatch.permutation.getState("minecraft:cardinal_direction") === direction? 4 : 3 : leftMatch.typeId === block.typeId && leftMatch.permutation.getState("minecraft:cardinal_direction") === direction? 2: 1;
	block.setPermutation(block.permutation.withState("medieval:side", sideState));
}