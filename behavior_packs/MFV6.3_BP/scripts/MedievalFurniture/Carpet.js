import { directions } from '../util/globalVariables';

export class MfCarpetConnection {
	onPlace(e) {
		const { block } = e;
		UpdateCarpet(block);
		for (let dir in directions) {
			const direction = directions[dir];
			const adjacentBlock = block.offset(direction);
			if (adjacentBlock.hasTag("carpet_diamond")) UpdateCarpet(adjacentBlock);
		}
	}
	onPlayerDestroy(e) {
		const { block } = e;
		for (let dir in directions) {
			const direction = directions[dir];
			const adjacentBlock = block.offset(direction);
			if (adjacentBlock.hasTag("carpet_diamond")) UpdateCarpet(adjacentBlock);
		}
	}
}
function UpdateCarpet(block) {
	for (let dir in directions) {
		const direction = directions[dir];
		const adjacentBlock = block.offset(direction);
		if (adjacentBlock.hasTag("carpet_diamond")) block.setPermutation(block.permutation.withState(`medieval:${dir.charAt(0)}`, 1));
		else block.setPermutation(block.permutation.withState(`medieval:${dir.charAt(0)}`, 0));
	}
}