import { BlockPermutation } from "@minecraft/server";
import { decrementItemInHand, isCreative } from '../util/utils'; //Jango edit

export class MrRockPath {
	beforeOnPlayerPlace(e) {
		const { player, block, dimension } = e;                  //Jango edit
		const newBlock = dimension.getBlock(block.location);
		newBlock.setPermutation(BlockPermutation.resolve("mr:rock_path_mr", {"mr:direction": Math.floor(Math.random() * 4), "mr:pattern": Math.floor(Math.random() * 4)}));
		dimension.playSound("dig.stone", block.location);
		e.cancel = true;
		if (!isCreative(player)) decrementItemInHand(player);    //Jango edit
	}
}