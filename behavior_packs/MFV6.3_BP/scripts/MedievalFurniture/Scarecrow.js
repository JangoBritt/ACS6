import { ItemStack, BlockPermutation } from '@minecraft/server';
import { airBlocks } from '../util/globalVariables';

export class MfScarecrowDestroy {
	onPlayerDestroy(e) {
		const { block, dimension } = e;
		dimension.spawnItem(new ItemStack("medieval:scarecrow_item", 1), block.center());
		block.offset({x:0,y:-1,z:0}).setPermutation(BlockPermutation.resolve("minecraft:air"));
	}
}
export class MfScarecrow {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const topBlock = block.above();
		if (airBlocks.includes(topBlock.typeId)) {
			topBlock.setPermutation(BlockPermutation.resolve("medieval:scarecrow_top", {"minecraft:cardinal_direction": direction}));
		} else {
			e.cancel = true;
		}
	}
	onPlace(e) {
		const { block, dimension } = e;
		if (block.above().typeId !== "medieval:scarecrow_top") {
			dimension.spawnItem(new ItemStack("medieval:scarecrow_item", 1), block.center());
			block.setPermutation(BlockPermutation.resolve("minecraft:air"));
		}
	}
}