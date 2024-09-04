import { ItemStack, BlockPermutation } from '@minecraft/server';
import { toggleBlockState, simpleToggleBlockState } from '../util/utils';
import { rightBlockLocation, airBlocks } from '../util/globalVariables';

export class MfTallWindowTop {
	onPlayerInteract(e) {
		const { block } = e;
		toggleBlockState(e, "medieval:open", "open.wooden_door", "close.wooden_door");
		simpleToggleBlockState(block.below(), "medieval:open");
	}
	onPlayerDestroy(e) {
		const { block, dimension } = e;
		dimension.spawnItem(new ItemStack(`${block.below().typeId}_item`, 1), block.center());
		block.below().setPermutation(BlockPermutation.resolve("minecraft:air"));
	}
}
export class MfTallWindow {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const aboveBlock = block.above();
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		if (airBlocks.includes(aboveBlock.typeId)) {
			const leftBlock = block.offset(rightBlockLocation[direction]);
			if (leftBlock.hasTag("mf.tall_window") && leftBlock.permutation.getState("medieval:side")) {
				aboveBlock.setPermutation(BlockPermutation.resolve(`${permutationToPlace.type.id}_top`, {"minecraft:cardinal_direction": direction, "medieval:side": false}));
				e.permutationToPlace = permutationToPlace.withState("medieval:side", false);
			} else {
				aboveBlock.setPermutation(BlockPermutation.resolve(`${permutationToPlace.type.id}_top`, {"minecraft:cardinal_direction": direction}));
			}
		} else e.cancel = true;
	}
	onPlayerInteract(e) {
		const { block } = e;
		toggleBlockState(e, "medieval:open", "open.wooden_door", "close.wooden_door");
		simpleToggleBlockState(block.above(), "medieval:open");
	}
	onPlace(e) {
		const { block, dimension } = e;
		if (block.above().typeId !== `${block.typeId}_top`) {
			dimension.spawnItem(new ItemStack(`${block.typeId}_item`, 1), block.center());
			block.setPermutation(BlockPermutation.resolve("minecraft:air"));
		}
	}
}