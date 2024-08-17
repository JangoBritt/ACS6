import { world, BlockPermutation } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  const customCopperLamp = [
    "nicothekid:copper_lamp",
    "nicothekid:copper_lamp_exposed",
    "nicothekid:copper_lamp_weathered"
  ]
  initEvent.blockComponentRegistry.registerCustomComponent("nicothekid:copper_lamp_oxidization", {
    onRandomTick: eventData => {
      const block = eventData.block;
      const blockLocation = block.location;
      const blockAllState = block.permutation.getAllStates();
      if (customCopperLamp.includes(block.typeId)) {
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
      }
      else return;
    }
  });
});