export class MfPillar {
	onPlace(e) {
		const { block } = e;
		UpdatePillar(block);
		if (block.above().hasTag("mf.pillar")) UpdatePillar(block.above());
		if (block.below().hasTag("mf.pillar")) UpdatePillar(block.below());
	}
	onPlayerDestroy(e) {
		const { block } = e;
		if (block.above().hasTag("mf.pillar")) UpdatePillar(block.above());
		if (block.below().hasTag("mf.pillar")) UpdatePillar(block.below());
	}
}
function UpdatePillar(block) {
	const topHasTag = block.above().hasTag("mf.pillar");
	const botHasTag = block.below().hasTag("mf.pillar");
	const state = topHasTag && botHasTag ? 3 : topHasTag && !botHasTag ? 1 : !topHasTag && botHasTag ? 2 : 0;
	block.setPermutation(block.permutation.withState("endx:state", state));
}