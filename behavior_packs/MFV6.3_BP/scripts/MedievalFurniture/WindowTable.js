import { directions } from '../util/globalVariables';

export class MfWindowTable {
	onPlace(e) {
		const { block } = e;
		UpdateWindowTable(block);
		for (let dir in directions) {
			const direction = directions[dir];
			const adjacentBlock = block.offset(direction);
			if (adjacentBlock.typeId === block.typeId) UpdateWindowTable(adjacentBlock);
		}
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		for (let dir in directions) {
			const direction = directions[dir];
			const adjacentBlock = block.offset(direction);
			if (adjacentBlock.typeId === destroyedBlockPermutation.type.id) UpdateWindowTable(adjacentBlock);
		}
	}
}
function UpdateWindowTable(block) {
	for (let dir in directions) {
		const direction = directions[dir];
		const adjacentBlock = block.offset(direction);
		if (adjacentBlock.typeId === block.typeId) block.setPermutation(block.permutation.withState(`medieval:${dir.charAt(0)}`, 1));
		else block.setPermutation(block.permutation.withState(`medieval:${dir.charAt(0)}`, 0));
	}
}