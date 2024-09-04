import { sitOnChairXZ } from '../util/utils';
import { rightBlockLocation, leftBlockLocation } from '../util/globalVariables';

export class MfSofa {
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		const leftBlock = block.offset(leftBlockLocation[direction]);
		UpdateSofa(block);
		if ( rightBlock.hasTag("m.sofa") ) UpdateSofa(rightBlock);
		if ( leftBlock.hasTag("m.sofa") ) UpdateSofa(leftBlock);
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		const leftBlock = block.offset(leftBlockLocation[direction]);
		if ( rightBlock.hasTag("m.sofa") ) UpdateSofa(rightBlock);
		if ( leftBlock.hasTag("m.sofa") ) UpdateSofa(leftBlock);
	}
	onPlayerInteract(e) {
		sitOnChairXZ(e, 0.4, 0.25);
	}
}
function UpdateSofa(block) {
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	const rightBlock = block.offset(rightBlockLocation[direction]);
	const leftBlock = block.offset(leftBlockLocation[direction]);
	let state = 1;
	const rightMatch = rightBlock.typeId === block.typeId;
	const leftMatch = leftBlock.typeId === block.typeId;
	if (leftMatch && rightMatch) state = 4;
	else if (leftMatch) state = 2;
	else if (rightMatch) state = 3;
	block.setPermutation(block.permutation.withState("medieval:sofa", state));
}