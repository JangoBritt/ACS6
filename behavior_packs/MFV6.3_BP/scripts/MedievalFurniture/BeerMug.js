import { ItemStack, BlockPermutation } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative } from '../util/utils';

export class MfBeerMug {
	onPlayerInteract(e) {
		if (e.block.typeId.includes("medieval:beer_mug_")) UpdateBlockQuantity(e, 3);
		else UpdateBlockQuantity(e, 2);
	}
	onPlayerDestroy(e) {
		const { block, dimension, destroyedBlockPermutation } = e;
		const quantity = destroyedBlockPermutation.getState("medieval:quantity");
		if (quantity > 0) dimension.spawnItem(new ItemStack(`${destroyedBlockPermutation.type.id}_item`, quantity), block.center());
	}
}
function UpdateBlockQuantity(e, maxQuantity) {
	const { player, block, dimension } = e;
	const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
	const quantity = block.permutation.getState("medieval:quantity");

	if (item?.typeId === `${block.typeId}_item` && quantity < maxQuantity) {
		block.setPermutation(block.permutation.withState("medieval:quantity", quantity + 1));
		if (!isCreative(player)) decrementItemInHand(player);
		dimension.playSound("block.itemframe.add_item", block.center());
	}
	if (quantity > 0 && player.isSneaking) {
		if (!isCreative(player)) addItemOrSpawn(player, new ItemStack(`${block.typeId}_item`, 1));
		block.setPermutation(block.permutation.withState("medieval:quantity", quantity - 1));
		dimension.playSound("block.itemframe.remove_item", block.center());
	}
	if (quantity === 0 && player.isSneaking) {
		if (!isCreative(player)) addItemOrSpawn(player, new ItemStack(`${block.typeId}_item`, 1));
		block.setPermutation(BlockPermutation.resolve("minecraft:air"));
		dimension.playSound("block.itemframe.remove_item", block.center());
	}
}