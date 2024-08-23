import { world, ItemStack, ItemEnchantableComponent, EnchantmentTypes, system} from '@minecraft/server';
import { ModalFormData } from '@minecraft/server-ui';
import { MailBoxes } from './utils/mail.js';
import { Boxes } from './utils/box.js';

const data = new MailBoxes("endxMailboxes");
const dataBox = new Boxes("endxBoxes");

let validIds = [
	"mb:acacia_mailbox",
	"mb:birch_mailbox",
	"mb:cherry_mailbox",
	"mb:crimson_mailbox",
	"mb:dark_oak_mailbox",
	"mb:jungle_mailbox",
	"mb:mangrove_mailbox",
	"mb:oak_mailbox",
	"mb:spruce_mailbox",
	"mb:warped_mailbox",
	"mb:acacia_mail_box",
	"mb:birch_mail_box",
	"mb:cherry_mail_box",
	"mb:crimson_mail_box",
	"mb:dark_oak_mail_box",
	"mb:jungle_mail_box",
	"mb:mangrove_mail_box",
	"mb:oak_mail_box",
	"mb:spruce_mail_box",
	"mb:warped_mail_box",

	"medieval:acacia_mailbox_0",
	"medieval:bamboo_mailbox_0",
	"medieval:birch_mailbox_0",
	"medieval:cherry_mailbox_0",
	"medieval:crimson_mailbox_0",
	"medieval:jungle_mailbox_0",
	"medieval:mangrove_mailbox_0",
	"medieval:oak_mailbox_0",
	"medieval:dark_oak_mailbox_0",
	"medieval:spruce_mailbox_0",
	"medieval:warped_mailbox_0",

	"mr:stripped_acacia_mail_mr",
	"mr:stripped_bamboo_mail_mr",
	"mr:stripped_birch_mail_mr",
	"mr:stripped_cherry_mail_mr",
	"mr:stripped_crimson_mail_mr",
	"mr:stripped_jungle_mail_mr",
	"mr:stripped_mangrove_mail_mr",
	"mr:stripped_oak_mail_mr",
	"mr:stripped_darkoak_mail_mr",
	"mr:stripped_spruce_mail_mr",
	"mr:stripped_warped_mail_mr",
	
	"mr:wood_acacia_mail_mr",
	"mr:wood_bamboo_mail_mr",
	"mr:wood_birch_mail_mr",
	"mr:wood_cherry_mail_mr",
	"mr:wood_crimson_mail_mr",
	"mr:wood_jungle_mail_mr",
	"mr:wood_mangrove_mail_mr",
	"mr:wood_oak_mail_mr",
	"mr:wood_darkoak_mail_mr",
	"mr:wood_spruce_mail_mr",
	"mr:wood_warped_mail_mr"
];
world.afterEvents.playerPlaceBlock.subscribe((e) => {
	const player = e.player;
	const block = e.block;
	
	if (!validIds.includes(block.typeId)) return;
	CreateMenu(block, player);
});

function validateMailboxName(name, player, x, y, z) {
	if (name === '') {
		player.sendMessage({ translate: 'form.mailbox_whitout_name'});
		player.playSound("random.break");
		player.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`);
		return false;
	}
	if (data.mailboxExists(name)) {
		player.sendMessage({ translate: 'form.mailbox_exists'});
		player.playSound("random.break");
		player.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`);
		return false;
	}
	return true;
}

function CreateMenu(block, player) {
	const { x, y, z } = block;
	const coordinates = { x, y, z };
	const dimension = player.dimension.id;
	const CreateForm = new ModalFormData().title({translate: 'form.title.create_mailbox'}).textField({translate: 'form.text.create_mailbox_name'}, {translate: 'form.text.create_mailbox_name'})
	CreateForm.show(player).then(formData => {
		if(formData.canceled){
			player.sendMessage({ translate: 'form.mailbox_not_created'});
			player.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`);
			player.playSound('random.break');
			return;
		}
		const [name] = formData.formValues;
		const mailboxName = `${player.name} - ${name}`;
		if (!validateMailboxName(mailboxName, player, x, y, z)) {
			return;
		}
		player.playSound('random.levelup');
		let containerMailbox = player.dimension.spawnEntity("mb:mailbox_container", { x:x+0.5, y:y+0.5, z:z+0.5});
		containerMailbox.nameTag = "mb.mailbox";
		data.createMailbox(mailboxName, player.name, coordinates, dimension);
		player.sendMessage({ translate: 'form.mailbox_created', with: [`${name}`]});
	})
	.catch((error) => {
		player.sendMessage({translate: 'form.error_show_form'});
		player.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`);
		player.playSound('random.break');
		const allMailboxes = data.getAllMailboxes();
		const mailboxIndex = allMailboxes.findIndex(mailbox => JSON.stringify(mailbox.coordinates) === JSON.stringify(coordinates));
		if (mailboxIndex !== -1) {
			data.removeMailbox(allMailboxes[mailboxIndex].name);
		}
		return -1;
	});
}


world.beforeEvents.playerBreakBlock.subscribe((e) => {
	const player = e.player;
	const block = e.block;
	if (!validIds.includes(block.typeId)) return;
	const { x, y, z } = block;
	const coordinates = { x, y, z };
	const allMailboxes = data.getAllMailboxes();
	const mailboxIndex = allMailboxes.findIndex(mailbox => JSON.stringify(mailbox.coordinates) === JSON.stringify(coordinates));
	
	if (mailboxIndex !== -1) {
		const mailboxPlayerOwner = allMailboxes[mailboxIndex].owner;
		if (!((mailboxPlayerOwner === player.name) || (player.getGameMode() === "creative") || player.hasTag("mailboxop"))) {
			e.cancel = true;
			return;
		}
	
		data.removeMailbox(allMailboxes[mailboxIndex].name);
	}
});
world.afterEvents.playerInteractWithEntity.subscribe((e) => {
	const player = e.player;
	const item = e.itemStack;
	const target = e.target;
	if(!item) return;
	if(!(item.typeId === "mb:box_item" && target.typeId === "mb:postbox_container")) return;
	SendMenu(player, target);
});
function SendMenu(player, target) {
	const listMailboxes = data.getMailboxesByDimension(player.dimension.id);
	if (listMailboxes.length === 0) {
		player.sendMessage({translate: 'form.no_mailboxes_dimension'});
		player.playSound('random.break');
		return;
	}
	const sendItemsInventory = target.getComponent("inventory").container;
	let inventoryItems = [];
	let hasBox = false;

	for(let slot = 0; slot < sendItemsInventory.size; slot++){
		let item = sendItemsInventory.getItem(slot);
		if(item){
			inventoryItems.push(item);
			if(item.typeId === "mb:box_full"){
				hasBox = true;
			}
			if(item.typeId === "minecraft:writable_book" || item.typeId.includes("_shulker_box")){
				player.sendMessage({translate: 'form.restricted_item'});
				player.playSound('random.break');
				return;
			}
		}
	}
	if(inventoryItems.length === 0){
		player.sendMessage({ translate: 'form.empty_package'});
		player.playSound('random.break');
		return;
	}
	if(hasBox){
		player.sendMessage({ translate: 'form.has_box'});
		player.playSound('random.break');
		return;
	}
	listMailboxes.sort((a, b) => a.name.localeCompare(b.name));

	const sendItemsForm = new ModalFormData()
	.title({translate: 'form.title.send_box'})
	.dropdown({ translate: 'form.selection.send_box'}, listMailboxes.map(mailbox => mailbox.name), 0);

	sendItemsForm.show(player).then(formData => {
		if(formData.canceled){
			player.sendMessage({ translate: 'form.shipment_cancelled'});
			player.playSound('random.break');
			return;
		}
		const [selection] = formData.formValues;
		const selectedMailbox = listMailboxes[selection];
		const { x, y, z } = selectedMailbox.coordinates;
		const newBoxItem = new ItemStack("mb:box_full", 1);
		
		let loreList = [];
		let itemList = [];
		let boxId = Math.floor(Math.random() * 10000);;
		loreList.push(`§bid: ${boxId}`);
		for(let slot = 0; slot < sendItemsInventory.size; slot++){
			let itemData = sendItemsInventory.getItem(slot);
			if(!itemData) continue;
			let id = itemData.typeId || '';
			let name = itemData.nameTag || '';
			let amount = itemData.amount || 0;
			let durability = itemData.hasComponent("durability") ? itemData.getComponent("durability").damage : 0;
			let lore = itemData.getLore().length > 0 ? itemData.getLore() : [];
			let enchantmentsList = itemData.hasComponent(ItemEnchantableComponent.componentId) ? itemData.getComponent(ItemEnchantableComponent.componentId).getEnchantments() : [];
			let newItem = dataBox.setItem(id, name, amount, durability, lore, enchantmentsList);

			let itemName = id.split(':')[1];
			itemName = itemName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
			itemName = `§7${itemName} x${amount}`;
			loreList.push(itemName);
			itemList.push(newItem);
		}
		dataBox.setBox(boxId, itemList);
		newBoxItem.setLore(loreList);
		sendItemsInventory.clearAll();
		const playerInventory = player.getComponent("inventory").container;
		let selectedSlot = player.selectedSlotIndex;
		let itemHolding = playerInventory.getItem(selectedSlot);
		if (itemHolding.amount > 1) {
			playerInventory.setItem(selectedSlot, new ItemStack(itemHolding.typeId, itemHolding.amount - 1));
		} else {
			playerInventory.moveItem(selectedSlot, 0, sendItemsInventory);
		}
		sendItemsInventory.clearAll();
		sendItemsInventory.addItem(newBoxItem);

		let oldLocation = target.location;
		let newLocation = {x:x+0.5, y:y+0.5, z:z+0.5};
		target.teleport(newLocation);
		target.triggerEvent("mb:sensor");
		let newPostBox = player.dimension.spawnEntity("mb:postbox_container", oldLocation);
		newPostBox.nameTag = "post_box";
		player.sendMessage({ translate: 'form.box_sent', with: [`${selectedMailbox.name}`]});
		player.playSound('random.levelup');
	})
	.catch((error) => {
		player.sendMessage({ translate: 'form.problem_shipment'});
		player.playSound('random.break');
		return -1;
	});
}

function createItemFromData(itemData) {
	if (!itemData.id || itemData.amount === 0) return null;
	const itemFromBox = new ItemStack(itemData.id, parseInt(itemData.amount));
	if (itemData.name) itemFromBox.nameTag = itemData.name;
	if (itemData.durability > 0) itemFromBox.getComponent("durability").damage = itemData.durability;
	if (itemData.lore) itemFromBox.setLore(itemData.lore);
	if (itemData.enchantmentsList) {
		for (let enchantment of itemData.enchantmentsList) {
			itemFromBox.getComponent(ItemEnchantableComponent.componentId).addEnchantment({type:EnchantmentTypes.get(enchantment.type.id), level:enchantment.level});
		}
	}
	return itemFromBox;
}

world.afterEvents.itemUse.subscribe((e) => {
	const player = e.source;
	const item = e.itemStack;
	/*if (item.typeId === "minecraft:iron_sword") {
		let vartemp = world.getDynamicPropertyTotalByteCount();
		player.sendMessage(`BYTES: ${vartemp}`);
	}*/
	if (item.typeId === "mb:box_full" && item.getLore().length > 0) {
		const lore = item.getLore()[0];
		const match = lore.match(/§bid:\s*(\d+)/);
		const boxId = match ? parseInt(match[1]) : null;
		if (!boxId) {
			player.sendMessage({ translate: 'form.box_already_used'});
			return;
		}
		const box = dataBox.getBoxById(boxId);
		if (!box) {
			player.sendMessage({ translate: 'form.box_already_used'});
			return;
		}
		for (let i = 0; i < box.itemList.length; i++) {
			let itemFromBox = createItemFromData(box.itemList[i]);
			if (itemFromBox) {
				player.dimension.spawnItem(itemFromBox, player.location);
			}
		}
		dataBox.openBox(boxId);
	}
});
