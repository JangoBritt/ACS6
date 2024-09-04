const offsets = [{ x: 1, y: 0, z: 0 },{ x: -1, y: 0, z: 0 },{ x: 0, y: 0, z: -1 },{ x: 0, y: 0, z: 1 }];

export class MfBridge {
	onPlace(e) {
		const { block } = e;
		UpdateBridge(block);
		offsets.forEach(offset => {
			const adjacentBlock = block.offset(offset);
			if (adjacentBlock.typeId === block.typeId) UpdateBridge(adjacentBlock);
		});
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		offsets.forEach(offset => {
			const adjacentBlock = block.offset(offset);
			if (adjacentBlock.typeId === destroyedBlockPermutation.type.id) UpdateBridge(adjacentBlock);
		});
	}
}
function UpdateBridge(block) {
	const direction = block.permutation.getState("medieval:facing_direction");
	const offsets = direction === 1
	? { right: { x: 1, y: 0, z: 0 }, left: { x: -1, y: 0, z: 0 }, front: { x: 0, y: 0, z: -1 }, back: { x: 0, y: 0, z: 1 } }
	: { right: { x: 0, y: 0, z: -1 }, left: { x: 0, y: 0, z: 1 }, front: { x: -1, y: 0, z: 0 }, back: { x: 1, y: 0, z: 0 } };
	const hasBlock = (offset) => block.offset(offset).typeId === block.typeId;
	const width = hasBlock(offsets.right) + 2 * hasBlock(offsets.left);
	const length = hasBlock(offsets.front) + 2 * hasBlock(offsets.back);
	block.setPermutation(block.permutation.withState("medieval:width", width).withState("medieval:length", length));
}