execute @e[type=item,name="copper ingot"] ~~~ detect ~~~ lightning_rod -1 execute @s ~~~ detect ~~-1~ copper_block -1 summon athos_golem:copper_golem ~~-1~
execute @e[type=item,name="copper ingot"] ~~~ detect ~~~ lightning_rod -1 execute @s ~~~ detect ~~-1~ copper_block -1 tag @s add despawn
execute @e[type=item,name="copper ingot"] ~~~ detect ~~~ lightning_rod -1 execute @s ~~~ detect ~~-1~ copper_block -1 fill ~~~ ~~-1~ air 0
kill @e[type=item,tag=despawn]