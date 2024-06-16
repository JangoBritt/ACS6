import { world, BlockPermutation } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  const customCopper = [
    "nicothekid:copper_lamp",
    "nicothekid:copper_lamp_exposed",
    "nicothekid:copper_lamp_weathered",
    "nicothekid:copper_lantern",
    "nicothekid:copper_lantern_exposed",
    "nicothekid:copper_lantern_weathered"
  ]
  initEvent.blockTypeRegistry.registerCustomComponent("nicothekid:copper_oxidization", {
    onRandomTick: eventData => {
      const block = eventData.block;
      const blockLocation = block.location;
      const blockAllState = block.permutation.getAllStates();
      if (customCopper.includes(block.typeId)) {
        let oxidizationChance = Math.random();
        if (block.permutation.matches("nicothekid:copper_lamp")) {
          if (oxidizationChance <= 0.01) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lamp_exposed"));
            return;
          }
          else return;
        }
        if (block.permutation.matches("nicothekid:copper_lamp_exposed")) {
          if (oxidizationChance <= 0.01) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lamp_weathered"));
            return;
          }
          else return;
        }
        if (block.permutation.matches("nicothekid:copper_lamp_weathered")) {
          if (oxidizationChance <= 0.01) {
            block.setPermutation(BlockPermutation.resolve("nicothekid:copper_lamp_oxidized"));
            return;
          }
          else return;
        }
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