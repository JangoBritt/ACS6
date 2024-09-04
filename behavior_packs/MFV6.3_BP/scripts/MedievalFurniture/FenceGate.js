import { toggleBlockState } from '../util/utils';

const rightOffset = {2: { x: 1, y: 0, z: 0 },3: { x: -1, y: 0, z: 0 },4: { x: 0, y: 0, z: -1 },5: { x: 0, y: 0, z: 1 }};
const leftOffset = {2: { x: -1, y: 0, z: 0 },3: { x: 1, y: 0, z: 0 },4: { x: 0, y: 0, z: 1 },5: { x: 0, y: 0, z: -1 }};

export class MfFenceGateConnection {
	onPlace(e) {
		const { block } = e;
		UpdateFenceGate(block);
		const direction = block.permutation.getState("medieval:facing_direction");
		const rightBlock = block.offset(rightOffset[direction]);
		const leftBlock = block.offset(leftOffset[direction]);
		if (rightBlock.typeId === block.typeId) UpdateFenceGate(rightBlock);
		if (leftBlock.typeId === block.typeId) UpdateFenceGate(leftBlock);
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("medieval:facing_direction");
		const rightBlock = block.offset(rightOffset[direction]);
		const leftBlock = block.offset(leftOffset[direction]);
		if (rightBlock.typeId === destroyedBlockPermutation.type.id) UpdateFenceGate(rightBlock);
		if (leftBlock.typeId === destroyedBlockPermutation.type.id) UpdateFenceGate(leftBlock);
	}
}
export class MfFenceGate {
	onPlayerInteract(e) {
		toggleBlockState(e, "medieval:close", "close.fence_gate", "open.fence_gate");
	}
}
function UpdateFenceGate(block) {
	const direction = block.permutation.getState("medieval:facing_direction");
	const rightBlock = block.offset(rightOffset[direction]);
	const leftBlock = block.offset(leftOffset[direction]);
	const isRightSame = rightBlock.typeId === block.typeId && rightBlock.permutation.getState("medieval:facing_direction") === direction;
	const isLeftSame = leftBlock.typeId === block.typeId && leftBlock.permutation.getState("medieval:facing_direction") === direction;
	let newState = 0;
	if (isRightSame) newState = 1;
	if (isLeftSame && leftBlock.permutation.getState("medieval:state") <= 1 && block.permutation.getState("medieval:state") === 0) newState = 2;
	block.setPermutation(block.permutation.withState("medieval:state", newState));
}