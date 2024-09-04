import { ItemStack, BlockPermutation } from '@minecraft/server';
import { airBlocks } from '../util/globalVariables';

export class MfBigBarrel {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace, dimension } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		
		if (beforeBigBarrelPlace(block, direction)) {
			placeAdjacentBlocks(block, direction, permutationToPlace.type.id);
		} else {
			e.cancel = true;
		}
	}
}
export class MfLargeBarrelDestroy {
	onPlayerDestroy(e) {
		const { block, dimension, destroyedBlockPermutation } = e;
		const blockTypeId = destroyedBlockPermutation.type.id;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const offsets = {
			north: { left: { x: -1, y: 0, z: 0 }, front: { x: 0, y: 0, z: 1 } },
			south: { left: { x: 1, y: 0, z: 0 }, front: { x: 0, y: 0, z: -1 } },
			west: { left: { x: 0, y: 0, z: 1 }, front: { x: 1, y: 0, z: 0 } },
			east: { left: { x: 0, y: 0, z: -1 }, front: { x: -1, y: 0, z: 0 } }
		};
		const getOffsetForType = (typeId) => {
			if (typeId.includes("_rfb")) return offsets[direction].left;
			if (typeId.includes("_lbb")) return offsets[direction].front;
			if (typeId.includes("_rbb")) return {
				x: offsets[direction].left.x + offsets[direction].front.x,
				y: 0,
				z: offsets[direction].left.z + offsets[direction].front.z
			};
			if (typeId.includes("_lft")) return { x: 0, y: -1, z: 0 };
			if (typeId.includes("_rft")) return {
				x: offsets[direction].left.x,
				y: -1,
				z: offsets[direction].left.z
			};
			if (typeId.includes("_lbt")) return {
				x: offsets[direction].front.x,
				y: -1,
				z: offsets[direction].front.z
			};
			if (typeId.includes("_rbt")) return {
				x: offsets[direction].front.x + offsets[direction].left.x,
				y: -1,
				z: offsets[direction].front.z + offsets[direction].left.z
			};
		};
		const destroyAdjacentBlock = (offset) => {
			const targetBlock = block.offset(offset);
			dimension.spawnItem(new ItemStack(targetBlock.typeId, 1), targetBlock.center());
			targetBlock.setPermutation(BlockPermutation.resolve("minecraft:air"));
		};
		const offset = getOffsetForType(blockTypeId);
		if (offset) {
			destroyAdjacentBlock(offset);
		}
	}
}
function beforeBigBarrelPlace(block, direction) {
	const offsets = {
		"north": {
			right: { x: 1, y: 0, z: 0 },
			back: { x: 0, y: 0, z: -1 }
		},
		"south": {
			right: { x: -1, y: 0, z: 0 },
			back: { x: 0, y: 0, z: 1 }
		},
		"west": {
			right: { x: 0, y: 0, z: -1 },
			back: { x: -1, y: 0, z: 0 }
		},
		"east": {right: { x: 0, y: 0, z: 1 },back: { x: 1, y: 0, z: 0 }}
	};
	const { right, back } = offsets[direction];
	const positionsToCheck = [
		right,
		back,
		{ x: right.x + back.x, y: 0, z: right.z + back.z },
		{ x: right.x, y: 1, z: right.z },
		{ x: back.x, y: 1, z: back.z },
		{ x: right.x + back.x, y: 1, z: right.z + back.z },
		{ x: 0, y: 1, z: 0 }
	];
	for (const offset of positionsToCheck) {
		const adjacentBlock = block.offset(offset);
		if (!airBlocks.includes(adjacentBlock.typeId)) {
			return false;
		}
	}
	return true;
}
function placeBlockAtOffset(block, offset, id, direction) {
	const targetBlock = block.offset(offset);
	targetBlock.setPermutation(BlockPermutation.resolve(id, { "minecraft:cardinal_direction": direction }));
}
function placeAdjacentBlocks(block, direction, id) {
	const offsets = {
		"north": [
			{ offset: { x: 1, y: 0, z: 0 }, id: `${id}_rfb` },
			{ offset: { x: 0, y: 0, z: -1 }, id: `${id}_lbb` },
			{ offset: { x: 1, y: 0, z: -1 }, id: `${id}_rbb` },
			{ offset: { x: 0, y: 1, z: 0 }, id: `${id}_lft` },
			{ offset: { x: 1, y: 1, z: 0 }, id: `${id}_rft` },
			{ offset: { x: 0, y: 1, z: -1 }, id: `${id}_lbt` },
			{ offset: { x: 1, y: 1, z: -1 }, id: `${id}_rbt` }
		],
		"south": [
			{ offset: { x: -1, y: 0, z: 0 }, id: `${id}_rfb` },
			{ offset: { x: 0, y: 0, z: 1 }, id: `${id}_lbb` },
			{ offset: { x: -1, y: 0, z: 1 }, id: `${id}_rbb` },
			{ offset: { x: 0, y: 1, z: 0 }, id: `${id}_lft` },
			{ offset: { x: -1, y: 1, z: 0 }, id: `${id}_rft` },
			{ offset: { x: 0, y: 1, z: 1 }, id: `${id}_lbt` },
			{ offset: { x: -1, y: 1, z: 1 }, id: `${id}_rbt` }
		],
		"west": [
			{ offset: { x: 0, y: 0, z: -1 }, id: `${id}_rfb` },
			{ offset: { x: -1, y: 0, z: 0 }, id: `${id}_lbb` },
			{ offset: { x: -1, y: 0, z: -1 }, id: `${id}_rbb` },
			{ offset: { x: 0, y: 1, z: 0 }, id: `${id}_lft` },
			{ offset: { x: 0, y: 1, z: -1 }, id: `${id}_rft` },
			{ offset: { x: -1, y: 1, z: 0 }, id: `${id}_lbt` },
			{ offset: { x: -1, y: 1, z: -1 }, id: `${id}_rbt` }
		],
		"east": [
			{ offset: { x: 0, y: 0, z: 1 }, id: `${id}_rfb` },
			{ offset: { x: 1, y: 0, z: 0 }, id: `${id}_lbb` },
			{ offset: { x: 1, y: 0, z: 1 }, id: `${id}_rbb` },
			{ offset: { x: 0, y: 1, z: 0 }, id: `${id}_lft` },
			{ offset: { x: 0, y: 1, z: 1 }, id: `${id}_rft` },
			{ offset: { x: 1, y: 1, z: 0 }, id: `${id}_lbt` },
			{ offset: { x: 1, y: 1, z: 1 }, id: `${id}_rbt` }
		]
	};
	const blocksToPlace = offsets[direction];
	blocksToPlace.forEach(blockInfo => {
		placeBlockAtOffset(block, blockInfo.offset, blockInfo.id, direction);
	});
}