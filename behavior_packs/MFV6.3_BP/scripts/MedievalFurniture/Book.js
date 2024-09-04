export class MfBook {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const quantity = block.permutation.getState("medieval:status");
		if (item?.typeId === block.typeId) {
			if (quantity < 5) {
				block.setPermutation(block.permutation.withState("medieval:status", quantity + 1));
			} else if (quantity === 5) {
				block.setPermutation(block.permutation.withState("medieval:status", 1));
			}
			dimension.playSound("block.itemframe.add_item", block.center());
		}
	}
}