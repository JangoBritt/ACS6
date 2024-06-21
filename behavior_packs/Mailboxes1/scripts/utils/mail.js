import { world } from '@minecraft/server';

class MailBox {
    constructor(name, owner, coordinates, dimension) {
        this.name = name;
        this.owner = owner;
        this.coordinates = coordinates;
        this.dimension = dimension;
    }
    rename(newName) {
        this.name = newName;
    }
}

export class MailBoxes {
    constructor(mailboxes) {
        this.mailboxes = mailboxes;
        if (!world.getDynamicProperty(this.mailboxes)) {
            world.setDynamicProperty(this.mailboxes, JSON.stringify([]));
        }
    }

    createMailbox(name, owner, coordinates, dimension) {
        const mailbox = new MailBox(name, owner, coordinates, dimension);
        const mailboxesData = JSON.parse(world.getDynamicProperty(this.mailboxes));
        mailboxesData.push(mailbox);
        world.setDynamicProperty(this.mailboxes, JSON.stringify(mailboxesData));
    }

    getAllMailboxes() {
        return JSON.parse(world.getDynamicProperty(this.mailboxes));
    }

    removeMailbox(name) {
        const mailboxesData = JSON.parse(world.getDynamicProperty(this.mailboxes));
        const index = mailboxesData.findIndex(mailbox => mailbox.name === name);
        if (index !== -1) {
            mailboxesData.splice(index, 1);
            world.setDynamicProperty(this.mailboxes, JSON.stringify(mailboxesData));
        }
    }
    getMailboxesByDimension(dimension) {
        const allMailboxes = this.getAllMailboxes();
        return allMailboxes.filter(mailbox => mailbox.dimension === dimension);
    }
    mailboxExists(name) {
        const mailboxesData = this.getAllMailboxes();
        return mailboxesData.some(mailbox => mailbox.name === name);
    }
}