import { airBlocks } from '../util/globalVariables';

export class MfSmokestackTick {
	onTick(e) {
		const { block, dimension } = e;
		if (airBlocks.includes(block.above().typeId)) dimension.spawnParticle("medieval:particle_smoke", {x:block.x + 0.5, y: block.y + 1.2, z: block.z + 0.5});
	}
}
export class MfSmokestack {
	onPlace(e) {
		const { block } = e;
		const botBlock = block.below();
		UpdateSmokestack(block);
		if (botBlock.hasTag("mf.smokestack")) UpdateSmokestack(botBlock);
	}
	onPlayerDestroy(e) {
		const { block } = e;
		const botBlock = block.below();
		if (botBlock.hasTag("mf.smokestack")) UpdateSmokestack(botBlock);
	}
}
function UpdateSmokestack(block) {
	const topBlock = block.above();
	const topHasTag = topBlock.hasTag("mf.smokestack");
	const state = topHasTag ? 1 : 0;
	block.setPermutation(block.permutation.withState("medieval:state", state));
}