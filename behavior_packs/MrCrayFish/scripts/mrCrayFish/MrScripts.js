import { world, ItemStack } from "@minecraft/server";
import { solidBlocks, blockException, directions } from '../util/globalVariables';
import { MrSofa } from './Sofa';
import { MrBlinds } from './Blinds';
import { MrGrill } from './Grill';
import { MrFenceGate } from './FenceGate';
//import { MrMailBox } from './MailBox';
import { MrFillSink } from './Sink';
import { MrCounter } from './Counter';
import { MrRockPath } from './RockPath';
import { MrPlaceContainer } from './Container';
import { MrFridge, MrFridgeOpen, MrFridgeBreak } from './Fridge';
import { MrBounce, MrBounceBoard, MrDivingBoard, MrDivingBoardBreak } from './Trampolin';
import { MrSit } from './SitOnChair';
import { MrSameBlockUpdate, MrUpdateSideBlocks } from './UpdateBlocks';

world.beforeEvents.worldInitialize.subscribe((e) => {
	e.blockComponentRegistry.registerCustomComponent("mr:sit", new MrSit());
	e.blockComponentRegistry.registerCustomComponent("mr:same_block_detector", new MrSameBlockUpdate());
	e.blockComponentRegistry.registerCustomComponent("mr:rock_path", new MrRockPath());
	e.blockComponentRegistry.registerCustomComponent("mr:block_connection", new MrBlockConnection());
	e.blockComponentRegistry.registerCustomComponent("mr:place_container", new MrPlaceContainer());
	e.blockComponentRegistry.registerCustomComponent("mr:fill_sink", new MrFillSink());
	e.blockComponentRegistry.registerCustomComponent("mr:update_side_blocks", new MrUpdateSideBlocks());
	e.blockComponentRegistry.registerCustomComponent("mr:blinds", new MrBlinds());
	e.blockComponentRegistry.registerCustomComponent("mr:counter_detection", new MrCounter());
	e.blockComponentRegistry.registerCustomComponent("mr:bounce", new MrBounce());
	e.blockComponentRegistry.registerCustomComponent("mr:same_block_update", new MrSameBlockUpdate());
	//e.blockComponentRegistry.registerCustomComponent("mr:mail_box", new MrMailBox());
	e.blockComponentRegistry.registerCustomComponent("mr:fence_gate", new MrFenceGate());
	e.blockComponentRegistry.registerCustomComponent("mr:sofa", new MrSofa());
	e.blockComponentRegistry.registerCustomComponent("mr:grill", new MrGrill());
	e.blockComponentRegistry.registerCustomComponent("mr:diving_board", new MrDivingBoard());
	e.blockComponentRegistry.registerCustomComponent("mr:diving_board_break", new MrDivingBoardBreak());
	e.blockComponentRegistry.registerCustomComponent("mr:bounce_board", new MrBounceBoard());
	e.blockComponentRegistry.registerCustomComponent("mr:fridge", new MrFridge());
	e.blockComponentRegistry.registerCustomComponent("mr:open_fridge", new MrFridgeOpen());
	e.blockComponentRegistry.registerCustomComponent("mr:fridge_break", new MrFridgeBreak());
});
world.afterEvents.playerPlaceBlock.subscribe((e) => {
	const { block } = e;
	try {
		if (shouldBlockConnect(block)) {
			updateAdjacentBlocks(block, true);
		}
	} catch (error) {
		return;
	}
});
world.afterEvents.playerBreakBlock.subscribe((e) => {
	const { block } = e;
	try {
		updateAdjacentBlocks(block, false);
	} catch (error) {
		return;
	}
});
world.afterEvents.blockExplode.subscribe((e) => {
	const { block } = e;
	try {
		updateAdjacentBlocks(block, false);
	} catch (error) {
		return;
	}
});
//Update grill
world.afterEvents.dataDrivenEntityTrigger.subscribe((e) => {
	const { entity, eventId } = e;
	if (entity.typeId === "mr:food_mr" && eventId === "mr:remove_food") {
		let typeFood = entity.getComponent("variant").value;
		let foodItem = {
			0: "minecraft:dried_kelp",
			1: "minecraft:cooked_cod",
			2: "minecraft:baked_potato",
			3: "minecraft:cooked_porkchop",
			4: "minecraft:cooked_beef",
			5: "minecraft:cooked_chicken",
			6: "minecraft:cooked_mutton",
			7: "minecraft:cooked_rabbit",
			8: "minecraft:cooked_salmon"
		}
		let grillState = entity.getDynamicProperty("grill_state");
		if (grillState) {
			let block = entity.dimension.getBlock(entity.location);
			if (block.typeId.includes("grill")) block.setPermutation(block.permutation.withState(`${grillState}`, 0));
			entity.dimension.spawnItem(new ItemStack(foodItem[typeFood], 1), entity.location);
			entity.remove();
		} else {
			entity.remove();
		}
	}
});
class MrBlockConnection {
	onPlace(e) {
		const { block } = e;
		updateSelfPermutation(block);
	}
}
function shouldBlockConnect(block) {
	return block.hasTag("is_solid") ||
		(solidBlocks.some(connect => block.typeId.includes(connect)) &&
		!blockException.some(exception => block.typeId.includes(exception)) &&
		block.typeId.includes("minecraft:"));
}
function updateAdjacentBlocks(block, shouldConnect) {
	for (const direction in directions) {
		const offset = directions[direction];
		const adjacentBlock = block.offset(offset);
		
		if (adjacentBlock.typeId.includes("mr:") &&
			(adjacentBlock.typeId.includes("fence") || adjacentBlock.typeId.includes("hedge"))) {
			const oppositeDirection = directions[direction].opposite;
			adjacentBlock.setPermutation(adjacentBlock.permutation.withState(`mr:${oppositeDirection[0]}`, shouldConnect ? 1 : 0));
		}
	}
}
function updateSelfPermutation(block) {
	for (const direction in directions) {
		const offset = directions[direction];
		const adjacentBlock = block.offset(offset);
		const shouldConnect = shouldBlockConnect(adjacentBlock);

		block.setPermutation(block.permutation.withState(`mr:${direction[0]}`, shouldConnect ? 1 : 0));
	}
}
/*
OBTENER ESTADOS DE UN BLOQUE
const states = block.permutation.getAllStates();
for (const stateName in states) {
	if (stateName.includes("close")) {
		dimension.runCommandAsync(`say State name: ${stateName}, Value: ${states[stateName]}`);
	}
}*/