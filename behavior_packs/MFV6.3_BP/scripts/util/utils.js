import { ItemEnchantableComponent, ItemStack } from "@minecraft/server";

export function itemApplyDamage(player, item) {
	if (isCreative(player)) return;
	const inventory = player.getComponent("inventory");
	const durabilityComponent = item.getComponent("durability");

	let applyDamage = true;

	const unbreaking = item.getComponent(ItemEnchantableComponent.componentId)?.getEnchantment("unbreaking");
	if (unbreaking) {
		const level = unbreaking.level;
		const probabilities = { 1: 0.5, 2: 0.666, 3: 0.75 };
		const probability = probabilities[level] || 0;
		applyDamage = Math.random() > probability;
	}
	if (durabilityComponent.damage >= durabilityComponent.maxDurability) {
		player.dimension.playSound("random.break", player.location);
		inventory.container.setItem(player.selectedSlotIndex, undefined);
	} else if (applyDamage) {
		durabilityComponent.damage += 1;
		inventory.container.setItem(player.selectedSlotIndex, item);
	}
};
export function addItemOrSpawn(player, itemStack) {
	const inventory = player.getComponent("inventory").container;
	let itemAdded = false;
	let availableSlot = false;
	for (let slot = 0; slot < inventory.size; slot++) {
		const currentItem = inventory.getItem(slot);
		if (currentItem?.isStackableWith(itemStack) && currentItem.amount < currentItem.maxAmount) {
			currentItem.amount += 1;
			inventory.setItem(slot, currentItem);
			itemAdded = true;
			break;
		}
		if (!currentItem) {
			availableSlot = true;
		}
	}
	if (availableSlot && !itemAdded) {
		inventory.addItem(itemStack);
		itemAdded = true;
	}
	if (!itemAdded) {
		player.dimension.spawnItem(itemStack, itemLocationFrontPlayer(player, 1.5));
	}
};
export function decrementItemInHand(player) {
	const inventory = player.getComponent("inventory").container;
	const selectedSlotIndex = player.selectedSlotIndex;
	const item = inventory.getItem(selectedSlotIndex);

	if (item !== undefined) {
		if (item.amount > 1) {
			item.amount -= 1;
			inventory.setItem(selectedSlotIndex, item);
		} else {
			inventory.setItem(selectedSlotIndex, undefined);
		}
	}
};
export function itemLocationFrontPlayer(player, distance) {
	const viewDirection = player.getViewDirection();
	const headLocation = player.location;
	const spawnX = headLocation.x + viewDirection.x * distance;
	const spawnY = headLocation.y + 0.3;
	const spawnZ = headLocation.z + viewDirection.z * distance;

	return ({ x: spawnX, y: spawnY, z: spawnZ });
};
export function handleSitOnFurniture(e, entityType, yOffset) {
	const player = e.player;
	const block = e.block;
	const entityList = e.dimension.getEntitiesAtBlockLocation(block.location);
	for (const entity of entityList) {
		if (entity.typeId === entityType) {
			return;
		}
	}
	const chairEntity = e.dimension.spawnEntity(entityType, {
		x: block.x + 0.5, 
		y: block.y + yOffset, 
		z: block.z + 0.5
	});
	const permutation = block.permutation.getState("minecraft:cardinal_direction");
	if (permutation === "south") {
		chairEntity.setRotation({x: 0, y: 180});
	} else if (permutation === "west") {
		chairEntity.setRotation({x: 0, y: -90});
	} else if (permutation === "east") {
		chairEntity.setRotation({x: 0, y: 90});
	}
	//player.playAnimation("animation.player.animation.sit_on_chair", { "stopExpression": "!q.is_riding" });
	chairEntity.getComponent("rideable").addRider(player);
};
export function isCreative(player) {
	if(player.getGameMode() === "creative") return true;
	return false;
};
export function toggleBlockState(e, stateKey, soundOn, soundOff) {
	let permutation = e.block.permutation;
	let currentState = permutation.getState(stateKey);
	let newPermutation = permutation.withState(stateKey, !currentState);
	e.block.setPermutation(newPermutation);
	e.dimension.playSound(currentState ? soundOff : soundOn, e.block.location);
};
export function addOrReplaceItem(player, itemAdded, n) {
	const inventory = player.getComponent("inventory").container;
	const item = inventory.getItem(player.selectedSlotIndex);
	if (!isCreative(player)) {
		if (item.amount > 1) {
			decrementItemInHand(player);
			addItemOrSpawn(player, new ItemStack(itemAdded, n));
		} else {
			inventory.setItem(player.selectedSlotIndex, new ItemStack(itemAdded, n));
		}
	}
};

export function handleSitOnNewFurniture(e, entityType, yOffset) {
	const player = e.player;
	const block = e.block;
	const entityList = e.dimension.getEntitiesAtBlockLocation(block.location);
	for (const entity of entityList) {
		if (entity.typeId === entityType) {
			return;
		}
	}
	const chairEntity = e.dimension.spawnEntity(entityType, {
		x: block.x + 0.5, 
		y: block.y + yOffset, 
		z: block.z + 0.5
	});
	const permutation = block.permutation.getState("minecraft:cardinal_direction");
	if (permutation === "north") {
		chairEntity.setRotation({x: 0, y: 180});
	} else if (permutation === "east") {
		chairEntity.setRotation({x: 0, y: -90});
	} else if (permutation === "west") {
		chairEntity.setRotation({x: 0, y: 90});
	}
	//player.playAnimation("animation.player.animation.sit_on_chair", { "stopExpression": "!q.is_riding" });
	chairEntity.getComponent("rideable").addRider(player);
};
export function simpleToggleBlockState(block, stateKey) {
	let permutation = block.permutation;
	let currentState = permutation.getState(stateKey);
	let newPermutation = permutation.withState(stateKey, !currentState);
	block.setPermutation(newPermutation);
};
export function breakBlock(block) {
	block.dimension.runCommandAsync(`setblock ${block.x} ${block.y} ${block.z} air destroy`);
}
export function sitOnChairXZ(e, yOffset, d) {
	const { player, block, dimension } = e;
	if (dimension.getEntitiesAtBlockLocation(block.location).some(entity => entity.typeId === "medieval:sit_bench")) return;
	const directionData = {
		north: { xOffset: 0, zOffset: -d, rotation: 180 },
		south: { xOffset: 0, zOffset: d, rotation: 0 },
		west: { xOffset: -d, zOffset: 0, rotation: 90 },
		east: { xOffset: d, zOffset: 0, rotation: -90 }
	};
	const permutation = block.permutation.getState("minecraft:cardinal_direction");
	const { xOffset = 0, zOffset = 0, rotation = 0 } = directionData[permutation] || {};
	const entityList = dimension.getEntitiesAtBlockLocation(block.location);
	for (const entity of entityList) {if (entity.typeId === "medieval:sit_bench") {return;}}
	const chairEntity = dimension.spawnEntity("medieval:sit_bench", {
		x: block.center().x + xOffset,
		y: block.y + yOffset,
		z: block.center().z + zOffset
	});
	chairEntity.setRotation({ x: 0, y: rotation });
	chairEntity.getComponent("rideable").addRider(player);
};
export function breakBlockWithItems(player, block, itemlist, state) {
	if (isCreative(player)) return;
	if (state > 0) block.dimension.spawnItem(new ItemStack(itemlist[state - 1], 1), block.center());
}