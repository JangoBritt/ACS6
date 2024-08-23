import { addOrReplaceItem } from '../util/utils';

export class MrFillSink {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const inventory = player.getComponent("inventory").container;
		const item = inventory.getItem(player.selectedSlotIndex);
		const waterLevel = block.permutation.getState("mr:state");
		if (item?.typeId === "minecraft:water_bucket" && waterLevel < 10) {
			handleInteraction(player, block, dimension, waterLevel + 1, "bucket.empty_water", "minecraft:bucket", 1);
		} else if (item?.typeId === "minecraft:bucket" && waterLevel > 0) {
			handleInteraction(player, block, dimension, waterLevel - 1, "bucket.fill_water", "minecraft:water_bucket", 1);
		} else if (item?.typeId === "minecraft:glass_bottle") {
			handleInteraction(player, block, dimension, waterLevel, "bottle.dragonbreath", "minecraft:potion", 1);
			dimension.playSound("bucket.fill_water", block.center());
		}
	}
}
function handleInteraction(player, block, dimension, newState, soundEffect, newItemType, newItemCount) {
	block.setPermutation(block.permutation.withState("mr:state", newState));
	dimension.playSound(soundEffect, block.center());
	addOrReplaceItem(player, newItemType, newItemCount);
}