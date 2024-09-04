export class MfDrawer1 {
	onPlayerInteract(e) {
		OpenDrawer(e, 4);
	}
}
export class MfDrawer0 {
	onPlayerInteract(e) {
		OpenDrawer(e, 5);
	}
}
function OpenDrawer(e, maxValue) {
	const { block, dimension } = e;
	const openState = block.permutation.getState("medieval:open");
	if (openState < maxValue) {
		block.setPermutation(block.permutation.withState("medieval:open", openState + 1));
		dimension.playSound("block.barrel.open", block.center());
	} else {
		block.setPermutation(block.permutation.withState("medieval:open", 1));
		dimension.playSound("block.barrel.close", block.center());
	}
}