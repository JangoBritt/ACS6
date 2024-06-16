import { system, world } from "@minecraft/server";

system.beforeEvents.watchdogTerminate.subscribe(data => {
    data.cancel = true;
});

import "./copper_oxidization.js"
import "./copper_waxing.js"

import "./breaking_using_vanilla_tools.js"
import "./curved_pumpkin_interaction.js"
import "./vanilla_tool_interaction.js"
