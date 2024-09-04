import { BlockPermutation } from '@minecraft/server';
import { itemApplyDamage, breakBlock } from '../util/utils';
import { rightBlockLocation, leftBlockLocation, airBlocks } from '../util/globalVariables';

export class MfStoveDestroy {
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const leftBlock = block.offset(rightBlockLocation[direction]);
		breakBlock(leftBlock);
	}
}
export class MfStoveTimer {
	onTick(e) {
		const { block, dimension } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const log = block.permutation.getState("medieval:log");
		if (log > 0) {
			block.setPermutation(block.permutation.withState("medieval:log", log - 1));
		} else {
			block.setPermutation(block.permutation.withState("medieval:stove_on", false));
			const rightBlock = block.offset(leftBlockLocation[direction]);
			if (rightBlock.typeId === "medieval:stove_right") rightBlock.setPermutation(rightBlock.permutation.withState("medieval:stove_on", false));
			const stoveEntity = dimension.getEntitiesAtBlockLocation(block.location).find(entity => entity.typeId === "medieval:stove_entity");
			stoveEntity?.triggerEvent("medieval:stove_off");
		}
	}
}
export class MfStove {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace, dimension } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(leftBlockLocation[direction]);
		if (airBlocks.includes(rightBlock.typeId)) {
			rightBlock.setPermutation(BlockPermutation.resolve("medieval:stove_right", {"minecraft:cardinal_direction": direction}));
			const location = {
				north: { x: block.x, y: block.y, z: block.z + 0.5 },
				south: { x: block.x + 1, y: block.y, z: block.z + 0.5 },
				west: { x: block.x + 0.5, y: block.y, z: block.z + 1 },
				east: { x: block.x + 0.5, y: block.y, z: block.z }
			};
			const stoveEntity = dimension.spawnEntity("medieval:stove_entity", location[direction]);
			stoveEntity.nameTag = "Stove";
		} else e.cancel = true;
	}
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const stoveOn = block.permutation.getState("medieval:stove_on");
		if (!stoveOn && item?.typeId === "minecraft:flint_and_steel") {
			dimension.playSound("fire.ignite", block.center());
			block.setPermutation(block.permutation.withState("medieval:stove_on", true));
			block.setPermutation(block.permutation.withState("medieval:log", 15));
			itemApplyDamage(player, item);
			const rightBlock = block.offset(leftBlockLocation[direction]);
			if (rightBlock.typeId === "medieval:stove_right") rightBlock.setPermutation(rightBlock.permutation.withState("medieval:stove_on", true));
			const stoveEntity = dimension.getEntitiesAtBlockLocation(block.location).find(entity => entity.typeId === "medieval:stove_entity");
			stoveEntity?.triggerEvent("medieval:stove_on");
		}
	}
}