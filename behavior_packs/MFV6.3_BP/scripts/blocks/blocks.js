import { world, ItemStack, EquipmentSlot } from '@minecraft/server';

const colors = [
	"black", "blue", "brown", "cyan", "gray", "green",
	"light_blue", "light_gray", "lime", "magenta", "orange",
	"pink", "purple", "red", "white", "yellow"
];
world.afterEvents.playerBreakBlock.subscribe((e) => {
	if(e.player.getGameMode() !== "survival") return;
	const blockPermut = e.brokenBlockPermutation;
	if (blockPermut.type.id.includes("medieval:") && blockPermut.type.id.includes("_bowl0")) {
		breakBowl(e);
	}
});

world.afterEvents.itemUseOn.subscribe((e) => {
	const item = e.itemStack;
	const block = e.block;
	if ((item.typeId.includes("minecraft:") && item.typeId.includes("_dye")) &&
		(block.typeId.includes("medieval:") && colors.some(color => block.typeId.includes(color)) && block.typeId.includes("_chair"))) {
		paintChair(e);
	}
});
/*world.afterEvents.entityHitBlock.subscribe((e) => {
	const entity = e.damagingEntity;
	const block = e.hitBlock;
	var _a;
	if (entity.typeId === "minecraft:player") {
		let equip_component = entity.getComponent('minecraft:equippable');
    	let held_item_id = (_a = equip_component.getEquipment(EquipmentSlot.Mainhand)) === null || _a === void 0 ? void 0 : _a.typeId;
		if(held_item_id === "minecraft:arrow") {
			//entity.runCommandAsync(`setblock ${block.location.x} ${block.location.y + 1} ${block.location.z} grass`);
		}
	}
});*/
world.afterEvents.projectileHitBlock.subscribe((e) => {
	const block = e.getBlockHit().block;
	const player = e.source;
	if (block.typeId === "medieval:cookie_jar_0") {
		//e.source.sendMessage(`${block.location.x} ${block.location.y} ${block.location.z}`);
		player.runCommandAsync(`setblock ${block.location.x} ${block.location.y} ${block.location.z} air destroy`);
	}
});
function paintChair(e) {
	const item = e.itemStack;
	const player = e.source;
	const block = e.block;
	const blockPermut = block.permutation;

	const dyeColor = item.typeId.split(':')[1].split('_dye')[0];
	const blockColor = colors.find(color => block.typeId.includes(color));
	
	if (dyeColor !== blockColor) {
		const direction = blockPermut.getState("medieval:facing_direction");
		const prefix = block.typeId.match(new RegExp(`^.*?(${colors.join('|')})`))[0].replace(/_(black|blue|brown|cyan|gray|green|light_blue|light_gray|lime|magenta|orange|pink|purple|red|white|yellow).*$/, "_");
		
		player.runCommandAsync(`setblock ${block.location.x} ${block.location.y} ${block.location.z} ${prefix}${dyeColor}_chair ["medieval:facing_direction" = ${direction}]`);
		player.playSound("block.itemframe.add_item");
		if(player.getGameMode() !== "creative") player.runCommandAsync(`clear @s ${item.typeId} 0 1`);
	}
};
function breakBowl(e) {
	const block = e.block;
	const blockPermut = e.brokenBlockPermutation;
	const quantity = blockPermut.getState("medieval:quantity");
	if (quantity === 0) return;
	
	const food = blockPermut.getState("medieval:status");
	const foodType = blockPermut.getState("medieval:type");

	const lootLocation = {
		x: block.location.x + 0.5,
		y: block.location.y + 0.1,
		z: block.location.z + 0.5,
	};

	const itemMap = {
		0: {
			1: "minecraft:cooked_beef",
			2: "minecraft:cooked_mutton",
			3: "minecraft:cooked_porkchop",
			4: "minecraft:cooked_cod",
			5: "minecraft:cooked_salmon",
			6: "minecraft:apple",
			7: "minecraft:golden_apple",
			8: "minecraft:bread",
			9: "minecraft:cookie",
			10: "minecraft:carrot",
			11: "minecraft:golden_carrot",
			12: "minecraft:melon_slice",
			13: "minecraft:glistering_melon_slice",
			14: "minecraft:cooked_chicken",
			15: "minecraft:cooked_rabbit"
		},
		1: {
			1: "minecraft:rabbit_stew",
			2: "minecraft:beetroot_soup",
			3: "minecraft:baked_potato",
			4: "minecraft:pumpkin_pie",
			5: "minecraft:beetroot"
		}
	};

	const itemType = itemMap[foodType]?.[food];
	if (itemType) {
		block.dimension.spawnItem(new ItemStack(itemType, quantity), lootLocation);
	}
};