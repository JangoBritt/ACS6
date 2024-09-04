export class MfSign {
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		const itemState = block.permutation.getState("medieval:item");
		const allowedItems = ['minecraft:apple','minecraft:wheat','minecraft:beetroot','minecraft:potato','minecraft:carrot','minecraft:potion','medieval:beer_mug_fill_item','minecraft:iron_chestplate','minecraft:iron_sword','minecraft:cooked_beef','minecraft:book','minecraft:cod','minecraft:bow'];
		if ( itemState < 2 && player.isSneaking ) {
			block.setPermutation(block.permutation.withState("medieval:item", itemState + 1));
			dimension.playSound("block.itemframe.add_item", block.center());
		} else if ( itemState === 2  && player.isSneaking ) {
			block.setPermutation(block.permutation.withState("medieval:item", 0));
			dimension.playSound("block.itemframe.add_item", block.center());
		}
		if (allowedItems.includes(item?.typeId) && allowedItems[itemState - 3] !== item?.typeId) {
			block.setPermutation(block.permutation.withState("medieval:item", allowedItems.indexOf(item.typeId) + 3));
			dimension.playSound("block.itemframe.add_item", block.center());
		}
		if (player.isSneaking && itemState > 2) {
			block.setPermutation(block.permutation.withState("medieval:item", 0));
			dimension.playSound("block.itemframe.remove_item", block.center());
		}
	}
	onPlace(e) {
		UpdateSign(e.block);
		UpdateAdjacentSigns(e.block);
	}
	onPlayerDestroy(e) {
		UpdateAdjacentSigns(e.block);
	}
}
function UpdateSign(block) {
	if (block.above().hasTag("mf.sign")) block.setPermutation(block.permutation.withState("medieval:top", 1));
	else block.setPermutation(block.permutation.withState("medieval:top", 0));
}
function UpdateAdjacentSigns(block) {
	if (block.above().hasTag("mf.sign")) UpdateSign(block.above());
	if (block.below().hasTag("mf.sign")) UpdateSign(block.below());
}