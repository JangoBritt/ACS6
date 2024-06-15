execute as @a at @s if entity @e[type=mr:chair_entity,c=1,r=0.5] run tag @s add is_riding
execute as @a at @s unless entity @e[type=mr:chair_entity,c=1,r=0.5] run tag @s remove is_riding