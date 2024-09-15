import { world, ItemStack, ItemEnchantableComponent } from '@minecraft/server';
import { ModalFormData, ActionFormData } from '@minecraft/server-ui';
import { MailBoxes } from './OldMailbox.js';
import { decrementItemInHand } from '../util/utils.js';
import { MbGuidebook } from './Guidebook.js';
import { MbOpenBox } from './Box.js'

const data = new MailBoxes("endxMailboxes");
const specialItems = ['minecraft:potion', 'minecraft:lingering_potion', 'minecraft:splash_potion', 'minecraft:banner', 'minecraft:skull', 'minecraft:writable_book', 'minecraft:leather_horse_armor'];

function getMailboxes(dimensionId = null) {
	let dimensions = dimensionId ? [dimensionId] : ["overworld", "nether", "the_end"];
	let query = { type: "mb:mailbox_container" };
	const listMailbox = dimensionId ? data.getMailboxesByDimension(dimensionId) : data.getAllMailboxes();
	dimensions.forEach(id => {
		let dimension = world.getDimension(id);
		let entityList = dimension.getEntities(query);

		entityList.forEach((entity) => {
			let test = entity.getDynamicProperty("mbMailbox");
			if (test) {
				const mailbox = JSON.parse(test);
				listMailbox.push(mailbox);
			}
		});
	});
	return listMailbox;
}
world.beforeEvents.worldInitialize.subscribe((e) => {
	e.blockComponentRegistry.registerCustomComponent("mb:post_box", new MbPostBox());
	e.blockComponentRegistry.registerCustomComponent("mb:mailbox", new MbMailBox());
	e.itemComponentRegistry.registerCustomComponent("mb:open_box", new MbOpenBox());
	e.itemComponentRegistry.registerCustomComponent("mb:guidebook", new MbGuidebook());
});
class MailBox {
	constructor(name, owner, coordinates, dimension) {
		this.name = name;
		this.owner = owner;
		this.coordinates = coordinates;
		this.dimension = dimension;
	}
}
class MbMailBox {
	beforeOnPlayerPlace(e) {
		const { block, dimension } = e;
		let mailbox = dimension.spawnEntity("mb:mailbox_container", block.center());
		mailbox.nameTag = "mb.mailbox";
	}
	onPlayerInteract(e) {
		const { player, block, dimension } = e;
		const mailbox = dimension.getEntitiesAtBlockLocation(block.location).find(entity => entity.typeId === "mb:mailbox_container");
		if (mailbox.hasTag("mailbox")) return;
		CreateMenu(block, player, mailbox);
	}
}
function CreateMenu(block, player, mailbox) {
	const coordinates = block.location;
	const dimension = player.dimension.id;
	const CreateForm = new ModalFormData()
	.title({translate: 'form.title.create_mailbox'})
	.textField({translate: 'form.text.create_mailbox_name'}, {translate: 'form.text.create_mailbox_placeholder'})
	.toggle({translate: 'form.create.resctric_to_owner'}, true);
	CreateForm.show(player).then(formData => {
		if(formData.canceled){
			player.sendMessage({ translate: 'form.mailbox_not_created'});
			player.playSound('random.break');
			return;
		}
		const [name, tamed] = formData.formValues;
		let mailboxName = name;
		if (name.length > 25) mailboxName = name.slice(0, 25) + "...";
		const mailboxList = getMailboxes();
		if (!validateMailboxName(mailboxList, player, mailboxName)) return;
		player.playSound('random.levelup');
		mailbox.setDynamicProperty("mbMailbox", JSON.stringify(new MailBox(mailboxName,player.name,coordinates,dimension)));
		mailbox.addTag("mailbox");
		if (tamed) mailbox.getComponent("tameable").tame(player);
		player.sendMessage({ translate: 'form.mailbox_created', with: [`${player.name} - ${mailboxName}`]});
	})
	.catch((error) => {
		player.sendMessage({translate: 'form.error_show_form'});
		player.playSound('random.break');
		return;
	});
}
function validateMailboxName(mailboxList, player, mailboxName) {
	if (mailboxName === '') {
		player.sendMessage({ translate: 'form.mailbox_whitout_name' });
		player.playSound("random.break");
		return false;
	}
	for (let mailbox of mailboxList) {
		if (mailbox.owner === player.name && mailbox.name === mailboxName) {
			player.sendMessage({ translate: 'form.mailbox_exists' });
			player.playSound("random.break");
			return false;
		}
	}
	return true;
}
class MbPostBox {
	onPlace(e) {
		const { block, dimension } = e;
		const postBox = dimension.spawnEntity("mb:postbox_container", block.center());
		postBox.nameTag = "post_box";
	}
	onPlayerInteract(e) {
		const { player, block } = e;
		const item = player.getComponent("inventory").container.getItem(player.selectedSlotIndex);
		if(item?.typeId === "mb:box_item") SendMenu(player, block);
	}
}
class Box {
	constructor(message) {
		this.id = Math.floor(Math.random() * 10001);
		this.itemList = [];
		this.message = message;
	}
	addItem(id, name, amount, durability, lore, enchantmentsList) {
		const newItem = { id, name, amount, durability, lore, enchantmentsList };
		this.itemList.push(newItem);
		return newItem;
	}
}
function SendMenu(player, block) {
	const listMailboxes = getMailboxes(player.dimension.id);
	if (listMailboxes.length === 0) {
		player.sendMessage({translate: 'form.no_mailboxes_dimension'});
		player.playSound('random.break');
		return;
	}
	const target = block.dimension.getEntitiesAtBlockLocation(block.location).find(entity => entity.typeId === "mb:postbox_container");
	if (!target) return;
	const sendItemsInventory = target.getComponent("inventory").container;
	let inventoryItems = [];
	let hasBox = false;
	let hasSpecialItem = false;
	for(let slot = 0; slot < sendItemsInventory.size; slot++){
		let item = sendItemsInventory.getItem(slot);
		if(item){
			inventoryItems.push(item);
			if(item.typeId === "mb:box_full"){
				hasBox = true;
			}
			if(item.typeId.includes("_shulker_box")){
				player.sendMessage({translate: 'form.restricted_item'});
				player.playSound('random.break');
				return;
			}
			if (specialItems.includes(item.typeId)) {
				hasSpecialItem = true;
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
	const uniqueOwners = new Set();
	listMailboxes.forEach(mailbox => uniqueOwners.add(mailbox.owner));
	const ownersArray = Array.from(uniqueOwners);

	const FormListPlayers = new ActionFormData()
		.title({translate: 'form.send_menu.player_list'})
		.body({translate: 'form.send_menu.select_player'});
	ownersArray.forEach(owner => {
		FormListPlayers.button(owner);
	});
	FormListPlayers.show(player).then(response => {
		if (response.canceled) return;
		const selectedOwnerIndex = response.selection;
		const selectedOwner = ownersArray[selectedOwnerIndex];
		const mailboxesByOwner = listMailboxes.filter(mailbox => mailbox.owner === selectedOwner);
		mailboxesByOwner.sort((a, b) => a.name.localeCompare(b.name));
		const sendItemsForm = new ModalFormData()
			.title({ translate: 'form.send_menu.player_mailboxes', with: [`${player.name}`]})
			.dropdown({ translate: 'form.selection.send_box'}, mailboxesByOwner.map(mailbox => mailbox.name), 0)
			.textField({ translate: 'form.send_menu.message_optional'}, { translate: 'form.send_menu.message'})
			.toggle({ translate: 'form.send_menu.hide_items'}, false);
		sendItemsForm.show(player).then(formData => {
			if(formData.canceled){
				player.sendMessage({ translate: 'form.shipment_cancelled'});
				player.playSound('random.break');
				return;
			}
			const [targetOwner, message, hideItems] = formData.formValues;
			const selectedMailbox = mailboxesByOwner[targetOwner];
			const { name, coordinates } = selectedMailbox;
			let mailboxInLocation = player.dimension.getEntitiesAtBlockLocation(coordinates);
			let addToMailbox = undefined;
			for (let mailbox of mailboxInLocation) {
				let property = mailbox.getDynamicProperty("mbMailbox");
				if (property) {
					let properties = JSON.parse(property);
					if (properties.name === name) {
						addToMailbox = mailbox.getComponent("inventory").container;
						break;
					}
				} else {
					let removeMailbox = data.getMailboxByCoordinates(coordinates);
					data.removeMailbox(removeMailbox.name);
					mailbox.setDynamicProperty("mbMailbox", JSON.stringify(new MailBox(removeMailbox.name,removeMailbox.owner,coordinates,removeMailbox.dimension)));
					addToMailbox = mailbox.getComponent("inventory").container;
				}
			}
			if (!addToMailbox) {
				player.sendMessage({ translate: 'form.problem_shipment'});
				return;
			}
			if (addToMailbox.emptySlotsCount === 0) {
				player.sendMessage({ translate: 'form.send_menu.inventory_full'});
				return;
			}
			const newBoxItem = new ItemStack("mb:box_full", 1);
			let box = new Box(message);
			let loreList = [];
			const boxEntity = player.dimension.spawnEntity("mb:box_container", {x: player.location.x, y: 0, z: player.location.z});
			const boxContainer = boxEntity.getComponent("inventory").container;
			boxEntity.nameTag = `Box: ${box.id}`;
			boxEntity.addTag(`${box.id}`);
			for(let slot = 0; slot < sendItemsInventory.size; slot++){
				let itemData = sendItemsInventory.getItem(slot);
				if(!itemData) continue;
				boxContainer.addItem(sendItemsInventory.getItem(slot));
				let id = itemData.typeId || '';
				let name = itemData.nameTag || '';
				let amount = itemData.amount || 0;
				let durability = itemData.hasComponent("durability") ? itemData.getComponent("durability").damage : 0;
				let lore = itemData.getLore().length > 0 ? itemData.getLore() : [];
				let enchantmentsList = itemData.hasComponent(ItemEnchantableComponent.componentId) ? itemData.getComponent(ItemEnchantableComponent.componentId).getEnchantments() : [];
				box.addItem(id, name, amount, durability, lore, enchantmentsList);
				let itemName = id.split(':')[1];
				itemName = itemName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
				itemName = `§7${itemName} x${amount}`;
				if (!hideItems) loreList.push(itemName);
			}
			if (!hasSpecialItem) boxEntity.remove();
			newBoxItem.setDynamicProperty("mbBox", JSON.stringify(box));
			loreList.push(`§bSent by: ${player.name}`);
			newBoxItem.setLore(loreList);
			sendItemsInventory.clearAll();
			decrementItemInHand(player);
			addToMailbox.addItem(newBoxItem);
			player.sendMessage({ translate: 'form.box_sent', with: [`${selectedMailbox.name}`]});
			player.playSound('random.levelup');
		})
		.catch((error) => {
			player.sendMessage({ translate: 'form.problem_shipment'});
			player.playSound('random.break');
			return;
		});
	});
}
world.afterEvents.playerSpawn.subscribe((e) => {
	e.initialSpawn = false;
	if (!e.player.hasTag("mailbox_guidebook")) {
		e.player.getComponent("inventory").container.addItem(new ItemStack("mb:guidebook_mailboxes", 1));
		e.player.addTag("mailbox_guidebook");
	}
})
/*world.afterEvents.itemUse.subscribe((e) => {
	const { itemStack, source } = e;
	if (itemStack.typeId === "minecraft:iron_sword") {
		let vartemp = world.getDynamicPropertyTotalByteCount();
		source.sendMessage(`BYTES: ${vartemp}`);
		
		const listMailboxes = data.getAllMailboxes();
		const listBoxes = dataBox.getAllBoxes();
		if (listMailboxes.length > 0) {
			const mailboxInfo = listMailboxes.map(mailbox => {
				const { name, coordinates, dimension } = mailbox;
				return `${name} (${coordinates.x}, ${coordinates.y}, ${coordinates.z}) ${dimension}`;
			}).join(", ");
			source.sendMessage(`Buzones disponibles: ${mailboxInfo}`);
		} else {
			source.sendMessage("No hay buzones disponibles.");
		}
		if (listBoxes.length > 0) {
			const boxNames = listBoxes.map(box => box.id).join(", ");
			source.sendMessage(`Cajas disponibles: ${boxNames}`);
		} else {
			source.sendMessage("No hay cajas disponibles.");
		}
	}
});*/