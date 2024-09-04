import { rightBlockLocation, leftBlockLocation } from '../util/globalVariables';

export class MfUpdateSidedBlocks {
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const { rightBlock, leftBlock } = getAdjacentBlocks(block, direction);
		
		if (checkBlockDirection(block, rightBlock, direction)) updateBlockSided(rightBlock);
		if (checkBlockDirection(block, leftBlock, direction)) updateBlockSided(leftBlock);
		
		updateBlockSided(block);
	}
	onPlayerDestroy(e) {
		const { destroyedBlockPermutation, block } = e;
		const typeId = destroyedBlockPermutation.type.id;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const { rightBlock, leftBlock } = getAdjacentBlocks(block, direction);
		
		const checkDestroyedBlockDirection = (sideBlock) =>
			sideBlock.typeId === typeId &&
			sideBlock.permutation.getState("minecraft:cardinal_direction") === direction;
		if (checkDestroyedBlockDirection(rightBlock)) updateBlockSided(rightBlock);
		if (checkDestroyedBlockDirection(leftBlock)) updateBlockSided(leftBlock);
	}
}
function checkBlockDirection(block, sideBlock, direction) {
	return sideBlock.typeId === block.typeId &&
		sideBlock.permutation.getState("minecraft:cardinal_direction") === direction;
}
function getAdjacentBlocks(block, direction) {
	const rightBlock = block.offset(rightBlockLocation[direction]);
	const leftBlock = block.offset(leftBlockLocation[direction]);
	return { rightBlock, leftBlock };
}
function updateBlockSided(block) {
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	const { rightBlock, leftBlock } = getAdjacentBlocks(block, direction);
	
	const rightMatches = checkBlockDirection(block, rightBlock, direction);
	const leftMatches = checkBlockDirection(block, leftBlock, direction);

	const state = rightMatches && leftMatches ? 3 :
				rightMatches ? 1 :
				leftMatches ? 2 : 0;

	block.setPermutation(block.permutation.withState("medieval:state", state));
}