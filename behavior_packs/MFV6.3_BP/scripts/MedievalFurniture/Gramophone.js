import { decrementItemInHand } from '../util/utils';

export class MfGramophone {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const allowedItems = ["minecraft:music_disc_11", "minecraft:music_disc_13", "minecraft:music_disc_blocks", "minecraft:music_disc_cat", "minecraft:music_disc_chirp", "minecraft:music_disc_far", "minecraft:music_disc_mall", "minecraft:music_disc_mellohi", "minecraft:music_disc_otherside", "minecraft:music_disc_pigstep", "minecraft:music_disc_stal", "minecraft:music_disc_strad", "minecraft:music_disc_wait", "minecraft:music_disc_ward", "minecraft:music_disc_5", "minecraft:music_disc_relic", "minecraft:music_disc_creator", "minecraft:music_disc_creator_music_box", "minecraft:music_disc_precipice"];
		const discTest = dimension.getEntitiesAtBlockLocation(block.location).find(entity => entity.typeId === "medieval:disc_music");
		if (!discTest && allowedItems.includes(item?.typeId)) {
			const disc = dimension.spawnEntity("medieval:disc_music", block.center());
			if (direction === "north") {
				disc.setRotation({x: 0, y: 180});
			}
			if (direction === "west") {
				disc.setRotation({x: 0, y: 90});
			}
			if (direction === "east") {
				disc.setRotation({x: 0, y: -90});
			}
			disc.triggerEvent(item.typeId.split(":")[1]);
			decrementItemInHand(player);
		} else if (discTest) {
			discTest.triggerEvent("medieval:despawn");
		}
	}
}