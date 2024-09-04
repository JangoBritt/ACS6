import { BlockPermutation } from '@minecraft/server';
import { decrementItemInHand, isCreative, addOrReplaceItem } from '../util/utils';
import { colors } from '../util/globalVariables';

export class MfDyePot {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const typePot = block.typeId.split(/(?=pot)/)[1];
		if (item?.typeId.includes("minecraft:") && item?.typeId.includes("_dye")) {
			const dyeColor = item.typeId.split(':')[1].split('_dye')[0];
			if (`medieval:${dyeColor}_${typePot}` !== block.typeId) {
				block.setPermutation(BlockPermutation.resolve(`medieval:${dyeColor}_${typePot}`));
				dimension.playSound("copper.wax.on", block.center());
				if (!isCreative(player)) decrementItemInHand(player);
			}
		}
		if (colors.some(color => block.typeId.includes(color)) && item?.typeId === "minecraft:water_bucket") {
			addOrReplaceItem(player, "minecraft:bucket", 1);
			dimension.playSound("bucket.empty_water", block.center());
			block.setPermutation(BlockPermutation.resolve(`medieval:${typePot}`));
		}
	}
}