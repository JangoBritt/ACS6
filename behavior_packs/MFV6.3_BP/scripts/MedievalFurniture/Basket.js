import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative } from '../util/utils';

const itemMap = {
	0: {1: "minecraft:apple",2: "minecraft:golden_apple",3: "minecraft:beetroot",4: "minecraft:bread",5: "minecraft:carrot",6: "minecraft:cod",7: "minecraft:potato",8: "minecraft:salmon",9: "minecraft:golden_carrot",10: "minecraft:cookie",11: "minecraft:melon_slice",12: "minecraft:bamboo",13: "minecraft:honey_bottle",14: "minecraft:egg",15: "minecraft:glistering_melon_slice"},
	1: {0: "minecraft:potion"},
	2: {0: "minecraft:splash_potion"},
	3: {0: "minecraft:glass_bottle", 1: "minecraft:firework_rocket", 2: "minecraft:pumpkin",3: "minecraft:melon_block",4: "minecraft:wheat",5: "minecraft:diamond",6: "minecraft:emerald",7: "minecraft:iron_ingot",8: "minecraft:gold_ingot",9: "minecraft:copper_ingot",10: "minecraft:baked_potato"}
};
export class MfBasket {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const food = block.permutation.getState("medieval:food");
		const foodType = block.permutation.getState("medieval:food_2");
		const itemFound = Object.values(itemMap).some(subMap => Object.values(subMap).includes(item?.typeId));
		if (itemFound && food === 0 && foodType === 0) {
			for (const [type, subMap] of Object.entries(itemMap)) {
				for (const [status, itemType] of Object.entries(subMap)) {
					if (item.typeId === itemType) {
						block.setPermutation(block.permutation.withState("medieval:food", parseInt(status)));
						block.setPermutation(block.permutation.withState("medieval:food_2", parseInt(type)));	
						dimension.playSound("block.itemframe.add_item", block.center());
						if (!isCreative(player) && parseInt(type) !== 1 && parseInt(type) !== 2) decrementItemInHand(player);
					}
				}
			}
		}
		if (itemFound && (food > 0 || (foodType > 0 && food === 0)) && itemMap[foodType]?.[food] !== item?.typeId) {
			for (const [type, subMap] of Object.entries(itemMap)) {
				for (const [status, itemType] of Object.entries(subMap)) {
					if (item.typeId === itemType) {
						block.setPermutation(block.permutation.withState("medieval:food", parseInt(status)));
						block.setPermutation(block.permutation.withState("medieval:food_2", parseInt(type)));
						dimension.playSound("block.itemframe.add_item", block.center());
						if (!isCreative(player)) {
							if (itemMap[foodType]?.[food] && !itemMap[foodType][food].includes("potion")) addItemOrSpawn(player, new ItemStack(itemMap[foodType]?.[food], 1));
							if (parseInt(type) !== 1 && parseInt(type) !== 2) decrementItemInHand(player);
						}
					}
				}
			}
		}
		if (item?.typeId.includes("potion") && food < 15 && (foodType === 1 || foodType === 2)) {
			block.setPermutation(block.permutation.withState("medieval:food", food + 1));
			dimension.playSound("block.itemframe.add_item", block.center());
		}
		if (item?.typeId.includes("potion") && food == 15 && (foodType === 1 || foodType === 2)) {
			block.setPermutation(block.permutation.withState("medieval:food", 0));
			dimension.playSound("block.itemframe.add_item", block.center());
		}
		if ((food > 0 || (foodType > 0 && food === 0)) && player.isSneaking) {
			block.setPermutation(block.permutation.withState("medieval:food", 0));
			block.setPermutation(block.permutation.withState("medieval:food_2", 0));
			dimension.playSound("block.itemframe.remove_item", block.center());
			if (itemMap[foodType]?.[food] && !itemMap[foodType][food].includes("potion")) addItemOrSpawn(player, new ItemStack(itemMap[foodType]?.[food], 1));
		}
	}
	onPlayerDestroy(e) {
		const { player, block, destroyedBlockPermutation } = e;
		if (isCreative(player)) return;
		const food = destroyedBlockPermutation.getState("medieval:food");
		const foodType = destroyedBlockPermutation.getState("medieval:food_2");
		const itemType = itemMap[foodType]?.[food];
		if ((food > 0 || (foodType === 3 && food === 0)) && itemType) block.dimension.spawnItem(new ItemStack(itemType, 1), block.center());
	}
}