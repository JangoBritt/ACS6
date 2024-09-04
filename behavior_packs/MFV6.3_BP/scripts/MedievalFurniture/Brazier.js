export class MfSetOnFire {
	onStepOn(e) {
		const { entity } = e;
		entity.setOnFire(10, true);
	}
}
export class MfBrazier {
	onPlace(e) {
		const { block } = e;
		UpdateBrazier(block);
		if (block.above().hasTag("brazier")) UpdateBrazier(block.above());
		if (block.below().hasTag("brazier")) UpdateBrazier(block.below());
	}
	onPlayerDestroy(e) {
		const { block } = e;
		if (block.above().hasTag("brazier")) UpdateBrazier(block.above());
		if (block.below().hasTag("brazier")) UpdateBrazier(block.below());
	}
}
function UpdateBrazier(block) {
	const topHasTag = block.above().hasTag("brazier");
	const botHasTag = block.below().hasTag("brazier");
	const state = topHasTag && botHasTag ? 2 : topHasTag && !botHasTag ? 3 : !topHasTag && botHasTag ? 1 : 0;
	block.setPermutation(block.permutation.withState("medieval:state", state));
}