export class MfMailbox {
	beforeOnPlayerPlace(e) {
		const { player, block, dimension } = e;
		const container = dimension.spawnEntity("medieval:mailbox_0", block.center());
		container.getComponent("tameable").tame(player);
		container.nameTag = "Mailbox";
	}
}