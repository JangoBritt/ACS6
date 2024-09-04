import { toggleBlockState } from '../util/utils';
import { sitOnOldChair } from './Util';

export class MfToilet {
	onPlayerInteract(e) {
		const { player } = e;
		if (player.isSneaking) {
			sitOnOldChair(e, 0.4);
		} else {
			toggleBlockState(e, "medieval:open", "block.barrel.close", "block.barrel.open");
		}
	}
}