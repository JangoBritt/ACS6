export class MfBarrel {
	beforeOnPlayerPlace(e) {
		const { player, block, dimension } = e;
		const container = dimension.spawnEntity("medieval:barrel_cont", {x: block.x+0.5, y: block.y, z: block.z+0.5});
		const { x, z } = player.getViewDirection();
		let yRotation;
		if (Math.abs(x) > Math.abs(z)) {
			yRotation = x > 0 ? -90 : 90;
		} else {
			yRotation = z > 0 ? 0 : 180;
		}
		container.setRotation({x: 0, y: yRotation});
	}
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const inventory = player.getComponent("inventory").container;
		const item = inventory.getItem(player.selectedSlotIndex);
		const allowedItems = [
			'minecraft:apple','minecraft:beetroot','minecraft:water_bucket','minecraft:carrot',
			'minecraft:cod','minecraft:potato','minecraft:salmon','minecraft:golden_apple',
			'minecraft:golden_carrot','minecraft:bamboo','minecraft:arrow','minecraft:diamond',
			'minecraft:iron_ingot','minecraft:gold_ingot','minecraft:copper_ingot','minecraft:emerald',
			'minecraft:wheat'
		];
		const itemMap = {
			"minecraft:apple": 1,
			"minecraft:beetroot": 2,
			"minecraft:carrot": 3,
			"minecraft:potato": 4,
			"minecraft:wheat": 5,
			"minecraft:bamboo": 6,
			"minecraft:cod": 7,
			"minecraft:salmon": 8,
			"minecraft:golden_apple": 9,
			"minecraft:golden_carrot": 10,
			"minecraft:water_bucket": 11,
			"minecraft:arrow": 12,
			"minecraft:diamond": 13,
			"minecraft:emerald": 14,
			"minecraft:iron_ingot": 15,
			"minecraft:gold_ingot": 16,
			"minecraft:copper_ingot": 17
		};
		const container = dimension.getEntitiesAtBlockLocation(block.location)[0];
		const currentVariant = container?.getComponent("minecraft:variant")?.value;
		if (container?.typeId === "medieval:barrel_cont" && allowedItems.includes(item?.typeId)) {
			const newVariant = itemMap[item.typeId];
			if (currentVariant === 0 || currentVariant !== newVariant) {
				container.triggerEvent(`${item.typeId.replace("minecraft:", "medieval:")}`);
				block.setPermutation(block.permutation.withState("medieval:item", true));
				dimension.playSound("block.itemframe.add_item", block.center());
			}
		} else if (container?.typeId === "medieval:barrel_cont" && currentVariant !== 0 && player.isSneaking) {
			container.triggerEvent("medieval:remove");
			block.setPermutation(block.permutation.withState("medieval:item", false));
			dimension.playSound("block.itemframe.remove_item", block.center());
		}
	}
}