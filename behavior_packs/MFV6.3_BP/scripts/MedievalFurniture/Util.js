export function sitOnOldChair(e, yOffset) {
	const { player, block, dimension } = e;
	const entityList = dimension.getEntitiesAtBlockLocation(block.location);
	for (const entity of entityList) {
		if (entity.typeId === "medieval:sit_bench") {
			return;
		}
	}
	const chairEntity = dimension.spawnEntity("medieval:sit_bench", {
		x: block.center().x, 
		y: block.y + yOffset, 
		z: block.center().z
	});
	const permutation = block.permutation.getState("medieval:facing_direction");
	if (permutation === 3) {
		chairEntity.setRotation({x: 0, y: 180});
	} else if (permutation === 4) {
		chairEntity.setRotation({x: 0, y: -90});
	} else if (permutation === 5) {
		chairEntity.setRotation({x: 0, y: 90});
	}
	chairEntity.getComponent("rideable").addRider(player);
};
export function sitOnOldChair2(e, yOffset) {
	const { player, block, dimension } = e;
	const entityList = dimension.getEntitiesAtBlockLocation(block.location);
	for (const entity of entityList) {
		if (entity.typeId === "medieval:sit_bench") {
			return;
		}
	}
	const permutation = block.permutation.getState("medieval:facing_direction");
	let xOffset = 0;
	let zOffset = 0;
	if (permutation === 2) { 
		zOffset = -0.1;
	} else if (permutation === 3) { 
		zOffset = 0.1;
	} else if (permutation === 4) { 
		xOffset = -0.1;
	} else if (permutation === 5) { 
		xOffset = 0.1;
	}
	const chairEntity = dimension.spawnEntity("medieval:sit_bench", {
		x: block.center().x + xOffset,
		y: block.y + yOffset,
		z: block.center().z + zOffset
	});
	if (permutation === 3) {
		chairEntity.setRotation({ x: 0, y: 180 });
	} else if (permutation === 4) {
		chairEntity.setRotation({ x: 0, y: -90 });
	} else if (permutation === 5) {
		chairEntity.setRotation({ x: 0, y: 90 });
	}
	chairEntity.getComponent("rideable").addRider(player);
};
export function setOldDirection(e, value) {
	const { player } = e;
	const { x, z } = player.getViewDirection();
	let direction = value;
	if (Math.abs(x) > Math.abs(z)) {
		direction = x > 0 ? value + 3 : value + 2;
	} else {
		direction = z > 0 ? value + 1 : value;
	}
	e.permutationToPlace = e.permutationToPlace.withState('medieval:facing_direction', direction);
}
export class MfSimpleRotation {
	beforeOnPlayerPlace(e) {
		const { player } = e;
		const y = player.getRotation().y;
		const direction = y >= -45 && y < 45 || y >= 135 || y < -135 ? 1 : 2;
		e.permutationToPlace = e.permutationToPlace.withState('medieval:facing_direction', direction);
	}
}

export class MfSitOffset1 {
	onPlayerInteract(e) {
		sitOnOldChair(e, 0.4);
	}
}
export class MfSitCenter {
	onPlayerInteract(e) {
		sitOnOldChair(e, 0.5);
	}
}
export class MfSetOldDirection2 {
	beforeOnPlayerPlace(e) {
		setOldDirection(e, 2);
	}
}