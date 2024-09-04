import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative, breakBlockWithItems } from '../util/utils';

export class MfHangingChandelier {
	beforeOnPlayerPlace(e) {
		if (e.face === "Up") e.permutationToPlace = e.permutationToPlace.withState("medieval:facing_direction", 1);
	}
}
export class MfWoodenChandelier {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const lantern = block.permutation.getState("medieval:lantern");
		const allowedItems = ['minecraft:lantern', 'minecraft:soul_lantern'];
		if (allowedItems.includes(item?.typeId) && lantern === 0) {
			block.setPermutation(block.permutation.withState("medieval:lantern", allowedItems.indexOf(item.typeId) + 1));
			dimension.playSound("block.itemframe.add_item", block.center());
			if (!isCreative(player)) decrementItemInHand(player);
		} else if (allowedItems.includes(item?.typeId) && lantern > 0 && allowedItems[lantern - 1] !== item?.typeId) {
			block.setPermutation(block.permutation.withState("medieval:lantern", allowedItems.indexOf(item.typeId) + 1));
			dimension.playSound("block.itemframe.add_item", block.center());
			if (!isCreative(player)) {
				addItemOrSpawn(player, new ItemStack(allowedItems[lantern - 1]));
				decrementItemInHand(player);
			}
		} else if (lantern > 0 && player.isSneaking) {
			block.setPermutation(block.permutation.withState("medieval:lantern", 0));
			dimension.playSound("block.itemframe.remove_item", block.center());
			if (!isCreative(player)) addItemOrSpawn(player, new ItemStack(allowedItems[lantern - 1]));
		}
	}
	onPlayerDestroy(e) {
		const { player, block, destroyedBlockPermutation } = e;
		const lantern = destroyedBlockPermutation.getState("medieval:lantern");
		const allowedItems = ['minecraft:lantern', 'minecraft:soul_lantern'];
		breakBlockWithItems(player, block, allowedItems, lantern);
	}
}