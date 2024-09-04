import { BlockPermutation } from '@minecraft/server';
import { breakBlock, sitOnChairXZ } from '../util/utils';
import { airBlocks } from '../util/globalVariables';

export class MfIronThroneDestroy {
	onPlayerDestroy(e) {
		breakBlock(e.block.below());
	}
}
export class MfIronThrone {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const blockAbove = block.above();
		if (airBlocks.includes(blockAbove.typeId)) {
			blockAbove.setPermutation(BlockPermutation.resolve("medieval:iron_throne_top", {"minecraft:cardinal_direction": direction}));
		} else e.cancel = true;
	}
	onPlace(e) {
		if (e.block.above().typeId !== "medieval:iron_throne_top") breakBlock(e.block);
	}
	onPlayerInteract(e) {
		sitOnChairXZ(e, 0.5, 0.1);
	}
}