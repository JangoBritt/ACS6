import { world, system, BlockPermutation, GameMode } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:copper_lantern_waxing", {
    onPlayerInteract: eventData => {
      const player = eventData.player;
      const block = eventData.block;
      const blockLocation = block.location;
      const playerEquippable = player.getComponent("equippable");
      const itemUsed = playerEquippable.getEquipment("Mainhand");
      const blockAllState = block.permutation.getAllStates();
      const customCopperLantern = [
        "nicothekid:copper_lantern",
        "nicothekid:copper_lantern_exposed",
        "nicothekid:copper_lantern_oxidized",
        "nicothekid:copper_lantern_weathered"
      ]
      function decreaseItem () {
        if (!player.matches({ gameMode: GameMode.creative })) {
          const decrementItem = itemUsed.amount == 1 ? undefined : (itemUsed.amount--, itemUsed);
          playerEquippable.setEquipment("Mainhand", decrementItem)
        }
      }
      if (itemUsed === undefined) return;
      if (customCopperLantern.includes(block.typeId) && itemUsed.typeId === "minecraft:honeycomb") {
        system.run(() => {
          const pitchRange = Math.random() * (1.2 - 0.8) + 0.8;
          if (block.permutation.matches("nicothekid:copper_lantern")) {
            decreaseItem ();
            block.dimension.playSound("copper.wax.on", blockLocation, { pitch: pitchRange, volume: 1.0 });
            block.dimension.spawnParticle("nicothekid:copper_wax_on_particle", { x: blockLocation.x, y: blockLocation.y, z: blockLocation.z });
            block.setPermutation(BlockPermutation.resolve("nicothekid:waxed_copper_lantern", blockAllState ));
            return;
          }
          if (block.permutation.matches("nicothekid:copper_lantern_exposed")) {
            decreaseItem ();
            block.dimension.playSound("copper.wax.on", blockLocation, { pitch: pitchRange, volume: 1.0 });
            block.dimension.spawnParticle("nicothekid:copper_wax_on_particle", { x: blockLocation.x, y: blockLocation.y, z: blockLocation.z });
            block.setPermutation(BlockPermutation.resolve("nicothekid:waxed_copper_lantern_exposed", blockAllState ));
            return;
          }
          if (block.permutation.matches("nicothekid:copper_lantern_weathered")) {
            decreaseItem ();
            block.dimension.playSound("copper.wax.on", blockLocation, { pitch: pitchRange, volume: 1.0 });
            block.dimension.spawnParticle("nicothekid:copper_wax_on_particle", { x: blockLocation.x, y: blockLocation.y, z: blockLocation.z });
            block.setPermutation(BlockPermutation.resolve("nicothekid:waxed_copper_lantern_weathered", blockAllState ));
            return;
          }
          if (block.permutation.matches("nicothekid:copper_lantern_oxidized")) {
            decreaseItem ();
            block.dimension.playSound("copper.wax.on", blockLocation, { pitch: pitchRange, volume: 1.0 });
            block.dimension.spawnParticle("nicothekid:copper_wax_on_particle", { x: blockLocation.x, y: blockLocation.y, z: blockLocation.z });
            block.setPermutation(BlockPermutation.resolve("nicothekid:waxed_copper_lantern_oxidized", blockAllState ));
            return;
          }
        });
      }
      else return;
    }
  });
});
