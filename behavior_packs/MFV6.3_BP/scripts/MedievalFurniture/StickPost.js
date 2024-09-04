export class MfStickPost {
	beforeOnPlayerPlace(e) {
		const { player } = e;
		const y = player.getRotation().y;
		const directions = [0, 5, 7, 3, 1, 4, 6, 2];
		const direction = Math.floor((y + 180 + 22.5) / 45) % 8;
		e.permutationToPlace = e.permutationToPlace.withState('medieval:facing_direction', directions[direction]);
	}
}