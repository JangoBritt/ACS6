import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative, addOrReplaceItem } from '../util/utils';

export class MfBucketFill {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const allowedItems = {
			'minecraft:dirt': { status: 1, sound: "block.itemframe.add_item" },
			'minecraft:gravel': { status: 2, sound: "block.itemframe.add_item" },
			'minecraft:snowball': { status: 3, sound: "block.itemframe.add_item" },
			'minecraft:water_bucket': { status: 4, sound: "bucket.fill_water", replaceWith: "minecraft:bucket" },
			'minecraft:sand': { status: 5, sound: "block.itemframe.add_item" },
			'minecraft:basalt': { status: 6, sound: "block.itemframe.add_item" },
			'minecraft:blackstone': { status: 7, sound: "block.itemframe.add_item" }
		};
		const fillType = block.permutation.getState("medieval:status");
		const itemData = allowedItems[item?.typeId];
		function updateBlock(status, sound, replaceWith = null) {
			block.setPermutation(block.permutation.withState("medieval:status", status));
			dimension.playSound(sound, block.center());
			if (!isCreative(player)) {
				replaceWith ? addOrReplaceItem(player, replaceWith, 1) : decrementItemInHand(player);
			}
		}
		if (fillType === 0 && itemData) {
			updateBlock(itemData.status, itemData.sound, itemData.replaceWith);
		} else if (fillType > 0 && itemData && itemData.status !== fillType) {
			updateBlock(itemData.status, itemData.sound, itemData.replaceWith);
			if (!isCreative(player) && fillType !== 4) {
				addItemOrSpawn(player, new ItemStack(Object.keys(allowedItems)[fillType - 1], 1));
			}
		} else if (!itemData) {
			if (fillType === 4 && item?.typeId === "minecraft:bucket") {
				updateBlock(0, "bucket.empty_water", "minecraft:water_bucket");
			} else if (player.isSneaking) {
				updateBlock(0, "block.itemframe.remove_item");
				if (!isCreative(player)) {
					addItemOrSpawn(player, new ItemStack(Object.keys(allowedItems)[fillType - 1], 1));
				}
			}
		}
	}
	onPlayerDestroy(e) {
		const { block, dimension, destroyedBlockPermutation } = e;
		const fillType = destroyedBlockPermutation.getState("medieval:status");
		const allowedItems = ['minecraft:dirt','minecraft:gravel','minecraft:snowball','minecraft:water_bucket','minecraft:sand','minecraft:basalt','minecraft:blackstone'];
		if (fillType > 0 && fillType !== 4) dimension.spawnItem(new ItemStack(allowedItems[fillType - 1], 1), block.center());
	}
}