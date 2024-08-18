import { world, system, BlockPermutation, ItemStack, GameMode } from "@minecraft/server";

world.beforeEvents.itemUseOn.subscribe(eventData => {
  const player = eventData.source;
  const itemUsed = eventData.itemStack;
  const block = eventData.block;
  const blockLocation = block.location;
  const playerEquippable = player.getComponent("equippable");
  const stateAll = block.permutation.getAllStates();
  function damageDurability () {
    if (!player.matches({ gameMode: GameMode.creative })) {
      const itemEnchantable = itemUsed.getComponent("minecraft:enchantable");
      const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
      const breakChance = 100 / (unbreakingLevel + 1);
      const randomizeChance = Math.random() * 100;
      if (breakChance < randomizeChance) return;
      const itemDurability = itemUsed.getComponent("durability");
      if (!itemDurability) return;
      const itemMaxDurability = itemDurability.maxDurability;
      const itemDurabilityDamage = itemDurability.damage;
      const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
      let damageAmount = 1;
      const currentDurability = durabilityCalculation - damageAmount;
      if (currentDurability <= 0) {
        player.playSound("random.break", { pitch: 0.9, location: player.location, volume: 1 });
        playerEquippable.setEquipment("Mainhand", null);
      }
      else {
        itemDurability.damage += damageAmount;
        playerEquippable.setEquipment("Mainhand", itemUsed)
      }
    }
  }
  if (itemUsed === undefined) return;
  if (itemUsed.hasTag("minecraft:is_axe") || itemUsed.hasTag("minecraft:is_hoe") || itemUsed.hasTag("minecraft:is_shovel")) {
    if (itemUsed.hasTag("minecraft:is_axe")) {
      const customCopper = [
        "nicothekid:copper_lamp_exposed",
        "nicothekid:copper_lamp_oxidized",
        "nicothekid:copper_lamp_weathered",
        "nicothekid:copper_lantern_exposed",
        "nicothekid:copper_lantern_oxidized",
        "nicothekid:copper_lantern_weathered"
      ]
      const customWaxedCopper = [
        "nicothekid:waxed_copper_lamp",
        "nicothekid:waxed_copper_lamp_exposed",
        "nicothekid:waxed_copper_lamp_oxidized",
        "nicothekid:waxed_copper_lamp_weathered",
        "nicothekid:waxed_copper_lantern",
        "nicothekid:waxed_copper_lantern_exposed",
        "nicothekid:waxed_copper_lantern_oxidized",
        "nicothekid:waxed_copper_lantern_weathered"
      ]
      if (customCopper.includes(block.typeId)) {
        system.run(() => {
          const pitchRange = Math.random() * (1.2 - 0.8) + 0.8;
          damageDurability ();
          block.dimension.playSound("scrape", blockLocation, { pitch: pitchRange, volume: 1.0 });
          block.dimension.spawnParticle("nicothekid:copper_scrape_particle", blockLocation);
          if (block.permutation.matches("nicothekid:copper_lamp_exposed")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lamp"));
          }
          if (block.permutation.matches("nicothekid:copper_lamp_weathered")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lamp_exposed"));
          }
          if (block.permutation.matches("nicothekid:copper_lamp_oxidized")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lamp_weathered"));
          }
          if (block.permutation.matches("nicothekid:copper_lantern_exposed")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern", stateAll ));
          }
          if (block.permutation.matches("nicothekid:copper_lantern_weathered")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern_exposed", stateAll ));
          }
          if (block.permutation.matches("nicothekid:copper_lantern_oxidized")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern_weathered", stateAll ));
          }
        });
      }
      if (customWaxedCopper.includes(block.typeId)) {
        system.run(() => {
          const pitchRange = Math.random() * (1.2 - 0.8) + 0.8;
          damageDurability ();
          block.dimension.playSound("copper.wax.off", blockLocation, { pitch: pitchRange, volume: 1.0 });
          block.dimension.spawnParticle("nicothekid:copper_wax_off_particle", blockLocation);
          if (block.permutation.matches("nicothekid:waxed_copper_lamp")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lamp"));
          }
          if (block.permutation.matches("nicothekid:waxed_copper_lamp_exposed")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lamp_exposed"));
          }
          if (block.permutation.matches("nicothekid:waxed_copper_lamp_weathered")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lamp_weathered"));
          }
          if (block.permutation.matches("nicothekid:waxed_copper_lamp_oxidized")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lamp_oxidized"));
          }
          if (block.permutation.matches("nicothekid:waxed_copper_lantern")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern", stateAll ));
          }
          if (block.permutation.matches("nicothekid:waxed_copper_lantern_exposed")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern_exposed", stateAll ));
          }
          if (block.permutation.matches("nicothekid:waxed_copper_lantern_weathered")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern_weathered", stateAll ));
          }
          if (block.permutation.matches("nicothekid:waxed_copper_lantern_oxidized")) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern_oxidized", stateAll ));
          }
        });
      }
    }
  }
  else return;
});
