import { ItemStack, BlockPermutation, system } from "@minecraft/server";
import { frontBlockLocation, backBlockLocation, airBlocks } from '../util/globalVariables';

export class MrDivingBoardBreak {
	onPlayerDestroy(e) {
		const { block, destroyedBlockPermutation, dimension } = e;
		const direction = destroyedBlockPermutation.getState("minecraft:cardinal_direction");
		const frontBlock = block.offset(frontBlockLocation[direction]);
		frontBlock.setPermutation(BlockPermutation.resolve("minecraft:air"));
		dimension.spawnItem(new ItemStack("mr:diving_board_item", 1), block.center());
	}
}
export class MrDivingBoard {
	beforeOnPlayerPlace(e) {
		const { block, permutationToPlace } = e;
		const direction = permutationToPlace.getState("minecraft:cardinal_direction");
		const backBlock = block.offset(backBlockLocation[direction]);
		if (airBlocks.includes(backBlock.typeId)) {
			backBlock.setPermutation(BlockPermutation.resolve("mr:board_controller_mr", { "minecraft:cardinal_direction": direction}));
		} else { e.cancel = true; }
	}
}
export class MrBounceBoard {
	onEntityFallOn(e) {
		bounce(e, "mr.diving_bounce");
	}
}
export class MrBounce {
	onEntityFallOn(e) {
		bounce(e, "mr.bounce");
	}
}
function bounce(e, sound) {
	const { entity, fallDistance, dimension } = e;
	try {
		if (!entity.isSneaking) {
			const maxFallDistance = 10;
			let maxKnockback = 1.5;
			const minKnockback = 0.5;
			if (entity.typeId === "minecraft:player" && entity.isJumping) {
				maxKnockback = 1.7;
			}
			dimension.playSound(sound, entity.location);
			const knockback = Math.min(minKnockback + ((fallDistance / maxFallDistance) * (maxKnockback - minKnockback)), maxKnockback);
			entity.applyKnockback(0, 0, 0, knockback);
			const delay = Math.floor((knockback / 1) * 20);
			system.runTimeout(() => {
				entity.addEffect("resistance", 10, { amplifier: 4, showParticles: false });
			}, delay);
		}
	} catch (error) {}
}