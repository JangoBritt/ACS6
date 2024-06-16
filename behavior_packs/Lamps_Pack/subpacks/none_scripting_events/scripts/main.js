import { system, world, BlockPermutation, GameMode } from "@minecraft/server";

system.beforeEvents.watchdogTerminate.subscribe(data => {
    data.cancel = true;
});

world.afterEvents.playerBreakBlock.subscribe(eventData => {
  const player = eventData.player;
  const itemUsed = eventData.itemStackBeforeBreak;
  const brokenBlock = eventData.brokenBlockPermutation;
  const playerEquippable = player.getComponent("equippable");
  const vanillaTools = [
    "minecraft:diamond_axe",
    "minecraft:diamond_hoe",
    "minecraft:diamond_pickaxe",
    "minecraft:diamond_shovel",
    "minecraft:diamond_sword",
    "minecraft:flint_and_steel",
    "minecraft:golden_axe",
    "minecraft:golden_hoe",
    "minecraft:golden_pickaxe",
    "minecraft:golden_shovel",
    "minecraft:golden_sword",
    "minecraft:iron_axe",
    "minecraft:iron_hoe",
    "minecraft:iron_pickaxe",
    "minecraft:iron_shovel",
    "minecraft:iron_sword",
    "minecraft:mace",
    "minecraft:netherite_axe",
    "minecraft:netherite_hoe",
    "minecraft:netherite_pickaxe",
    "minecraft:netherite_shovel",
    "minecraft:netherite_sword",
    "minecraft:shield",
    "minecraft:stone_axe",
    "minecraft:stone_hoe",
    "minecraft:stone_pickaxe",
    "minecraft:stone_shovel",
    "minecraft:stone_sword",
    "minecraft:wooden_axe",
    "minecraft:wooden_hoe",
    "minecraft:wooden_pickaxe",
    "minecraft:wooden_shovel",
    "minecraft:wooden_sword"
  ]
  if (itemUsed === undefined || player.matches({ gameMode: GameMode.creative })) return;
  if (vanillaTools.includes(itemUsed.typeId) || itemUsed.hasTag("minecraft:is_axe") || itemUsed.hasTag("minecraft:is_hoe") || itemUsed.hasTag("minecraft:is_pickaxe") || itemUsed.hasTag("minecraft:is_shovel") || itemUsed.hasTag("minecraft:is_sword")) {
    if (brokenBlock.hasTag("nicothekid_blocks")) {
      if (!brokenBlock.hasTag("instant_diggable")) {
        const otherTools = [
          "minecraft:flint_and_steel",
          "minecraft:mace",
          "minecraft:shield"
        ]
        if (itemUsed.hasTag("minecraft:is_axe")) {
          const itemEnchantable = itemUsed.getComponent("enchantable");
          const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
          const breakChance = 100 / (unbreakingLevel + 1);
          const randomizeChance = Math.random() * 100;
          if (breakChance < randomizeChance) return;
          const itemDurability = itemUsed.getComponent("durability");
          if (!itemDurability) return;
          const itemMaxDurability = itemDurability.maxDurability;
          const itemDurabilityDamage = itemDurability.damage;
          const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
          let damageAmount = 0;
          if (brokenBlock.hasTag("axe_diggable") || brokenBlock.hasTag("any_tool_diggable")) {
            damageAmount = 1;
          }
          else {
            damageAmount = 2;
          };
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
        if (itemUsed.hasTag("minecraft:is_hoe")) {
          const itemEnchantable = itemUsed.getComponent("enchantable");
          const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
          const breakChance = 100 / (unbreakingLevel + 1);
          const randomizeChance = Math.random() * 100;
          if (breakChance < randomizeChance) return;
          const itemDurability = itemUsed.getComponent("durability");
          if (!itemDurability) return;
          const itemMaxDurability = itemDurability.maxDurability;
          const itemDurabilityDamage = itemDurability.damage;
          const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
          let damageAmount = 0;
          if (brokenBlock.hasTag("hoe_diggable") || brokenBlock.hasTag("any_tool_diggable")) {
            damageAmount = 1;
          }
          else {
            damageAmount = 2;
          };
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
        if (itemUsed.hasTag("minecraft:is_pickaxe")) {
          const itemEnchantable = itemUsed.getComponent("enchantable");
          const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
          const breakChance = 100 / (unbreakingLevel + 1);
          const randomizeChance = Math.random() * 100;
          if (breakChance < randomizeChance) return;
          const itemDurability = itemUsed.getComponent("durability");
          if (!itemDurability) return;
          const itemMaxDurability = itemDurability.maxDurability;
          const itemDurabilityDamage = itemDurability.damage;
          const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
          let damageAmount = 0;
          if (brokenBlock.hasTag("pickaxe_diggable") || brokenBlock.hasTag("any_tool_diggable")) {
            damageAmount = 1;
          }
          else {
            damageAmount = 2;
          };
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
        if (itemUsed.hasTag("minecraft:is_shovel")) {
          const itemEnchantable = itemUsed.getComponent("enchantable");
          const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
          const breakChance = 100 / (unbreakingLevel + 1);
          const randomizeChance = Math.random() * 100;
          if (breakChance < randomizeChance) return;
          const itemDurability = itemUsed.getComponent("durability");
          if (!itemDurability) return;
          const itemMaxDurability = itemDurability.maxDurability;
          const itemDurabilityDamage = itemDurability.damage;
          const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
          let damageAmount = 0;
          if (brokenBlock.hasTag("shovel_diggable") || brokenBlock.hasTag("any_tool_diggable")) {
            damageAmount = 1;
          }
          else {
            damageAmount = 2;
          };
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
        if (itemUsed.hasTag("minecraft:is_sword")) {
          const itemEnchantable = itemUsed.getComponent("enchantable");
          const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
          const breakChance = 100 / (unbreakingLevel + 1);
          const randomizeChance = Math.random() * 100;
          if (breakChance < randomizeChance) return;
          const itemDurability = itemUsed.getComponent("durability");
          if (!itemDurability) return;
          const itemMaxDurability = itemDurability.maxDurability;
          const itemDurabilityDamage = itemDurability.damage;
          const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
          let damageAmount = 0;
          if (brokenBlock.hasTag("sword_diggable") || brokenBlock.hasTag("any_tool_diggable")) {
            damageAmount = 1;
          }
          else {
            damageAmount = 2;
          };
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
        if (otherTools.includes(itemUsed.typeId)) {
          const itemEnchantable = itemUsed.getComponent("enchantable");
          const unbreakingLevel = itemEnchantable?.getEnchantment("unbreaking")?.level ?? 0;
          const breakChance = 100 / (unbreakingLevel + 1);
          const randomizeChance = Math.random() * 100;
          if (breakChance < randomizeChance) return;
          const itemDurability = itemUsed.getComponent("durability");
          if (!itemDurability) return;
          const itemMaxDurability = itemDurability.maxDurability;
          const itemDurabilityDamage = itemDurability.damage;
          const durabilityCalculation = itemMaxDurability - itemDurabilityDamage;
          let damageAmount = 2;
          const currentDurability = durabilityCalculation - damageAmount;
          //console.warn(currentDurability);
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
      else return;
    }
    else return;
  }
  else return;
});
