import { ItemStack } from '@minecraft/server';
import { itemApplyDamage, addItemOrSpawn, decrementItemInHand, isCreative, simpleToggleBlockState, breakBlockWithItems } from '../util/utils';

const allowedItems = ['minecraft:dandelion', 'minecraft:blue_orchid', 'minecraft:lily_of_the_valley', 'minecraft:oxeye_daisy', 'minecraft:poppy', 'minecraft:orange_tulip', 'minecraft:pink_tulip', 'minecraft:red_tulip', 'minecraft:white_tulip', 'minecraft:cornflower', 'minecraft:azure_bluet', 'minecraft:cactus', 'minecraft:bamboo', 'minecraft:flowering_azalea', 'minecraft:azalea'];
export class MfFlowerStand {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const flowerState = block.permutation.getState("medieval:state");
		const isAllowedItem = allowedItems.includes(item?.typeId);
		const playSoundAndUpdateBlock = (state, sound) => {
			block.setPermutation(block.permutation.withState("medieval:state", state));
			dimension.playSound(sound, block.center());
		};
		if (flowerState === 0 && isAllowedItem) {
			playSoundAndUpdateBlock(allowedItems.indexOf(item.typeId) + 1, "item.bone_meal.use");
			if (!isCreative(player)) decrementItemInHand(player);
		}
		if (flowerState > 0) {
			if (isAllowedItem) {
				if (item?.typeId !== allowedItems[flowerState - 1]) {
					playSoundAndUpdateBlock(allowedItems.indexOf(item.typeId) + 1, "item.bone_meal.use");
					if (!isCreative(player)) {
						addItemOrSpawn(player, new ItemStack(allowedItems[flowerState - 1], 1));
						decrementItemInHand(player);
					}
				}
			} else if (item?.typeId === "minecraft:shears") {
				playSoundAndUpdateBlock(0, "mob.sheep.shear");
				itemApplyDamage(player, item);
				if (!isCreative(player)) addItemOrSpawn(player, new ItemStack(allowedItems[flowerState - 1], 1));
			}
		}
		if (item?.typeId === "medieval:handsaw") {
			simpleToggleBlockState(block, "medieval:top");
			itemApplyDamage(player, item);
			dimension.playSound("dig.wood", block.center());
			const center = block.center();
			[{ x: 0, y: 0, z: 0 }, { x: 0, y: 0.5, z: 0 }].forEach(offset => {
				dimension.spawnParticle("minecraft:endrod", {
					x: center.x + offset.x,
					y: center.y + offset.y,
					z: center.z + offset.z
				});
			});
		}
	}
	onPlayerDestroy(e) {
		const { player, block, destroyedBlockPermutation } = e;
		const flowerState = destroyedBlockPermutation.getState("medieval:state");
		breakBlockWithItems(player, block, allowedItems, flowerState);
	}
}