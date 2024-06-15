execute as @a at @s if entity @e[type=medieval:sit_bench,c=1,r=0.5] run tag @s add is_riding
execute as @a at @s unless entity @e[type=medieval:sit_bench,c=1,r=0.5] run tag @s remove is_riding

execute as @a at @s if entity @e[type=medieval:sleep,c=1,r=0.5] run tag @s add is_sleep
execute as @a at @s unless entity @e[type=medieval:sleep,c=1,r=0.5] run tag @s remove is_sleep