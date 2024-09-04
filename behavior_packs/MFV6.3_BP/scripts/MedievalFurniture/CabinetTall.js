import { BlockPermutation } from '@minecraft/server';
import { toggleBlockState, simpleToggleBlockState, breakBlock } from '../util/utils';
import { rightBlockLocation, airBlocks } from '../util/globalVariables';

export class MfCabinetTallTop {
	onPlayerInteract(e) {
		const { block, dimension } = e;
		const close = block.below().permutation.getState("medieval:close");
		simpleToggleBlockState(block.below(), "medieval:close");
		if (close) dimension.playSound("block.barrel.open", block.center());
		else dimension.playSound("block.barrel.close", block.center());
	}
	onPlayerDestroy(e) {
		breakBlock(e.block.below());
	}
}
export class MfCabinetTall {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace, dimension } = e;
		const aboveBlock = block.above();
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		if (airBlocks.includes(aboveBlock.typeId)) {
			const leftBlock = block.offset(rightBlockLocation[direction]);
			if (leftBlock.hasTag("m.cabinet_tall") && leftBlock.permutation.getState("medieval:side")) {
				e.permutationToPlace = permutationToPlace.withState("medieval:side", false);
			}
			aboveBlock.setPermutation(BlockPermutation.resolve(`${permutationToPlace.type.id}_top`, {"minecraft:cardinal_direction": direction}));
			const container = dimension.spawnEntity("medieval:big_container", {x: block.x + 0.5, y: block.y + 1, z: block.z + 0.5});
			container.nameTag = "cabinet_tall";
		} else e.cancel = true;
	}
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const itemState = block.permutation.getState("medieval:item");
		const close = block.permutation.getState("medieval:close");
		const allowedItems = ['minecraft:book', 'minecraft:potion'];
		if (!close && (allowedItems.includes(item?.typeId) || player.isSneaking)) {
			if (allowedItems.includes(item?.typeId) && itemState === 0) {
				block.setPermutation(block.permutation.withState("medieval:item", allowedItems.indexOf(item.typeId) + 1));
				dimension.playSound("block.itemframe.add_item", block.center());
			}
			if (player.isSneaking && itemState > 0) {
				block.setPermutation(block.permutation.withState("medieval:item", 0));
				dimension.playSound("block.itemframe.remove_item", block.center());
			}
		} else toggleBlockState(e, "medieval:close", "block.barrel.close", "block.barrel.open");
	}
	onPlace(e) {
		if (e.block.above().typeId !== `${e.block.typeId}_top`) breakBlock(e.block);
	}
}