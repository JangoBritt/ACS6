import { BlockPermutation } from "@minecraft/server";

export class MrRockPath {
	beforeOnPlayerPlace(e) {
		const { block, dimension } = e;
		const newBlock = dimension.getBlock(block.location);
		newBlock.setPermutation(BlockPermutation.resolve("mr:rock_path_mr", {"mr:direction": Math.floor(Math.random() * 4), "mr:pattern": Math.floor(Math.random() * 4)}));
		dimension.playSound("dig.stone", block.location);
		e.cancel = true;
	}
}