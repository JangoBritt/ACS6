import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative } from '../util/utils';

const itemMap = {
	0: {1: "minecraft:cooked_beef",2: "minecraft:cooked_mutton",3: "minecraft:cooked_porkchop",4: "minecraft:cooked_cod",5: "minecraft:cooked_salmon",6: "minecraft:apple",7: "minecraft:golden_apple",8: "minecraft:bread",9: "minecraft:cookie",10: "minecraft:carrot",11: "minecraft:golden_carrot",12: "minecraft:melon_slice",13: "minecraft:glistering_melon_slice",14: "minecraft:cooked_chicken",15: "minecraft:cooked_rabbit"},
	1: {1: "minecraft:rabbit_stew",2: "minecraft:beetroot_soup",3: "minecraft:baked_potato",4: "minecraft:pumpkin_pie",5: "minecraft:beetroot"}
};
export class MfBowl {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const quantity = block.permutation.getState("medieval:quantity");
		const food = block.permutation.getState("medieval:status");
		const foodType = block.permutation.getState("medieval:type");
		const oneItem = ['minecraft:cooked_chicken','minecraft:cooked_rabbit','minecraft:rabbit_stew','minecraft:beetroot_soup','minecraft:pumpkin_pie'];
		const itemFound = Object.values(itemMap).some(subMap => Object.values(subMap).includes(item?.typeId));
		if (itemFound && food === 0) {
			for (const [type, subMap] of Object.entries(itemMap)) {
				for (const [status, itemType] of Object.entries(subMap)) {
					if (item.typeId === itemType) {
						block.setPermutation(block.permutation.withState("medieval:status", parseInt(status)));
						block.setPermutation(block.permutation.withState("medieval:type", parseInt(type)));
						
						dimension.playSound("block.itemframe.add_item", block.center());
						if (!isCreative(player)) decrementItemInHand(player);
					}
				}
			}
		}
		if (itemFound && itemMap[foodType]?.[food] === item?.typeId && quantity < 4 && !oneItem.includes(item?.typeId)) {
			block.setPermutation(block.permutation.withState("medieval:quantity", quantity + 1));
			dimension.playSound("block.itemframe.add_item", block.center());
			if (!isCreative(player)) decrementItemInHand(player);
		}
		if (itemMap[foodType]?.[food] !== item?.typeId && quantity > 1 && food > 0) {
			block.setPermutation(block.permutation.withState("medieval:quantity", quantity - 1));
			dimension.playSound("block.itemframe.remove_item", block.center());
			if (!isCreative(player)) addItemOrSpawn(player, new ItemStack(itemMap[foodType]?.[food], 1));
		}
		if (itemMap[foodType]?.[food] !== item?.typeId && quantity === 1 && food > 0) {
			block.setPermutation(block.permutation.withState("medieval:status", 0));
			block.setPermutation(block.permutation.withState("medieval:type", 0));
			dimension.playSound("block.itemframe.remove_item", block.center());
			if (!isCreative(player)) addItemOrSpawn(player, new ItemStack(itemMap[foodType]?.[food], 1));
		}
	}
	onPlayerDestroy(e) {
		const { player, block, destroyedBlockPermutation } = e;
		if (isCreative(player)) return;
		const quantity = destroyedBlockPermutation.getState("medieval:quantity");
		const food = destroyedBlockPermutation.getState("medieval:status");
		const foodType = destroyedBlockPermutation.getState("medieval:type");
		const itemType = itemMap[foodType]?.[food];
		if (food > 0 && itemType) block.dimension.spawnItem(new ItemStack(itemType, quantity), block.center());
	}
}