scoreboard objectives add Mobs dummy
scoreboard objectives add Villagers dummy
scoreboard objectives add Items dummy
scoreboard players set @a Mobs 0
scoreboard players set @a Villagers 0
scoreboard players set @a Items 0
execute as @e[family=mob] at @s run scoreboard players add @a[r=64] Mobs 1
execute as @e[type=villager] at @s run scoreboard players add @a[r=64] Villagers 1
execute as @e[type=item] at @s run scoreboard players add @a[r=64] Items 1
