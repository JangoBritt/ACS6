import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative } from '../util/utils';

export class MfItemTable {
	onPlayerInteract(e) {
		const { player, block, dimension, face } = e;
		if (face === "Up" || face === "Down") return;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const allowedItems = ["minecraft:apple", "minecraft:golden_apple", "minecraft:bamboo", "minecraft:honey_bottle", "minecraft:potion", "minecraft:book"];
		const itemType = block.permutation.getState("medieval:item");
		if (allowedItems.includes(item?.typeId) && itemType === 0) {
			block.setPermutation(block.permutation.withState("medieval:item", allowedItems.indexOf(item.typeId) + 1));
			dimension.playSound("block.itemframe.add_item", block.center());
			if (!isCreative(player)) decrementItemInHand(player);
		} else if (itemType > 0 && allowedItems.includes(item?.typeId) && item?.typeId !== allowedItems[itemType - 1]) {
			block.setPermutation(block.permutation.withState("medieval:item", allowedItems.indexOf(item.typeId) + 1));
			dimension.playSound("block.itemframe.add_item", block.center());
			if (!isCreative(player)) {
				decrementItemInHand(player);
				addItemOrSpawn(player, new ItemStack(allowedItems[itemType - 1]));
			}
		} else if (itemType > 0 && player.isSneaking) {
			block.setPermutation(block.permutation.withState("medieval:item", 0));
			dimension.playSound("block.itemframe.remove_item", block.center());
			addItemOrSpawn(player, new ItemStack(allowedItems[itemType - 1]));
		}
	}
	onPlayerDestroy(e) {
		const { block, dimension, destroyedBlockPermutation } = e;
		const allowedItems = ["minecraft:apple", "minecraft:golden_apple", "minecraft:bamboo", "minecraft:honey_bottle", "minecraft:potion", "minecraft:book"];
		const itemType = destroyedBlockPermutation.getState("medieval:item");
		if (itemType > 0) {
			dimension.spawnItem(new ItemStack(allowedItems[itemType - 1], 1), block.center());
		}
	}
}