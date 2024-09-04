export class MfSupportConnection {
	onPlace(e) {
		const { block } = e;
		UpdateSupport(block);
		const direction = block.permutation.getState("medieval:facing_direction");
		const rightOffset = direction === 2 ? { x: 1, y: 0, z: 0 } : direction === 3 ? { x: -1, y: 0, z: 0 } : direction === 4 ? { x: 0, y: 0, z: -1 } : { x: 0, y: 0, z: 1 };
		const leftOffset = direction === 2 ? { x: -1, y: 0, z: 0 } : direction === 3 ? { x: 1, y: 0, z: 0 } : direction === 4 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 };
		const rightBlock = block.offset(rightOffset);
		const leftBlock = block.offset(leftOffset);
		const rightMatch = rightBlock.typeId === block.typeId && rightBlock.permutation.getState("medieval:facing_direction") === direction;
		const leftMatch = leftBlock.typeId === block.typeId && leftBlock.permutation.getState("medieval:facing_direction") === direction;
		if (rightMatch) UpdateSupport(rightBlock);
		if (leftMatch) UpdateSupport(leftBlock);
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("medieval:facing_direction");
		const rightOffset = direction === 2 ? { x: 1, y: 0, z: 0 } : direction === 3 ? { x: -1, y: 0, z: 0 } : direction === 4 ? { x: 0, y: 0, z: -1 } : { x: 0, y: 0, z: 1 };
		const leftOffset = direction === 2 ? { x: -1, y: 0, z: 0 } : direction === 3 ? { x: 1, y: 0, z: 0 } : direction === 4 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 };
		const rightBlock = block.offset(rightOffset);
		const leftBlock = block.offset(leftOffset);
		const rightMatch = rightBlock.typeId === destroyedBlockPermutation.type.id && rightBlock.permutation.getState("medieval:facing_direction") === direction;
		const leftMatch = leftBlock.typeId === destroyedBlockPermutation.type.id && leftBlock.permutation.getState("medieval:facing_direction") === direction;
		if (rightMatch) UpdateSupport(rightBlock);
		if (leftMatch) UpdateSupport(leftBlock);
	}
}
function UpdateSupport(block) {
	const direction = block.permutation.getState("medieval:facing_direction");
	const rightOffset = direction === 2 ? { x: 1, y: 0, z: 0 } : direction === 3 ? { x: -1, y: 0, z: 0 } : direction === 4 ? { x: 0, y: 0, z: -1 } : { x: 0, y: 0, z: 1 };
	const leftOffset = direction === 2 ? { x: -1, y: 0, z: 0 } : direction === 3 ? { x: 1, y: 0, z: 0 } : direction === 4 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 };
	const rightBlock = block.offset(rightOffset);
	const leftBlock = block.offset(leftOffset);
	const rightMatch = rightBlock.typeId === block.typeId && rightBlock.permutation.getState("medieval:facing_direction") === direction;
	const leftMatch = leftBlock.typeId === block.typeId && leftBlock.permutation.getState("medieval:facing_direction") === direction;
	const sideState = (rightMatch && leftMatch) ? 1 : 0;
	block.setPermutation(block.permutation.withState("medieval:side", sideState));
}