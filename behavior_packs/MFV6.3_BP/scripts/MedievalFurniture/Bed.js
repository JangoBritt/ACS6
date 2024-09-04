import { ItemStack, BlockPermutation } from '@minecraft/server';
import { rightBlockLocation, leftBlockLocation, airBlocks, frontBlockLocation, backBlockLocation } from '../util/globalVariables';

export class MfBedBotDestroy {
	onPlayerDestroy(e) {
		const { block, dimension, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const backBlock = block.offset(frontBlockLocation[direction]);
		const tag = `m.${destroyedBlockPermutation.type.id.split(":")[1].replace("_top", "")}_${direction}`;
		const rightBlock = backBlock.offset(rightBlockLocation[direction]);
		const leftBlock = backBlock.offset(leftBlockLocation[direction]);
		dimension.spawnItem(new ItemStack(backBlock.typeId, 1), block.center());
		backBlock.setPermutation(BlockPermutation.resolve("minecraft:air"));
		if (rightBlock.hasTag(tag)) UpdateBed(rightBlock);
		if (leftBlock.hasTag(tag)) UpdateBed(leftBlock);
	}
	onPlace(e) {
		const { block } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const tag = `m.${block.typeId.split(":")[1]}_${direction}`;
		const blockBelow = block.below();
		if (blockBelow.hasTag(tag)) UpdateBedTop(blockBelow);
	}
}
export class MfBedConnection {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const frontBlock = block.offset(backBlockLocation[direction]);
		if (airBlocks.includes(frontBlock.typeId)) {
			frontBlock.setPermutation(BlockPermutation.resolve(`${permutationToPlace.type.id}_top`, {"minecraft:cardinal_direction": direction}));
		} else e.cancel = true;
	}
	onPlace(e) {
		const { block } = e;
		UpdateBed(block);
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		const leftBlock = block.offset(leftBlockLocation[direction]);
		const tag = `m.${block.typeId.split(":")[1]}_${direction}`;
		if (rightBlock.hasTag(tag)) UpdateBed(rightBlock);
		if (leftBlock.hasTag(tag)) UpdateBed(leftBlock);
	}
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const rightBlock = block.offset(rightBlockLocation[direction]);
		const leftBlock = block.offset(leftBlockLocation[direction]);
		const tag = `m.${destroyedBlockPermutation.type.id.split(":")[1]}_${direction}`;
		if (rightBlock.hasTag(tag)) UpdateBed(rightBlock);
		if (leftBlock.hasTag(tag)) UpdateBed(leftBlock);
	}
}
function UpdateBedTop(block) {
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	const backBlockState = block.offset(frontBlockLocation[direction]).permutation.getState("medieval:side");
	block.setPermutation(block.permutation.withState("medieval:side", backBlockState));
	const tag = `m.${block.typeId.split(":")[1]}_${direction}`;
	const blockAbove = block.above();
	if (blockAbove.hasTag(tag)) block.setPermutation(block.permutation.withState("medieval:top", true));
	else block.setPermutation(block.permutation.withState("medieval:top", false));
}
function UpdateBed(block) {
	const direction = block.permutation.getState("minecraft:cardinal_direction");
	const rightBlock = block.offset(rightBlockLocation[direction]);
	const leftBlock = block.offset(leftBlockLocation[direction]);
	const tag = `m.${block.typeId.split(":")[1]}_${direction}`;
	const sideState = rightBlock.hasTag(tag) ? (leftBlock.hasTag(tag) ? 3 : 2): (leftBlock.hasTag(tag) ? 1 : 0);
	block.setPermutation(block.permutation.withState("medieval:side", sideState));
	const frontBlock = block.offset(backBlockLocation[direction]);
	if (frontBlock.typeId === `${block.typeId}_top`) UpdateBedTop(frontBlock);
}