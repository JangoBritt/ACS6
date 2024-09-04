import { toggleBlockState } from '../util/utils';

export class MfCupboard {
	beforeOnPlayerPlace(e) {
		const { block, dimension } = e;
		dimension.spawnEntity("medieval:drawer_container", block.center());
	}
	onPlayerInteract(e) {
		toggleBlockState(e, "medieval:close", "block.barrel.close", "block.barrel.open");
	}
}