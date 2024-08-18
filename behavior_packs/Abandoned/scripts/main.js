import { world, system, BlockPermutation, Dimension } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_allay_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("athos_golem:copper_golem", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_allay_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("athos_golem:copper_golem", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_blaze_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:blaze", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_blaze_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:blaze", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_cat_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:cat", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_cat_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:cat", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_hoglin_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:hoglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_hoglin_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:hoglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_pig_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:pig", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_pig_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:pig", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_piglin_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:piglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_piglin_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:piglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_piglin_brute_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:piglin_brute", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_piglin_brute_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:piglin_brute", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_pillager_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:pillager", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_pillager_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:pillager", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_rabbit_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:rabbit", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_rabbit_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:rabbit", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_skeleton_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:skeleton", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_skeleton_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:skeleton", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_skeleton_horse_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:skeleton_horse", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_skeleton_horse_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:skeleton_horse", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_villager_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:villager", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_villager_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:villager", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_witch_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:witch", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_witch_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:witch", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_wither_skeleton_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:wither_skeleton", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_wither_skeleton_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:wither_skeleton", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zoglin_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zoglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zoglin_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zoglin", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zombie_horse_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zombie_horse", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zombie_horse_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zombie_horse", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zombie_villager_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zombie_villager", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zombie_villager_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zombie_villager", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zombified_piglin_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zombie_pigman", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:spawner_zombified_piglin_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.spawnEntity("minecraft:zombie_pigman", { x: eventData.block.location.x + 0.5, y: eventData.block.location.y, z: eventData.block.location.z + 0.5 });
    }
  });
});

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:structure_ancient_castle_on_random_tick", {
    onRandomTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.runCommandAsync(`structure load ancient_castle_01 ${eventData.block.location.x - 22} ${eventData.block.location.y - 1} ${eventData.block.location.z - 22}`);
    }
  });
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:structure_ancient_castle_on_tick", {
    onTick: eventData => {
      eventData.block.setPermutation(BlockPermutation.resolve("minecraft:air"));
      eventData.block.dimension.runCommandAsync(`structure load ancient_castle_01 ${eventData.block.location.x - 22} ${eventData.block.location.y - 1} ${eventData.block.location.z - 22}`);
    }
  });
});
