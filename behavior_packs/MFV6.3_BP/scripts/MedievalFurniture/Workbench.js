import { ItemStack, BlockPermutation } from '@minecraft/server';
import { rightBlockLocation, leftBlockLocation, airBlocks } from '../util/globalVariables';

export class MfBreakWorkbench {
	onPlayerDestroy(e) {
		const { block, dimension, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const leftBlock = block.offset(rightBlockLocation[direction]);
		leftBlock.setPermutation(BlockPermutation.resolve("minecraft:air"));
		dimension.spawnItem(new ItemStack("medieval:workbench_left", 1), block.center());
	}
}
export class MfPlaceWorkbench {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(leftBlockLocation[direction]);
		if (airBlocks.includes(rightBlock.typeId)) {
			rightBlock.setPermutation(BlockPermutation.resolve("medieval:workbench_right", {"minecraft:cardinal_direction": direction}));
		} else {
			e.cancel = true;
		}
	}
}