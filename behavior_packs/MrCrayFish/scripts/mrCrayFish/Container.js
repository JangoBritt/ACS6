import { toggleBlockState } from '../util/utils';

export class MrPlaceContainer {
	onPlayerInteract(e) {
		const { block } = e;
		const blockType = block.typeId;
		const mappings = [
			{ key: "_bedside_cabinet_mr", closeEvent: "mr.bedside_cabinet_close", openEvent: "mr.bedside_cabinet_open" },
			{ key: "_cabinet_mr", closeEvent: "mr.cabinet_close", openEvent: "mr.cabinet_open", exclude: ["bedside", "desk"] },
			{ key: "_crate_mr", closeEvent: "mr.cabinet_close", openEvent: "mr.cabinet_open" },
			{ key: "_drawer_mr", closeEvent: "mr.bedside_cabinet_close", openEvent: "mr.bedside_cabinet_open" },
			{ key: "_cooler_mr", closeEvent: "mr.cabinet_close", openEvent: "mr.cabinet_open" },
			{ key: "_desk_cabinet_mr", closeEvent: "mr.bedside_cabinet_close", openEvent: "mr.bedside_cabinet_open" }
		];
		for (const { key, closeEvent, openEvent, exclude } of mappings) {
			if (blockType.includes(key) && (!exclude || !exclude.some(ex => blockType.includes(ex)))) {
				toggleBlockState(e, "mr:close", closeEvent, openEvent);
				break;
			}
		}
	}
	onPlace(e) {
		const { block, dimension } = e;
		const blockType = block.typeId;
		const container = dimension.spawnEntity("mr:container_mr", block.center());

		const mappings = [
			{ key: "_bedside_cabinet_mr", nameTag: "bedside_cabinet", event: "mr:inventory_9" },
			{ key: "_cabinet_mr", nameTag: "cabinet", event: "mr:inventory_18", exclude: ["bedside", "desk"] },
			{ key: "_crate_mr", nameTag: "crate", event: "mr:inventory_27" },
			{ key: "_drawer_mr", nameTag: "drawer", event: "mr:inventory_18" },
			{ key: "_cooler_mr", nameTag: "cooler", event: "mr:inventory_9", adjustY: -0.2 },
			{ key: "_desk_cabinet_mr", nameTag: "desk_cabinet", event: "mr:inventory_9" }
		];
		for (const { key, nameTag, event, exclude, adjustY } of mappings) {
			if (blockType.includes(key) && (!exclude || !exclude.some(ex => blockType.includes(ex)))) {
				if (adjustY) {
					container.teleport({ x: block.center().x, y: block.center().y + adjustY, z: block.center().z });
				}
				container.nameTag = nameTag;
				container.triggerEvent(event);
				break;
			}
		}
	}
}