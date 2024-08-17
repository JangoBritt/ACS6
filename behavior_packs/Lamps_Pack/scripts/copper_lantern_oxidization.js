import { world, BlockPermutation } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  const customCopperLantern = [
    "nicothekid:copper_lantern",
    "nicothekid:copper_lantern_exposed",
    "nicothekid:copper_lantern_weathered"
  ]
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:copper_lantern_oxidization", {
    onRandomTick: eventData => {
      const block = eventData.block;
      const blockLocation = block.location;
      const blockAllState = block.permutation.getAllStates();
      if (customCopperLantern.includes(block.typeId)) {
        let oxidizationChance = Math.random();
        if (block.permutation.matches("nicothekid:copper_lantern")) {
          if (oxidizationChance <= 0.01) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern_exposed", blockAllState ));
            return;
          }
          else return;
        }
        if (block.permutation.matches("nicothekid:copper_lantern_exposed")) {
          if (oxidizationChance <= 0.01) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern_weathered", blockAllState ));
            return;
          }
          else return;
        }
        if (block.permutation.matches("nicothekid:copper_lantern_weathered")) {
          if (oxidizationChance <= 0.01) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lantern_oxidized", blockAllState ));
            return;
          }
          else return;
        }
      }
      else return;
    }
  });
});