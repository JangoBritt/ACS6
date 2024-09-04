import { handleSitOnNewFurniture, toggleBlockState } from '../util/utils';

export class MfToggleFurnitureBlock {
	onPlayerInteract(e) {
		toggleBlockState(e, "medieval:close", "block.barrel.close", "block.barrel.open");
	}
}
export class MfBasicContainer {
	beforeOnPlayerPlace(e) {
		const { block, dimension } = e;
		dimension.spawnEntity("medieval:drawer_container", block.center());
	}
}
export class MfSitOnChair {
	onPlayerInteract(e) {
		handleSitOnNewFurniture(e, "medieval:sit_bench", 0.4);
	}
}