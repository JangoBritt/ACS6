import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative, toggleBlockState } from '../util/utils';

const foodList = ["minecraft:apple","minecraft:beetroot","minecraft:carrot","minecraft:bamboo","minecraft:potato","minecraft:golden_apple","minecraft:golden_carrot","minecraft:melon_block","minecraft:pumpkin","minecraft:wheat","minecraft:diamond","minecraft:emerald","minecraft:iron_ingot","minecraft:gold_ingot","minecraft:copper_ingot"];

export class MfBoxItem {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const inventory = player.getComponent("inventory").container;
		const item = inventory.getItem(player.selectedSlotIndex);
		const food = block.permutation.getState("medieval:food");
		const close = block.permutation.getState("medieval:close");
		if (!close) {
			if (food === 0 && foodList.includes(item?.typeId)) {
				block.setPermutation(block.permutation.withState("medieval:food", foodList.indexOf(item.typeId) + 1));
				dimension.playSound("block.itemframe.add_item", block.center());
				if (!isCreative(player)) decrementItemInHand(player);
			} else if (food > 0 && foodList.includes(item?.typeId) && item?.typeId !== foodList[food - 1]) {
				block.setPermutation(block.permutation.withState("medieval:food", foodList.indexOf(item.typeId) + 1));
				dimension.playSound("block.itemframe.add_item", block.center());
				if (!isCreative(player)) {
					addItemOrSpawn(player, new ItemStack(foodList[food - 1], 1));
					decrementItemInHand(player);
				}
			} else if (!player.isSneaking && (!foodList.includes(item?.typeId) || item?.typeId === foodList[food - 1])) {
				toggleBlockState(e, "medieval:close", "block.barrel.close", "block.barrel.open");
			} else if (player.isSneaking && food > 0) {
				block.setPermutation(block.permutation.withState("medieval:food", 0));
				dimension.playSound("block.itemframe.remove_item", block.center());
				if (!isCreative(player)) {
					addItemOrSpawn(player, new ItemStack(foodList[food - 1], 1));
				}
			}
		} else {
			toggleBlockState(e, "medieval:close", "block.barrel.close", "block.barrel.open");
		}
	}
	onPlayerDestroy(e) {
		const { block, dimension, destroyedBlockPermutation } = e;
		const food = destroyedBlockPermutation.getState("medieval:food");
		if (food > 0) dimension.spawnItem(new ItemStack(foodList[food - 1], 1), block.center());
	}
}