import { rightBlockLocation, leftBlockLocation } from '../util/globalVariables';
export class MrFenceGate {
	onPlayerInteract(e) {
		const { block, dimension } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const open = block.permutation.getState("mr:open");
		const right = block.permutation.getState("mr:right");
		const side = block.permutation.getState("mr:side");
		if (!open) {
			dimension.playSound("open.fence_gate", block.center());
		} else {
			dimension.playSound("close.fence_gate", block.center());
		}
		const updateBlockState = (startBlock) => {
			if (startBlock.getTags().includes("mr.gate")) {
				startBlock.setPermutation(startBlock.permutation.withState("mr:open", !open));
			}
		};
		const checkBlocksVertical = (startBlock, direction, maxHeight) => {
			let currentBlock = startBlock;
			for (let i = 0; i < maxHeight; i++) {
				const blockNext = currentBlock.offset({ x: 0, y: direction, z: 0 });
				if (blockNext.getTags().includes("mr.gate")) {
					const sameRight = blockNext.permutation.getState("mr:right") === currentBlock.permutation.getState("mr:right");
					const sameSide = blockNext.permutation.getState("mr:side") === currentBlock.permutation.getState("mr:side");
					if (sameRight && sameSide) {
						updateBlockState(blockNext);
						currentBlock = blockNext;
					} else {break;}
				} else {break;}
			}
		};
		updateBlockState(block);
		if (!side) {
			checkBlocksVertical(block, 1, 10);
			checkBlocksVertical(block, -1, 10);
		}
		if (side && !right) {
			const rightBlock = block.offset(rightBlockLocation[direction]);
			updateBlockState(rightBlock);
			checkBlocksVertical(block, 1, 10);
			checkBlocksVertical(block, -1, 10);
			checkBlocksVertical(rightBlock, 1, 10);
			checkBlocksVertical(rightBlock, -1, 10);
		}
		if (side && right) {
			const leftBlock = block.offset(leftBlockLocation[direction]);
			updateBlockState(leftBlock);
			checkBlocksVertical(block, 1, 10);
			checkBlocksVertical(block, -1, 10);
			checkBlocksVertical(leftBlock, 1, 10);
			checkBlocksVertical(leftBlock, -1, 10);
		}
	}
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const leftBlock = block.offset(leftBlockLocation[direction]);
		const leftBlockDirection = leftBlock.permutation.getState("minecraft:cardinal_direction");
		const leftIsSided = leftBlock.permutation.getState("mr:side");
		if (leftBlock.getTags().includes("mr.gate") && leftBlockDirection === direction && !leftIsSided) {
			block.setPermutation(block.permutation.withState("mr:right", true));
			block.setPermutation(block.permutation.withState("mr:side", true));
			leftBlock.setPermutation(leftBlock.permutation.withState("mr:side", true));
		}
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation  } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const isRight = destroyedBlockPermutation.getState("mr:right");
		if (!isRight) {
			const rightBlock = block.offset(rightBlockLocation[direction]);
			const rightBlockDirection = rightBlock.permutation.getState("minecraft:cardinal_direction");
			const rightIsSided = rightBlock.permutation.getState("mr:side");
			if (rightBlock.getTags().includes("mr.gate") && rightBlockDirection === direction && rightIsSided) {
				rightBlock.setPermutation(rightBlock.permutation.withState("mr:side", false));
			}
		} else {
			const leftBlock = block.offset(leftBlockLocation[direction]);
			const leftBlockDirection = leftBlock.permutation.getState("minecraft:cardinal_direction");
			const leftIsSided = leftBlock.permutation.getState("mr:side");
			if (leftBlock.getTags().includes("mr.gate") && leftBlockDirection === direction && leftIsSided) {
				leftBlock.setPermutation(leftBlock.permutation.withState("mr:side", false));
			}
		}
	}
}