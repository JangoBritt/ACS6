import { BlockPermutation } from '@minecraft/server';
import { breakBlock } from '../util/utils';
import { rightBlockLocation, leftBlockLocation, airBlocks } from '../util/globalVariables';

export class MfWeaponStandSide {
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		breakBlock(block.offset(rightBlockLocation[direction]));
	}
}
export class MfWeaponStand {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace, dimension } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(leftBlockLocation[direction]);
		if (airBlocks.includes(rightBlock.typeId)) {
			rightBlock.setPermutation(BlockPermutation.resolve(`${permutationToPlace.type.id}_side`, {"minecraft:cardinal_direction": direction}));
			const placementData = {
				north: { location: { x: block.x, y: block.y, z: block.z + 0.5 }, rotation: { x: 0, y: 180 } },
				south: { location: { x: block.x + 1, y: block.y, z: block.z + 0.5 }, rotation: { x: 0, y: 0 } },
				west: { location: { x: block.x + 0.5, y: block.y, z: block.z + 1 }, rotation: { x: 0, y: 90 } },
				east: { location: { x: block.x + 0.5, y: block.y, z: block.z }, rotation: { x: 0, y: -90 } }
			};
			const { location, rotation } = placementData[direction];
			const weaponStandEntity = dimension.spawnEntity("medieval:weapon_stand_ev2", location);
			weaponStandEntity.setRotation(rotation);
		} else e.cancel = true;
	}
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		if (`${block.typeId}_side` !== block.offset(leftBlockLocation[direction]).typeId) breakBlock(block);
	}
}