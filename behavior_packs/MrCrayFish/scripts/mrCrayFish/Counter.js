import { frontBlockLocation, directions } from '../util/globalVariables';

export class MrCounter {
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const frontBlock = block.offset(frontBlockLocation[direction]);
		if (frontBlock.getTags().includes("mr.counter")) {
			block.setPermutation(block.permutation.withState("mr:f", true));
		}
		for (const dir in directions) {
			const offset = directions[dir];
			const adjacentBlock = block.offset(offset);
			if (adjacentBlock.getTags().includes("mr.counter")) {
				const adjacentBlockDirection = adjacentBlock.permutation.getState("minecraft:cardinal_direction");
				const frontAdjacentBlock = adjacentBlock.offset(frontBlockLocation[adjacentBlockDirection]);
		
				if (frontAdjacentBlock.getTags().includes("mr.counter")) {
					adjacentBlock.setPermutation(adjacentBlock.permutation.withState("mr:f", true));
				}
			}
		}
	}
	onPlayerDestroy(e) {
		const { block } = e;
		const frontBlockLocation = {
			"north": { x: 0, y: 0, z: 1 },
			"south": { x: 0, y: 0, z: -1 },
			"west": { x: 1, y: 0, z: 0 },
			"east": { x: -1, y: 0, z: 0 }
		};
		for (const dir in directions) {
			const offset = directions[dir];
			const adjacentBlock = block.offset(offset);
			if (adjacentBlock.getTags().includes("mr.counter")) {
				const adjacentBlockDirection = adjacentBlock.permutation.getState("minecraft:cardinal_direction");
				const frontAdjacentBlock = adjacentBlock.offset(frontBlockLocation[adjacentBlockDirection]);
				if (!frontAdjacentBlock.getTags().includes("mr.counter")) {
					adjacentBlock.setPermutation(adjacentBlock.permutation.withState("mr:f", false));
				}
			}
		}
	}
}