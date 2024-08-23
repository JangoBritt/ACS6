import { decrementItemInHand, isCreative } from '../util/utils';

export class MrGrill {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const blockLocation = block.center();
		const inventory = player.getComponent("inventory").container;
		const item = inventory.getItem(player.selectedSlotIndex);
		const allowedFood = [
			'minecraft:beef', 
			'minecraft:chicken', 
			'minecraft:kelp', 
			'minecraft:cod', 
			'minecraft:salmon', 
			'minecraft:mutton', 
			'minecraft:porkchop', 
			'minecraft:potato', 
			'minecraft:rabbit'
		];

		if (!allowedFood.includes(item?.typeId)) return;
		const foodStates = ["mr:food_0", "mr:food_1", "mr:food_2", "mr:food_3"];
		const spawnOffsets = [
			{x: 0.2, y: 0.4, z: 0.2},
			{x: -0.2, y: 0.4, z: 0.2},
			{x: 0.2, y: 0.4, z: -0.2},
			{x: -0.2, y: 0.4, z: -0.2}
		];
		for (let i = 0; i < foodStates.length; i++) {
			if (block.permutation.getState(foodStates[i]) === 0) {
				block.setPermutation(block.permutation.withState(foodStates[i], 1));
				let foodEntity = dimension.spawnEntity("mr:food_mr", {
					x: blockLocation.x + spawnOffsets[i].x,
					y: blockLocation.y + spawnOffsets[i].y,
					z: blockLocation.z + spawnOffsets[i].z
				});
				foodEntity.triggerEvent(item.typeId);
				foodEntity.setDynamicProperty("grill_state", foodStates[i]);
				const invertedYRotation = (player.getRotation().y + 180) % 360;
				foodEntity.setRotation({ x: 0, y: invertedYRotation });
				dimension.playSound("block.itemframe.add_item", blockLocation);
				if (!isCreative(player)) decrementItemInHand(player);
				break;
			}
		}
	}
}