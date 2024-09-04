import { BlockPermutation } from '@minecraft/server';
import { airBlocks } from '../util/globalVariables';

export class MfTopBlockDestroy {
	onPlayerDestroy(e) {
		const { block } = e;
		block.below().setPermutation(BlockPermutation.resolve("minecraft:air"));
	}
}
export class MfPendulumClock {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace, dimension } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const topBlock = block.above();
		if (airBlocks.includes(topBlock.typeId)) {
			topBlock.setPermutation(BlockPermutation.resolve(`${permutationToPlace.type.id}_top`, {"minecraft:cardinal_direction": direction}));
			const clockEntity = dimension.spawnEntity("medieval:pendulum_clock", topBlock.center());
			const rotations = {"north": { x: 0, y: 180 },"south": { x: 0, y: 0 },"west": { x: 0, y: 90 },"east": { x: 0, y: -90 }};
			clockEntity.setRotation(rotations[direction]);
		} else e.cancel = true;
	}
	onPlace(e) {
		const { block } = e;
		if (airBlocks.includes(block.above().typeId)) block.setPermutation(BlockPermutation.resolve("minecraft:air"));
	}
}