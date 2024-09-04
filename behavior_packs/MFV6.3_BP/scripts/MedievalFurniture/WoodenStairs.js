import { BlockPermutation } from '@minecraft/server';

export class MfWoodenStairs {
	onStepOn(e) {
		const { block } = e;
		const blockAbove = block.above();
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		if (blockAbove.typeId === "minecraft:air") {
			blockAbove.setPermutation(BlockPermutation.resolve("medieval:stairs_top", {"minecraft:cardinal_direction": direction}))
		}
	}
	onPlace(e) {
		UpdateWoodenStairs(e.block);
		const direction = e.block.permutation.getState("minecraft:cardinal_direction");
		UpdateAdjacentStairs(e.block, direction);
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		UpdateAdjacentStairs(block, direction);
	}
}
function UpdateWoodenStairs(block) {
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	const offsets = {
		north: { right: { x: 1, y: 0, z: 0 }, left: { x: -1, y: 0, z: 0 }, front: { x: 0, y: -1, z: -1 } },
		south: { right: { x: -1, y: 0, z: 0 }, left: { x: 1, y: 0, z: 0 }, front: { x: 0, y: -1, z: 1 } },
		west: { right: { x: 0, y: 0, z: -1 }, left: { x: 0, y: 0, z: 1 }, front: { x: -1, y: -1, z: 0 } },
		east: { right: { x: 0, y: 0, z: 1 }, left: { x: 0, y: 0, z: -1 }, front: { x: 1, y: -1, z: 0 } }
	}[direction];
	const rightBlock = block.offset(offsets.right);
	const leftBlock = block.offset(offsets.left);
	const frontBlock = block.offset(offsets.front);
	const isMatchingWoodenStairs = (block) => block.hasTag("wooden_stairs") && block.permutation.getState("minecraft:cardinal_direction") === direction;
	const side = (isMatchingWoodenStairs(rightBlock) << 1) | isMatchingWoodenStairs(leftBlock);
	const bot = isMatchingWoodenStairs(frontBlock) ? 1 : 0;
	block.setPermutation(block.permutation.withState("medieval:side", side).withState("medieval:bot", bot));
}
function UpdateAdjacentStairs(block, direction) {
	const offsets = {
		north: { right: { x: 1, y: 0, z: 0 }, left: { x: -1, y: 0, z: 0 }, backUp: { x: 0, y: 1, z: 1 } },
		south: { right: { x: -1, y: 0, z: 0 }, left: { x: 1, y: 0, z: 0 }, backUp: { x: 0, y: 1, z: -1 } },
		west: { right: { x: 0, y: 0, z: -1 }, left: { x: 0, y: 0, z: 1 }, backUp: { x: 1, y: 1, z: 0 } },
		east: { right: { x: 0, y: 0, z: 1 }, left: { x: 0, y: 0, z: -1 }, backUp: { x: -1, y: 1, z: 0 } }
	}[direction];

	const rightBlock = block.offset(offsets.right);
	const leftBlock = block.offset(offsets.left);
	const backUpBlock = block.offset(offsets.backUp);

	[rightBlock, leftBlock, backUpBlock].forEach(adjacentBlock => {
		if (adjacentBlock.hasTag("wooden_stairs")) {
			UpdateWoodenStairs(adjacentBlock);
		}
	});
}