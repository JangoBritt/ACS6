export class MrMailBox {
	beforeOnPlayerPlace(e) {
		const { player, block, dimension } = e;
		const container = dimension.spawnEntity("mr:container_mr", block.center());
		container.nameTag = "mail_box";
		container.triggerEvent("mr:inventory_mail");
		let tameable = container.getComponent("tameable");
		if (tameable) {
			tameable.tame(player);
		}
	}
}