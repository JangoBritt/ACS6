import { world, system } from "@minecraft/server";

system.beforeEvents.watchdogTerminate.subscribe(eventData => {
  eventData.cancel = true;
});
