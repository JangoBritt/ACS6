import { world, system, BlockPermutation, ItemStack, Dimension, GameMode } from "@minecraft/server";

world.beforeEvents.playerInteractWithBlock.subscribe(eventData => {
  const player = eventData.player;
  const itemUsed = eventData.itemStack;
  const block = eventData.block;
  const blockFacing = eventData.blockFace;
  const blockLocation = block.location;
  const playerEquippable = player.getComponent("equippable");
  
  function decreaseItem () {
    if (!player.matches({ gameMode: GameMode.creative })) {
      const decrementItem = itemUsed.amount == 1 ? undefined : (itemUsed.amount--, itemUsed);
      playerEquippable.setEquipment("Mainhand", decrementItem)
    }
  }
  
  if (itemUsed === undefined && block.typeId === "nicothekid:jack_o_soul_lantern" && player.isSneaking || itemUsed === undefined && block.typeId === "minecraft:lit_pumpkin" && player.isSneaking) {
    const spawnTorch = new ItemStack("minecraft:torch", 1);
    const spawnSoulTorch = new ItemStack("minecraft:soul_torch", 1);
    if (block.permutation.matches("nicothekid:jack_o_soul_lantern", { "minecraft:cardinal_direction": "north" }) && blockFacing === "North" ) {
      system.run(() => {
        block.setPermutation(BlockPermutation.resolve("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "north" }));
        block.dimension.playSound("block.itemframe.remove_item", blockLocation, { pitch: 1.0, volume: 1.0 });
        block.dimension.spawnItem(spawnSoulTorch, {
          x: blockLocation.x + 0.5,
          y: blockLocation.y + 0.5,
          z: blockLocation.z - 0.5
        });
        return
      });
    }
    if (block.permutation.matches("nicothekid:jack_o_soul_lantern", { "minecraft:cardinal_direction": "south" }) && blockFacing === "South" ) {
      system.run(() => {
        block.setPermutation(BlockPermutation.resolve("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "south" }));
        block.dimension.playSound("block.itemframe.remove_item", blockLocation, { pitch: 1.0, volume: 1.0 });
        block.dimension.spawnItem(spawnSoulTorch, {
          x: blockLocation.x + 0.5,
          y: blockLocation.y + 0.5,
          z: blockLocation.z + 1.5
        });
        return
      });
    }
    if (block.permutation.matches("nicothekid:jack_o_soul_lantern", { "minecraft:cardinal_direction": "west" }) && blockFacing === "West" ) {
      system.run(() => {
        block.setPermutation(BlockPermutation.resolve("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "west" }));
        block.dimension.playSound("block.itemframe.remove_item", blockLocation, { pitch: 1.0, volume: 1.0 });
        block.dimension.spawnItem(spawnSoulTorch, {
          x: blockLocation.x - 0.5,
          y: blockLocation.y + 0.5,
          z: blockLocation.z + 0.5
        });
        return
      });
    }
    if (block.permutation.matches("nicothekid:jack_o_soul_lantern", { "minecraft:cardinal_direction": "east" }) && blockFacing === "East" ) {
      system.run(() => {
        block.setPermutation(BlockPermutation.resolve("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "east" }));
        block.dimension.playSound("block.itemframe.remove_item", blockLocation, { pitch: 1.0, volume: 1.0 });
        block.dimension.spawnItem(spawnSoulTorch, {
          x: blockLocation.x + 1.5,
          y: blockLocation.y + 0.5,
          z: blockLocation.z + 0.5
        });
        return
      });
    }
    if (block.permutation.matches("minecraft:lit_pumpkin", { "minecraft:cardinal_direction": "north" }) && blockFacing === "North" ) {
      system.run(() => {
        block.setPermutation(BlockPermutation.resolve("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "north" }));
        block.dimension.playSound("block.itemframe.remove_item", blockLocation, { pitch: 1.0, volume: 1.0 });
        block.dimension.spawnItem(spawnTorch, {
          x: blockLocation.x + 0.5,
          y: blockLocation.y + 0.5,
          z: blockLocation.z - 0.5
        });
        return
      });
    }
    if (block.permutation.matches("minecraft:lit_pumpkin", { "minecraft:cardinal_direction": "south" }) && blockFacing === "South" ) {
      system.run(() => {
        block.setPermutation(BlockPermutation.resolve("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "south" }));
        block.dimension.playSound("block.itemframe.remove_item", blockLocation, { pitch: 1.0, volume: 1.0 });
        block.dimension.spawnItem(spawnTorch, {
          x: blockLocation.x + 0.5,
          y: blockLocation.y + 0.5,
          z: blockLocation.z + 1.5
        });
        return
      });
    }
    if (block.permutation.matches("minecraft:lit_pumpkin", { "minecraft:cardinal_direction": "west" }) && blockFacing === "West" ) {
      system.run(() => {
        block.setPermutation(BlockPermutation.resolve("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "west" }));
        block.dimension.playSound("block.itemframe.remove_item", blockLocation, { pitch: 1.0, volume: 1.0 });
        block.dimension.spawnItem(spawnTorch, {
          x: blockLocation.x - 0.5,
          y: blockLocation.y + 0.5,
          z: blockLocation.z + 0.5
        });
        return
      });
    }
    if (block.permutation.matches("minecraft:lit_pumpkin", { "minecraft:cardinal_direction": "east" }) && blockFacing === "East" ) {
      system.run(() => {
        block.setPermutation(BlockPermutation.resolve("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "east" }));
        block.dimension.playSound("block.itemframe.remove_item", blockLocation, { pitch: 1.0, volume: 1.0 });
        block.dimension.spawnItem(spawnTorch, {
          x: blockLocation.x + 1.5,
          y: blockLocation.y + 0.5,
          z: blockLocation.z + 0.5
        });
        return
      });
    }
  }
  if (itemUsed === undefined || !playerEquippable) return;
  if (itemUsed.typeId === "minecraft:torch" && block.typeId === "minecraft:carved_pumpkin" && player.isSneaking) {
    system.run(() => {
      if (block.permutation.matches("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "north" }) && blockFacing === "North" ) {
        const blockNorth = block.dimension.getBlock(blockLocation).north(1);
        if (blockNorth.typeId !== "minecraft:torch") {
          block.north(1).setPermutation(blockNorth.permutation);
          decreaseItem ()
        }
        else {
          block.north(1).setPermutation(BlockPermutation.resolve("minecraft:air"));
        }
        block.setPermutation(BlockPermutation.resolve("minecraft:lit_pumpkin", { "minecraft:cardinal_direction": "north" }));
        block.dimension.playSound("block.itemframe.add_item", blockLocation, { pitch: 1.0, volume: 1.0 });
      }
      if (block.permutation.matches("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "south" }) && blockFacing === "South" ) {
        const blockSouth = block.dimension.getBlock(blockLocation).south(1);
        if (blockSouth.typeId !== "minecraft:torch") {
          block.south(1).setPermutation(blockSouth.permutation);
          decreaseItem ()
        }
        else {
          block.south(1).setPermutation(BlockPermutation.resolve("minecraft:air"));
        }
        block.setPermutation(BlockPermutation.resolve("minecraft:lit_pumpkin", { "minecraft:cardinal_direction": "south" }));
        block.dimension.playSound("block.itemframe.add_item", blockLocation, { pitch: 1.0, volume: 1.0 });
      }
      if (block.permutation.matches("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "west" }) && blockFacing === "West" ) {
        const blockWest = block.dimension.getBlock(blockLocation).west(1);
        if (blockWest.typeId !== "minecraft:torch") {
          block.west(1).setPermutation(blockWest.permutation);
          decreaseItem ()
        }
        else {
          block.west(1).setPermutation(BlockPermutation.resolve("minecraft:air"));
        }
        block.setPermutation(BlockPermutation.resolve("minecraft:lit_pumpkin", { "minecraft:cardinal_direction": "west" }));
        block.dimension.playSound("block.itemframe.add_item", blockLocation, { pitch: 1.0, volume: 1.0 });
      }
      if (block.permutation.matches("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "east" }) && blockFacing === "East" ) {
        const blockEast = block.dimension.getBlock(blockLocation).east(1);
        if (blockEast.typeId !== "minecraft:torch") {
          block.east(1).setPermutation(blockEast.permutation);
          decreaseItem ()
        }
        else {
          block.east(1).setPermutation(BlockPermutation.resolve("minecraft:air"));
        }
        block.setPermutation(BlockPermutation.resolve("minecraft:lit_pumpkin", { "minecraft:cardinal_direction": "east" }));
        block.dimension.playSound("block.itemframe.add_item", blockLocation, { pitch: 1.0, volume: 1.0 });
      }
    });
  }
  if (itemUsed.typeId === "minecraft:soul_torch" && block.typeId === "minecraft:carved_pumpkin" && player.isSneaking) {
    system.run(() => {
      if (block.permutation.matches("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "north" }) && blockFacing === "North" ) {
        const blockNorth = block.dimension.getBlock(blockLocation).north(1);
        if (blockNorth.typeId !== "minecraft:soul_torch") {
          block.north(1).setPermutation(blockNorth.permutation);
          decreaseItem ()
        }
        else {
          block.north(1).setPermutation(BlockPermutation.resolve("minecraft:air"));
        }
        block.setPermutation(BlockPermutation.resolve("nicothekid:jack_o_soul_lantern", { "minecraft:cardinal_direction": "north" }));
        block.dimension.playSound("block.itemframe.add_item", blockLocation, { pitch: 1.0, volume: 1.0 });
      }
      if (block.permutation.matches("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "south" }) && blockFacing === "South" ) {
        const blockSouth = block.dimension.getBlock(blockLocation).south(1);
        if (blockSouth.typeId !== "minecraft:soul_torch") {
          block.south(1).setPermutation(blockSouth.permutation);
          decreaseItem ()
        }
        else {
          block.south(1).setPermutation(BlockPermutation.resolve("minecraft:air"));
        }
        block.setPermutation(BlockPermutation.resolve("nicothekid:jack_o_soul_lantern", { "minecraft:cardinal_direction": "south" }));
        block.dimension.playSound("block.itemframe.add_item", blockLocation, { pitch: 1.0, volume: 1.0 });
      }
      if (block.permutation.matches("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "west" }) && blockFacing === "West" ) {
        const blockWest = block.dimension.getBlock(blockLocation).west(1);
        if (blockWest.typeId !== "minecraft:soul_torch") {
          block.west(1).setPermutation(blockWest.permutation);
          decreaseItem ()
        }
        else {
          block.west(1).setPermutation(BlockPermutation.resolve("minecraft:air"));
        }
        block.setPermutation(BlockPermutation.resolve("nicothekid:jack_o_soul_lantern", { "minecraft:cardinal_direction": "west" }));
        block.dimension.playSound("block.itemframe.add_item", blockLocation, { pitch: 1.0, volume: 1.0 });
      }
      if (block.permutation.matches("minecraft:carved_pumpkin", { "minecraft:cardinal_direction": "east" }) && blockFacing === "East" ) {
        const blockEast = block.dimension.getBlock(blockLocation).east(1);
        if (blockEast.typeId !== "minecraft:soul_torch") {
          block.east(1).setPermutation(blockEast.permutation);
          decreaseItem ()
        }
        else {
          block.east(1).setPermutation(BlockPermutation.resolve("minecraft:air"));
        }
        block.setPermutation(BlockPermutation.resolve("nicothekid:jack_o_soul_lantern", { "minecraft:cardinal_direction": "east" }));
        block.dimension.playSound("block.itemframe.add_item", blockLocation, { pitch: 1.0, volume: 1.0 });
      }
    });
  }
});