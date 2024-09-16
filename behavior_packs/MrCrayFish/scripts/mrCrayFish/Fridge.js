import { ItemStack, BlockPermutation } from "@minecraft/server";
import { toggleBlockState } from '../util/utils';
import { airBlocks } from '../util/globalVariables';

export class MrFridgeBreak {
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation, dimension } = e;
		const botBlock = block.offset({x: 0, y: -1, z: 0});
		botBlock.setPermutation(BlockPermutation.resolve("minecraft:air"));
		if (destroyedBlockPermutation.type.id === "mr:fridge_dark_top_mr") {
			dimension.spawnItem(new ItemStack("mr:fridge_dark_item", 1), block.center());
		} else if (destroyedBlockPermutation.type.id === "mr:fridge_light_top_mr") {
			dimension.spawnItem(new ItemStack("mr:fridge_light_item", 1), block.center());
		}
	}
}
export class MrFridgeOpen {
	onPlayerInteract(e) {
		toggleBlockState(e, "mr:close", "mr.fridge_close", "mr.fridge_open");
	}
}
export class MrFridge {
	beforeOnPlayerPlace(e) {
		const { player, block, face, permutationToPlace, dimension } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const topBlock = block.offset({x:0, y:1, z:0});
		if (airBlocks.includes(topBlock.typeId)) {
			if (permutationToPlace.type.id.includes("fridge_dark_")) {
				topBlock.setPermutation(BlockPermutation.resolve("mr:fridge_dark_top_mr", {"minecraft:cardinal_direction": direction}));
			} else {
				topBlock.setPermutation(BlockPermutation.resolve("mr:fridge_light_top_mr", {"minecraft:cardinal_direction": direction}));
			}
			const container = dimension.spawnEntity("mr:container_mr", {x: block.x + 0.5, y: block.y + 0.9, z: block.z + 0.5});
			container.triggerEvent("mr:inventory_54");
			container.nameTag = "fridge";
		} else {e.cancel = true;}
	}
}