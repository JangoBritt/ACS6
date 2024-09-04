import { ItemStack, BlockPermutation } from '@minecraft/server';
import { airBlocks } from '../util/globalVariables';

export class MfRemoveBlockTop {
	onPlayerDestroy(e) {
		const { block, dimension } = e;
		const botBlock = block.offset({x: 0, y: -1, z: 0});
		dimension.spawnItem(new ItemStack(botBlock.typeId, 1), botBlock.center());
		botBlock.setPermutation(BlockPermutation.resolve("minecraft:air"));
	}
}
export class MfTopEasel {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const topBlock = block.offset({x: 0, y: 1, z: 0});
		if (airBlocks.includes(topBlock.typeId)) {
			if (permutationToPlace.type.id.includes("crimson") || permutationToPlace.type.id.includes("warped")) {
				topBlock.setPermutation(BlockPermutation.resolve("medieval:stem_easel_top"));
			} else if (permutationToPlace.type.id.includes("cherry")) {
				topBlock.setPermutation(BlockPermutation.resolve("medieval:cherry_easel_top"));
			} else {
				topBlock.setPermutation(BlockPermutation.resolve("medieval:wood_easel_top"));
			}
		} else {
			e.cancel = true;
		}
	}
}