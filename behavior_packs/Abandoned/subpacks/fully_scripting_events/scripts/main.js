import { world, system, BlockPermutation, Dimension } from "@minecraft/server";

system.beforeEvents.watchdogTerminate.subscribe(eventData => {
  eventData.cancel = true;
});
world.beforeEvents.worldInitialize.subscribe(initEvent => {
  const mobSpawnerBlock = [
    "nicothekid:spawner_allay",
    "nicothekid:spawner_blaze",
    "nicothekid:spawner_cat",
    "nicothekid:spawner_hoglin",
    "nicothekid:spawner_pig",
    "nicothekid:spawner_piglin",
    "nicothekid:spawner_piglin_brute",
    "nicothekid:spawner_pillager",
    "nicothekid:spawner_rabbit",
    "nicothekid:spawner_skeleton",
    "nicothekid:spawner_skeleton_horse",
    "nicothekid:spawner_villager",
    "nicothekid:spawner_witch",
    "nicothekid:spawner_wither_skeleton",
    "nicothekid:spawner_zoglin",
    "nicothekid:spawner_zombie_horse",
    "nicothekid:spawner_zombie_villager",
    "nicothekid:spawner_zombified_piglin"
  ]
  initEvent.blockTypeRegistry.registerCustomComponent("nicothekid:mob_spawner", {
    onRandomTick: eventData => {
      const block = eventData.block;
      const blockLocation = block.location;
      if (mobSpawnerBlock.includes(block.typeId)) {
        if (block.permutation.matches("nicothekid:spawner_allay")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("athos_golem:copper_golem", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_blaze")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:blaze", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_cat")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:cat", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_hoglin")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:hoglin", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_pig")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:pig", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_piglin")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:piglin", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_piglin_brute")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:piglin_brute", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_pillager")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:pillager", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_rabbit")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:rabbit", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_skeleton")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:skeleton", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_skeleton_horse")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:skeleton_horse", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_villager")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:villager", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_witch")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:witch", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_wither_skeleton")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:wither_skeleton", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_zoglin")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:zoglin", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_zombie_horse")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:zombie_horse", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_zombie_villager")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:zombie_villager", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
        if (block.permutation.matches("nicothekid:spawner_zombified_piglin")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:zombie_pigman", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
      }
      else return;
    }
  });
  initEvent.blockTypeRegistry.registerCustomComponent("nicothekid:mob_spawner_tick", {
    onTick: eventData => {
      const block = eventData.block;
      const blockLocation = block.location;
      if (mobSpawnerBlock.includes(block.typeId)) {
        if (block.permutation.matches("nicothekid:spawner_rabbit")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.spawnEntity("minecraft:rabbit", { x: blockLocation.x + 0.5, y: blockLocation.y, z: blockLocation.z + 0.5 })
          });
        }
      }
      else return;
    }
  });
  const structureSpawnerBlock = [
    "nicothekid:structure_ancient_castle"
  ]
  initEvent.blockTypeRegistry.registerCustomComponent("nicothekid:structure_spawner", {
    onRandomTick: eventData => {
      const block = eventData.block;
      const blockLocation = block.location;
      if (structureSpawnerBlock.includes(block.typeId)) {
        let randomChance = Math.random() * (100.0 - 0.0) + 0.0;
        if (block.permutation.matches("nicothekid:structure_ancient_castle")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.runCommandAsync(`structure load ancient_castle_01 ${blockLocation.x - 22} ${blockLocation.y - 1} ${blockLocation.z - 22}`);
          });
        }
        else return;
      }
      else return;
    }
  });
  initEvent.blockTypeRegistry.registerCustomComponent("nicothekid:structure_spawner_tick", {
    onTick: eventData => {
      const block = eventData.block;
      const blockLocation = block.location;
      if (structureSpawnerBlock.includes(block.typeId)) {
        let randomChance = Math.random() * (100.0 - 0.0) + 0.0;
        if (block.permutation.matches("nicothekid:structure_ancient_castle")) {
          system.run(() => {
            block.setPermutation(BlockPermutation.resolve("minecraft:air"));
            block.dimension.runCommandAsync(`structure load ancient_castle_01 ${blockLocation.x - 22} ${blockLocation.y - 1} ${blockLocation.z - 22}`);
          });
        }
        else return;
      }
      else return;
    }
  });
})
