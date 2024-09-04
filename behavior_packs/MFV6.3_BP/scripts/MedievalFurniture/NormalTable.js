import { directions } from '../util/globalVariables';

export class MfNormalTable {
	onPlace(e) {
		const { block } = e;
		UpdateNormalTable(block);
		for (const direction of Object.values(directions)) {
			const adjacentBlock = block.offset(direction);
			if (adjacentBlock.typeId === block.typeId) UpdateNormalTable(adjacentBlock);
		}
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		for (const direction of Object.values(directions)) {
			const adjacentBlock = block.offset(direction);
			if (adjacentBlock.typeId === destroyedBlockPermutation.type.id) UpdateNormalTable(adjacentBlock);
		}
	}
}
function UpdateNormalTable(block) {
	const northBlock = block.offset(directions["north"]);
	const southBlock = block.offset(directions["south"]);
	const westBlock = block.offset(directions["west"]);
	const eastBlock = block.offset(directions["east"]);
	if ((northBlock.typeId === block.typeId && southBlock.typeId === block.typeId) || (westBlock.typeId === block.typeId && eastBlock.typeId === block.typeId)){
		block.setPermutation(block.permutation.withState("medieval:table", false));
	} else {
		block.setPermutation(block.permutation.withState("medieval:table", true));
	}
}