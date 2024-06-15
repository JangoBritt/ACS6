/**
 * deathCounter - BedrockBridge Plugin
 * 
 * This bridge-addon creates and handles scoreboard entries for: number of deaths, number of kills, number of player killed. 
 * You can retrieve this information about a player from discord by running the command /stats
 * 
 * by InnateAlpaca (https://github.com/InnateAlpaca)
 */


import { world, Player } from '@minecraft/server';
import { bridge } from '../addons';

const death_name = "esploratori:death_counter", kills_name = "esploratori:kill_counter", mobs_name = "esploratori:mob_counter";

const death_obj = world.scoreboard.getObjective(death_name)??world.scoreboard.addObjective(death_name, "number of deaths");
const kills_obj = world.scoreboard.getObjective(kills_name)??world.scoreboard.addObjective(kills_name, "players killed");
const mob_kills_obj = world.scoreboard.getObjective(mobs_name)??world.scoreboard.addObjective(mobs_name, "mobs killed");

// reload command handler
world.getAllPlayers().forEach(player=>{ 
    player.runCommand(`scoreboard players add @s ${death_name} 0`)
    player.runCommand(`scoreboard players add @s ${kills_name} 0`)
    player.runCommand(`scoreboard players add @s ${mobs_name} 0`)
})

world.afterEvents.playerSpawn.subscribe(e=>{
    if (e.initialSpawn){
        e.player.runCommand(`scoreboard players add @s ${death_name} 0`)
        e.player.runCommand(`scoreboard players add @s ${kills_name} 0`)
        e.player.runCommand(`scoreboard players add @s ${mobs_name} 0`)
    }
})

world.afterEvents.entityDie.subscribe(e=>{
    if (e.deadEntity instanceof(Player)){
        e.deadEntity.runCommandAsync(`scoreboard players add @s ${death_name} 1`);
        if (e.damageSource.damagingEntity instanceof(Player)){
            e.damageSource.damagingEntity.runCommandAsync(`scoreboard players add @s ${kills_name} 1`);
        }
    }       
    else if (e.damageSource.damagingEntity instanceof(Player)){
        e.damageSource.damagingEntity.runCommandAsync(`scoreboard players add @s ${mobs_name} 1`);
    }
})

bridge.bedrockCommands.registerCommand("mystats", (player)=>{
    if (player.scoreboardIdentity){
        player.sendMessage(
            "\nHere are your scores:\n"+
            `- §oNumber of deaths:§r ${death_obj.getScore(player.scoreboardIdentity)??0}\n`+
            `- §oNumber of kills:§r ${kills_obj.getScore(player.scoreboardIdentity)??0}\n`+
            `- §oMobs killed:§r ${mob_kills_obj.getScore(player.scoreboardIdentity)??0}\n`
        )        
    }
    else {
        player.sendMessage("§cThere is no registered score for you.")
    }    
}, "Get death and kill stats about yourself")