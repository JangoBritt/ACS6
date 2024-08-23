import { rightBlockLocation, leftBlockLocation, directions } from '../util/globalVariables';

export class MrSameBlockUpdate {
	onPlace(e) {
		const { block } = e;
		updateMatchingBlock(block);
		for (const direction in directions) {
			const offset = directions[direction];
			const adjacentBlock = block.offset(offset);
			if(adjacentBlock.typeId === block.typeId) updateMatchingBlock(adjacentBlock);
		}
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		for (const direction in directions) {
			const offset = directions[direction];
			const adjacentBlock = block.offset(offset);
			if(adjacentBlock.typeId === destroyedBlockPermutation.type.id) updateMatchingBlock(adjacentBlock);
		}
	}
}
export class MrUpdateSideBlocks {
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		const leftBlock = block.offset(leftBlockLocation[direction]);
		if (rightBlock.getTags()[0] === block.getTags()[0]) {
			block.setPermutation(block.permutation.withState("mr:right", true));
			rightBlock.setPermutation(rightBlock.permutation.withState("mr:left", true));
		}
		if (leftBlock.getTags()[0] === block.getTags()[0]) {
			block.setPermutation(block.permutation.withState("mr:left", true));
			leftBlock.setPermutation(leftBlock.permutation.withState("mr:right", true));
		}
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		const leftBlock = block.offset(leftBlockLocation[direction]);
		if (rightBlock.getTags()[0] === destroyedBlockPermutation.getTags()[0]) {
			rightBlock.setPermutation(rightBlock.permutation.withState("mr:left", false));
		}
		if (leftBlock.getTags()[0] === destroyedBlockPermutation.getTags()[0]) {
			leftBlock.setPermutation(leftBlock.permutation.withState("mr:right", false));
		}
	}
}
function updateMatchingBlock(block) {
	for (const direction in directions) {
		const offset = directions[direction];
		const adjacentBlock = block.offset(offset);
		const shouldConnect = adjacentBlock.typeId === block.typeId;

		block.setPermutation(block.permutation.withState(`mr:${direction[0]}`, shouldConnect ? 1 : 0));
	}
}