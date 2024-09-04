import { BlockPermutation } from '@minecraft/server';
import { decrementItemInHand, isCreative } from '../util/utils';
import { airBlocks } from '../util/globalVariables';

export class MfStreetlight {
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const directionMap = {north: block.south(),south: block.north(),west: block.east(),east: block.west()};
		if (directionMap[direction].hasTag("streetlight_0")) UpdatePostStreetlight(directionMap[direction]);
	}
}
export class MfPostStreetlight {
	onPlace(e) {
		UpdateAdjacentStreetlights(e.block);
	}
	onPlayerDestroy(e) {
		UpdateAdjacentStreetlights(e.block, false);
	}
	onPlayerInteract(e) {
		const { player, block, dimension, face } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const allowedItems = ['minecraft:lantern', 'minecraft:soul_lantern'];
		const directions = {
			North: { state: "medieval:n", method: block.north() },
			South: { state: "medieval:s", method: block.south() },
			West: { state: "medieval:w", method: block.west() },
			East: { state: "medieval:e", method: block.east() },
		};
		const direction = directions[face];
		if (direction && block.permutation.getState(direction.state) === 0 && allowedItems.includes(item?.typeId) && airBlocks.includes(direction.method.typeId)) {
			dimension.playSound("block.itemframe.add_item", block.center());
			direction.method.setPermutation(BlockPermutation.resolve(`${item.typeId.replace("minecraft", "medieval")}_streetlight`, {"minecraft:cardinal_direction": face.toLowerCase()}));
			block.setPermutation(block.permutation.withState(direction.state, 1));
			if (!isCreative(player)) decrementItemInHand(player);
		}
	}
}
function UpdatePostStreetlight(block) {
    const below = block.below();
    const above = block.above();
    const belowHasTag = below.hasTag("streetlight_0");
    const aboveHasTag = above.hasTag("streetlight_0");
    const newState = belowHasTag ? (aboveHasTag ? 1 : 2) : 0;
    const directions = {
        n: { block: block.north(), tag: "north_streetlight" },
        s: { block: block.south(), tag: "south_streetlight" },
        w: { block: block.west(), tag: "west_streetlight" },
        e: { block: block.east(), tag: "east_streetlight" },
    };
    let permutation = block.permutation.withState("medieval:top", newState);
    if (newState === 0) {
        Object.keys(directions).forEach(dir => {permutation = permutation.withState(`medieval:${dir}`, 0);});
    } else {
        Object.entries(directions).forEach(([dir, { block, tag }]) => {
            if (!block.hasTag(tag)) {
                permutation = permutation.withState(`medieval:${dir}`, 0);
            }
        });
    }
    block.setPermutation(permutation);
    return { belowHasTag, aboveHasTag };
}
function UpdateAdjacentStreetlights(block, updateCurrent = true) {
	const { belowHasTag, aboveHasTag } = updateCurrent ? UpdatePostStreetlight(block) : { belowHasTag: block.below().hasTag("streetlight_0"), aboveHasTag: block.above().hasTag("streetlight_0") };
	if (belowHasTag) UpdatePostStreetlight(block.below());
	if (aboveHasTag) UpdatePostStreetlight(block.above());
}