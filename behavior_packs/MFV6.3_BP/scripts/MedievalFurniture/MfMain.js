import { world, ItemStack } from '@minecraft/server';
import { directions, solidBlocks, blockException } from '../util/globalVariables';
import { MfSimpleRotation, MfSitOffset1, MfSitCenter, MfSetOldDirection2 } from './Util';
import { MfStove, MfStoveDestroy, MfStoveTimer } from './Stove';
import { MfBasket } from './Basket';
import { MfSitOffset2 } from './ChairColor';
import { MfUpdateSidedBlocks } from './UpdateSidedBlocks';
import { MfToggleFurnitureBlock, MfBasicContainer, MfSitOnChair } from './Furniture';
import { MfBarrel } from './Barrel';
import { MfBreakWorkbench, MfPlaceWorkbench } from './Workbench';
import { MfBoxItem } from './BoxItem';
import { MfDrawer1, MfDrawer0 } from './Drawer';
import { MfRemoveBlockTop, MfTopEasel } from './Easel';
import { MfPillar } from './Pillar';
import { MfSmokestackTick, MfSmokestack } from './Smokestack';
import { MfFillBeer, MfBeerBarrel } from './BeerBarrel';
import { MfStackedLog } from './StackedLog';
import { MfBeerMug } from './BeerMug';
import { MfBucketFill } from './Bucket';
import { MfGramophone } from './Gramophone';
import { MfBook } from './Book';
import { MfStickPost } from './StickPost';
import { MfScarecrowDestroy, MfScarecrow } from './Scarecrow';
import { MfWindowTable } from './WindowTable';
import { MfNormalTable } from './NormalTable';
import { MfItemTable } from './ItemTable';
import { MfBridge } from './Bridge';
import { MfTopBlockDestroy, MfPendulumClock } from './Clock';
import { MfSetOnFire, MfBrazier } from './Brazier';
import { MfCarpetConnection } from './Carpet';
import { MfCookieJar } from './CookieJar';
import { MfBigBarrel, MfLargeBarrelDestroy } from './LargeBarrel';
import { MfTallWindowTop, MfTallWindow } from './TallWindow';
import { MfToilet } from './Toilet';
import { MfWoodenStairs } from './WoodenStairs';
import { MfTripleSaddleStandTop, MfTripleSaddleStand, MfSaddleStand } from './SaddleStand';
import { MfItemBreakBlock, MfBeerEffects } from './Items';
import { MfScroll, MfHourglassTimer, MfHourglass, MfGlobeTimer, MfGlobe } from './Cartographer';
import { MfSupportConnection } from './Support';
import { MfMailbox } from './Mailbox';
import { MfBowl } from './Bowl';
import { MfWeaponStandSide, MfWeaponStand } from './WeaponStand';
import { MfIronThroneDestroy, MfIronThrone } from './IronThrone';
import { MfStreetlight, MfPostStreetlight } from './Streetlight';
import { MfDyePot } from './Pot';
import { MfFishDrying } from './FishDrying';
import { MfFlowerStand } from './FlowerStand';
import { MfSign } from './Sign';
import { MfHangingChandelier, MfWoodenChandelier } from './Chandelier';
import { MfCupboard } from './Cupboard';
import { MfCabinetTallTop, MfCabinetTall } from './CabinetTall';
import { MfFenceGateConnection, MfFenceGate } from './FenceGate';
import { MfBedBotDestroy, MfBedConnection } from './Bed';
import { MfSofa } from './Sofa';
import { MfBookshelfConnection } from './Bookshelf';

world.beforeEvents.worldInitialize.subscribe((e) => {
	e.blockComponentRegistry.registerCustomComponent("mf:old_rotation2", new MfSetOldDirection2());
	e.blockComponentRegistry.registerCustomComponent("mf:sit_center", new MfSitCenter());
	e.blockComponentRegistry.registerCustomComponent("mf:sit_offset1", new MfSitOffset1());
	e.blockComponentRegistry.registerCustomComponent("mf:sit_offset2", new MfSitOffset2());
	e.blockComponentRegistry.registerCustomComponent("mf:sit_on_chair", new MfSitOnChair());
	e.blockComponentRegistry.registerCustomComponent("mf:update_sided_blocks", new MfUpdateSidedBlocks());
	e.blockComponentRegistry.registerCustomComponent("mf:basic_container", new MfBasicContainer());
	e.blockComponentRegistry.registerCustomComponent("mf:toggle_furniture_block", new MfToggleFurnitureBlock());
	e.blockComponentRegistry.registerCustomComponent("mf:barrel", new MfBarrel());
	e.blockComponentRegistry.registerCustomComponent("mf:block_connection", new MfBlockConnection());
	e.blockComponentRegistry.registerCustomComponent("mf:place_workbench", new MfPlaceWorkbench());
	e.blockComponentRegistry.registerCustomComponent("mf:break_workbench", new MfBreakWorkbench());
	e.blockComponentRegistry.registerCustomComponent("mf:stacked_log", new MfStackedLog());
	e.blockComponentRegistry.registerCustomComponent("mf:box_item", new MfBoxItem());
	e.blockComponentRegistry.registerCustomComponent("mf:drawer_0", new MfDrawer0());
	e.blockComponentRegistry.registerCustomComponent("mf:drawer_1", new MfDrawer1());
	e.blockComponentRegistry.registerCustomComponent("mf:top_easel", new MfTopEasel());
	e.blockComponentRegistry.registerCustomComponent("mf:remove_top", new MfRemoveBlockTop());
	e.blockComponentRegistry.registerCustomComponent("mf:pillar", new MfPillar());
	e.blockComponentRegistry.registerCustomComponent("mf:smokestack", new MfSmokestack());
	e.blockComponentRegistry.registerCustomComponent("mf:smokestack_tick", new MfSmokestackTick());
	e.blockComponentRegistry.registerCustomComponent("mf:beer_barrel", new MfBeerBarrel());
	e.blockComponentRegistry.registerCustomComponent("mf:fill_beer", new MfFillBeer());
	e.blockComponentRegistry.registerCustomComponent("mf:beer_mug", new MfBeerMug());
	e.blockComponentRegistry.registerCustomComponent("mf:bucket_fill", new MfBucketFill());
	e.blockComponentRegistry.registerCustomComponent("mf:gramophone", new MfGramophone());
	e.blockComponentRegistry.registerCustomComponent("mf:scarecrow", new MfScarecrow());
	e.blockComponentRegistry.registerCustomComponent("mf:scarecrow_destroy", new MfScarecrowDestroy());
	e.blockComponentRegistry.registerCustomComponent("mf:book", new MfBook());
	e.blockComponentRegistry.registerCustomComponent("mf:stick_post", new MfStickPost());
	e.blockComponentRegistry.registerCustomComponent("mf:window_table", new MfWindowTable());
	e.blockComponentRegistry.registerCustomComponent("mf:normal_table", new MfNormalTable());
	e.blockComponentRegistry.registerCustomComponent("mf:simple_rotation", new MfSimpleRotation());
	e.blockComponentRegistry.registerCustomComponent("mf:item_table", new MfItemTable());
	e.blockComponentRegistry.registerCustomComponent("mf:bridge_detection", new MfBridge());
	e.blockComponentRegistry.registerCustomComponent("mf:pendulum_clock", new MfPendulumClock());
	e.blockComponentRegistry.registerCustomComponent("mf:top_block_destroy", new MfTopBlockDestroy());
	e.blockComponentRegistry.registerCustomComponent("mf:brazier", new MfBrazier());
	e.blockComponentRegistry.registerCustomComponent("mf:set_on_fire", new MfSetOnFire());
	e.blockComponentRegistry.registerCustomComponent("mf:carpet_connection", new MfCarpetConnection());
	e.blockComponentRegistry.registerCustomComponent("mf:cookie_jar", new MfCookieJar());
	e.blockComponentRegistry.registerCustomComponent("mf:big_barrel", new MfBigBarrel());
	e.blockComponentRegistry.registerCustomComponent("mf:destroy_large_barrel", new MfLargeBarrelDestroy());
	e.blockComponentRegistry.registerCustomComponent("mf:tall_window", new MfTallWindow());
	e.blockComponentRegistry.registerCustomComponent("mf:tall_window_top", new MfTallWindowTop());
	e.blockComponentRegistry.registerCustomComponent("mf:toilet", new MfToilet());
	e.blockComponentRegistry.registerCustomComponent("mf:wooden_stairs", new MfWoodenStairs());
	e.blockComponentRegistry.registerCustomComponent("mf:saddle_stand", new MfSaddleStand());
	e.blockComponentRegistry.registerCustomComponent("mf:triple_saddle_stand", new MfTripleSaddleStand());
	e.blockComponentRegistry.registerCustomComponent("mf:triple_saddle_stand_top", new MfTripleSaddleStandTop());
	e.blockComponentRegistry.registerCustomComponent("mf:globe", new MfGlobe());
	e.blockComponentRegistry.registerCustomComponent("mf:globe_timer", new MfGlobeTimer());
	e.blockComponentRegistry.registerCustomComponent("mf:hourglass", new MfHourglass());
	e.blockComponentRegistry.registerCustomComponent("mf:hourglass_timer", new MfHourglassTimer());
	e.blockComponentRegistry.registerCustomComponent("mf:scroll", new MfScroll());
	e.blockComponentRegistry.registerCustomComponent("mf:fish_drying", new MfFishDrying());
	e.blockComponentRegistry.registerCustomComponent("mf:support_connection", new MfSupportConnection());
//	e.blockComponentRegistry.registerCustomComponent("mf:mailbox", new MfMailbox());
	e.blockComponentRegistry.registerCustomComponent("mf:flower_stand", new MfFlowerStand());
	e.blockComponentRegistry.registerCustomComponent("mf:bowl", new MfBowl());
	e.blockComponentRegistry.registerCustomComponent("mf:weapon_stand", new MfWeaponStand());
	e.blockComponentRegistry.registerCustomComponent("mf:weapon_stand_side", new MfWeaponStandSide());
	e.blockComponentRegistry.registerCustomComponent("mf:iron_throne", new MfIronThrone());
	e.blockComponentRegistry.registerCustomComponent("mf:iron_throne_destroy", new MfIronThroneDestroy());
	e.blockComponentRegistry.registerCustomComponent("mf:wooden_chandelier", new MfWoodenChandelier());
	e.blockComponentRegistry.registerCustomComponent("mf:hanging_chandelier", new MfHangingChandelier());
	e.blockComponentRegistry.registerCustomComponent("mf:post_streetlight", new MfPostStreetlight());
	e.blockComponentRegistry.registerCustomComponent("mf:streetlight", new MfStreetlight());
	e.blockComponentRegistry.registerCustomComponent("mf:dye_pot", new MfDyePot());
	e.blockComponentRegistry.registerCustomComponent("mf:sign", new MfSign());
	e.blockComponentRegistry.registerCustomComponent("mf:sofa", new MfSofa());
	e.blockComponentRegistry.registerCustomComponent("mf:cupboard", new MfCupboard());
	e.blockComponentRegistry.registerCustomComponent("mf:cabinet_tall", new MfCabinetTall());
	e.blockComponentRegistry.registerCustomComponent("mf:cabinet_tall_top", new MfCabinetTallTop());
	e.blockComponentRegistry.registerCustomComponent("mf:fence_gate", new MfFenceGate());
	e.blockComponentRegistry.registerCustomComponent("mf:fence_gate_connection", new MfFenceGateConnection());
	e.blockComponentRegistry.registerCustomComponent("mf:bookshelf_connection", new MfBookshelfConnection());
	e.blockComponentRegistry.registerCustomComponent("mf:bed_connection", new MfBedConnection());
	e.blockComponentRegistry.registerCustomComponent("mf:bed_bot_destroy", new MfBedBotDestroy());
	e.blockComponentRegistry.registerCustomComponent("mf:basket", new MfBasket());
	e.blockComponentRegistry.registerCustomComponent("mf:stove", new MfStove());
	e.blockComponentRegistry.registerCustomComponent("mf:stove_timer", new MfStoveTimer());
	e.blockComponentRegistry.registerCustomComponent("mf:stove_destroy", new MfStoveDestroy());
	e.itemComponentRegistry.registerCustomComponent("mf:item_break_block", new MfItemBreakBlock());
	e.itemComponentRegistry.registerCustomComponent("mf:beer_effects", new MfBeerEffects());
});
world.afterEvents.projectileHitBlock.subscribe((e) => {
	const block = e.getBlockHit().block;
	if (block.typeId === "medieval:cookie_jar_0") {
		const quantity = block.permutation.getState("medieval:quantity");
		e.source.runCommandAsync(`setblock ${block.location.x} ${block.location.y} ${block.location.z} air destroy`);
		e.dimension.spawnItem(new ItemStack("minecraft:cookie", quantity), block.center());
	}
});
function UpdateBlockConnection(block) {
	const states = block.permutation.getAllStates();
	let prefix = "";
	if (!block.typeId.includes("fence") && !block.typeId.includes("hedge") && !block.typeId.includes("bars_0")) return;
	for (const stateName in states) {
		if (stateName.includes(":n") || stateName.includes(":s") || stateName.includes(":w") || stateName.includes(":e")) {
			prefix = stateName.split(":")[0];
			break;
		}
	}
	if (!prefix) return;
	for (const direction in directions) {
		const offset = directions[direction];
		const adjacentBlock = block.offset(offset);
		const shouldConnect = shouldBlockConnect(adjacentBlock);
		const stateName = `${prefix}:${direction[0]}`;

		if (stateName in states) {
			block.setPermutation(block.permutation.withState(stateName, shouldConnect ? 1 : 0));
		}
	}
}
function updateAdjacentBlocksIfNeeded(block) {
	try {
		for (const direction in directions) {
			const offset = directions[direction];
			const adjacentBlock = block.offset(offset);
			UpdateBlockConnection(adjacentBlock);
		}
	} catch (error) {}
}
world.afterEvents.playerPlaceBlock.subscribe((e) => {
	const { block } = e;
	updateAdjacentBlocksIfNeeded(block);
});
world.afterEvents.playerBreakBlock.subscribe((e) => {
	const { block } = e;
	updateAdjacentBlocksIfNeeded(block);
});
world.afterEvents.blockExplode.subscribe((e) => {
	const { block } = e;
	updateAdjacentBlocksIfNeeded(block);
});
class MfBlockConnection {
	onPlace(e) {
		const { block } = e;
		UpdateBlockConnection(block);
		updateAdjacentBlocksIfNeeded(block);
	}
}
function shouldBlockConnect(block) {
	return block.hasTag("is_solid") || block.hasTag("block_conection") ||
		(solidBlocks.some(connect => block.typeId.includes(connect)) &&
		!blockException.some(exception => block.typeId.includes(exception)) &&
		block.typeId.includes("minecraft:"));
}