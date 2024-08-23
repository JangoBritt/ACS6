import { handleSitOnFurniture } from '../util/utils';

export class MrSit {
	onPlayerInteract(e) {
		handleSitOnFurniture(e, "mr:chair_entity", 0.5);
	}
}