import { world, EnchantmentTypes, ItemEnchantableComponent } from '@minecraft/server';

class Box {
    constructor(id, itemList) {
        this.id = id;
        this.itemList = itemList;

    }
}
class BoxItem {
    constructor(id, name, amount, durability, lore, enchantmentsList) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.durability = durability;
        this.lore = lore;
        this.enchantmentsList = enchantmentsList;
    }
}

export class Boxes {
    constructor(boxDatabase) {
        this.boxDatabase = boxDatabase;
        if (!world.getDynamicProperty(this.boxDatabase)) {
            world.setDynamicProperty(this.boxDatabase, JSON.stringify([]));
        }
    }
    setItem(id, name, amount, durability, lore, enchantmentsList) {
        let newItem = new BoxItem(id, name, amount, durability, lore, enchantmentsList);
        return newItem;
    }
    setBox(id, itemList) {
        const box = new Box(id, itemList);
        const boxData = JSON.parse(world.getDynamicProperty(this.boxDatabase));
        boxData.push(box);
        world.setDynamicProperty(this.boxDatabase, JSON.stringify(boxData));
    }

    getAllBoxes() {
        return JSON.parse(world.getDynamicProperty(this.boxDatabase));
    }
    getBoxById(id) {
        const allBoxes = this.getAllBoxes();
        return allBoxes.find(box => box.id === id);
    }
    openBox(id) {
        const boxesData = JSON.parse(world.getDynamicProperty(this.boxDatabase));
        const index = boxesData.findIndex(mailbox => mailbox.id === id);
        if (index !== -1) {
            boxesData.splice(index, 1);
            world.setDynamicProperty(this.boxDatabase, JSON.stringify(boxesData));
        }
    }
}