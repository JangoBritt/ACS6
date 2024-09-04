import { BlockPermutation } from '@minecraft/server';
import { decrementItemInHand, isCreative } from '../util/utils';
import { colors } from '../util/globalVariables';
import { sitOnOldChair2 } from './Util';

export class MfSitOffset2 {
	onPlayerInteract(e) {
		const { player } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		if (item?.typeId.includes("minecraft:") && item?.typeId.includes("_dye")) {
			paintChair(e, item);
		} else {
			sitOnOldChair2(e, 0.4);
		}
	}
}
function paintChair(e, item) {
	const player = e.player;
	const block = e.block;
	const blockPermut = block.permutation;

	const dyeColor = item.typeId.split(':')[1].split('_dye')[0];
	const blockColor = colors.find(color => block.typeId.includes(color));
	
	if (dyeColor !== blockColor) {
		const direction = blockPermut.getState("medieval:facing_direction");
		const prefix = block.typeId.match(new RegExp(`^.*?(${colors.join('|')})`))[0].replace(/_(black|blue|brown|cyan|gray|green|light_blue|light_gray|lime|magenta|orange|pink|purple|red|white|yellow).*$/, "_");
		block.setPermutation(BlockPermutation.resolve(`${prefix}${dyeColor}_chair`, {"medieval:facing_direction": direction}));
		e.dimension.playSound("block.itemframe.add_item", block.center());
		if (!isCreative(player)) decrementItemInHand(player);
	}
};