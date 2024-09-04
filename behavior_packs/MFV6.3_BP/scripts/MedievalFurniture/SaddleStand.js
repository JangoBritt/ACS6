import { ItemStack, BlockPermutation } from '@minecraft/server';
import { addItemOrSpawn, decrementItemInHand, isCreative } from '../util/utils';
import { airBlocks } from '../util/globalVariables';

export class MfTripleSaddleStandTop {
	onPlayerInteract(e) {
		AddSaddle(e, e.block.below(), 3, "medieval:state");
	}
	onPlayerDestroy(e) {
		const { block, dimension } = e;
		dimension.runCommandAsync(`setblock ${block.x} ${block.y - 1} ${block.z} air destroy`);
	}
}
export class MfTripleSaddleStand {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const blockAbove = block.above();
		if (airBlocks.includes(blockAbove.typeId)) {
			const direction = permutationToPlace.getState("minecraft:cardinal_direction");
			const blockType = permutationToPlace.type.id.includes("cherry") ? "medieval:cherry_saddle_stand_top_0" : "medieval:saddle_stand_top_0";
			blockAbove.setPermutation(BlockPermutation.resolve(blockType, { "minecraft:cardinal_direction": direction }));
		}
	}	
	onPlayerInteract(e) {
		const { block } = e;
		AddSaddle(e, block, 3, "medieval:state");
	}
	onPlace(e) {
		const { block, dimension } = e;
		if (airBlocks.includes(block.above().typeId)) dimension.runCommandAsync(`setblock ${block.x} ${block.y} ${block.z} air destroy`);
	}
}
export class MfSaddleStand {
	onPlayerInteract(e) {
		const { block } = e;
		AddSaddle(e, block, 1, "medieval:status");
	}
}
function AddSaddle(e, block, maxValue, state) {
	const { player, dimension } = e;
	const saddle = block.permutation.getState(state);
	const inventory = player.getComponent("inventory").container;
	const item = inventory.getItem(player.selectedSlotIndex);
	if (saddle < maxValue && item?.typeId === "minecraft:saddle") {
		dimension.playSound("block.itemframe.add_item", block.center());
		block.setPermutation(block.permutation.withState(state, saddle + 1));
		if (!isCreative(player)) decrementItemInHand(player);
	} else if (saddle > 0) {
		dimension.playSound("block.itemframe.remove_item", block.center());
		block.setPermutation(block.permutation.withState(state, saddle - 1));
		if (!isCreative(player)) {
			if (!item) inventory.setItem(player.selectedSlotIndex, new ItemStack("minecraft:saddle", 1)); 
			else addItemOrSpawn(player, new ItemStack("minecraft:saddle", 1));
		}
	}
}