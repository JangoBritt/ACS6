import { ItemStack } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative } from '../util/utils';

export class MfStackedLog {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const quantity = block.permutation.getState("medieval:quantity");
		if (item?.typeId === block.typeId && quantity < 3) {
			block.setPermutation(block.permutation.withState("medieval:quantity", quantity + 1));
			if (!isCreative(player)) decrementItemInHand(player);
			dimension.playSound("block.itemframe.add_item", block.center());
		}
		if (quantity > 0 && player.isSneaking) {
			if (!isCreative(player)) addItemOrSpawn(player, new ItemStack(block.typeId, 1));
			block.setPermutation(block.permutation.withState("medieval:quantity", quantity - 1));
			dimension.playSound("block.itemframe.remove_item", block.center());
		}
	}
	onPlayerDestroy(e) {
		const { block, dimension, destroyedBlockPermutation } = e;
		const quantity = destroyedBlockPermutation.getState("medieval:quantity");
		if (quantity > 0) dimension.spawnItem(new ItemStack(destroyedBlockPermutation.type.id, quantity), block.center());
	}
}