execute as @a[hasitem={item=farmersdelight:wild_beetroots}] run clear @a farmersdelight:wild_beetroots
execute as @a[hasitem={item=farmersdelight:wild_cabbages}] run clear @a farmersdelight:wild_cabbages
execute as @a[hasitem={item=farmersdelight:wild_onions}] run clear @a farmersdelight:wild_onions
execute as @a[hasitem={item=farmersdelight:wild_potatoes}] run clear @a farmersdelight:wild_potatoes
execute as @a[hasitem={item=farmersdelight:wild_carrots}] run clear @a farmersdelight:wild_carrots
execute as @a[hasitem={item=farmersdelight:wild_rice_block}] run clear @a farmersdelight:wild_rice_block
execute as @a[hasitem={item=farmersdelight:wild_rice_upper_block}] run clear @a farmersdelight:wild_rice_upper_block

execute as @a[hasitem={item=farmersdelight:wild_rice_upper_block}] run clear @a medieval:workbench_right

execute as @e[type=item,name=tile.farmersdelight:wild_beetroots.name] run kill @s
execute as @e[type=item,name=tile.farmersdelight:wild_cabbages] run kill @s
execute as @e[type=item,name=tile.farmersdelight:wild_onions] run kill @s
execute as @e[type=item,name=tile.farmersdelight:wild_potatoes] run kill @s
execute as @e[type=item,name=tile.farmersdelight:wild_carrots] run kill @s
execute as @e[type=item,name=tile.farmersdelight:wild_rice_block] run kill @s
execute as @e[type=item,name=tile.farmersdelight:wild_rice_upper_block] run kill @s

execute as @e[type=item,name=tile.medieval:workbench_right] run kill @s