import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative } from '../util/utils';

export class MfCookieJar {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const quantity = block.permutation.getState("medieval:quantity");
		if (quantity < 12 && item?.typeId === "minecraft:cookie") {
			block.setPermutation(block.permutation.withState("medieval:quantity", quantity + 1));
			dimension.playSound("block.itemframe.add_item", block.center());
			if (!isCreative(player)) decrementItemInHand(player);
		} else if (quantity > 0 && item?.typeId !== "minecraft:cookie") {
			block.setPermutation(block.permutation.withState("medieval:quantity", quantity - 1));
			dimension.playSound("block.itemframe.remove_item", block.center());
			if (!isCreative(player)) addItemOrSpawn(player, new ItemStack("minecraft:cookie", 1));
		}
	}
	onPlayerDestroy(e) {
		const { player, block, dimension, destroyedBlockPermutation } = e;
		if (isCreative(player)) return;
		const quantity = destroyedBlockPermutation.getState("medieval:quantity");
		dimension.spawnItem(new ItemStack("minecraft:cookie", quantity), block.center());
	}
}