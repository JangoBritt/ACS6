export class MfScroll {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const quantity = block.permutation.getState("medieval:quantity");
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		if (item?.typeId === block.typeId) {
			const newQuantity = (quantity < 4) ? quantity + 1 : 0;
			block.setPermutation(block.permutation.withState("medieval:quantity", newQuantity));
			dimension.playSound("block.itemframe.add_item", block.center());
		}
	}
}
export class MfHourglassTimer {
	onTick(e) {
		const { block, dimension } = e;
		const levelSand = block.permutation.getState("medieval:sand");
		block.setPermutation(block.permutation.withState("medieval:sand", levelSand - 1));
		dimension.playSound("dig.sand", block.center());
	}
}
export class MfHourglass {
	onPlayerInteract(e) {
		e.block.setPermutation(e.block.permutation.withState("medieval:sand", 4));
		e.dimension.playSound("dig.sand", e.block.center());
	}
}
export class MfGlobeTimer {
	onTick(e) {
		const { block } = e;
		block.setPermutation(block.permutation.withState("medieval:animated", false));
	}
}
export class MfGlobe {
	onPlayerInteract(e) {
		const { block, dimension } = e;
		const direction = block.permutation.getState("minecraft:cardinal_direction");
		const globe = dimension.spawnEntity("medieval:globe_entity", block.center());
		const rotations = {"north": { x: 0, y: 180 },"south": { x: 0, y: 0 },"west": { x: 0, y: 90 },"east": { x: 0, y: -90 }};
		globe.setRotation(rotations[direction]);
		block.setPermutation(block.permutation.withState("medieval:animated", true));
	}
}