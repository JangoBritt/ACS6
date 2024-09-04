import { ItemStack } from '@minecraft/server';
import { decrementItemInHand, isCreative } from '../util/utils';

export class MfFillBeer {
	onTick(e) {
		const { block, dimension } = e;
		const fillLevel = block.permutation.getState("medieval:beer_mug");
		if (fillLevel < 4) block.setPermutation(block.permutation.withState("medieval:beer_mug", fillLevel + 1));
		else {
			block.setPermutation(block.permutation.withState("medieval:beer_mug", 0));
			dimension.playSound("block.itemframe.remove_item", block.center());
			dimension.spawnItem(new ItemStack("medieval:beer_mug_fill_item", 1), block.center());
		}
	}
}
export class MfBeerBarrel {
	onPlayerInteract(e) {
		const { player, block, dimension, face, faceLocation } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		if (block.permutation.getState("medieval:beer_mug") === 0 && item?.typeId === "medieval:beer_mug_empty_item") {
			block.setPermutation(block.permutation.withState("medieval:beer_mug", 1));
			dimension.playSound("block.itemframe.add_item", block.center());
			dimension.playSound("m.beer_pour", block.center());
			if (!isCreative(player)) decrementItemInHand(player);
		}
	}
}