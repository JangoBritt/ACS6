execute @e[type=item,name="tuff"] ~~~ detect ~~~ carpet -1 execute @s ~~~ detect ~~-1~ tuff -1 summon athos_golem:tuff_golem ~~-1~
execute @e[type=item,name="tuff"] ~~~ detect ~~~ carpet -1 execute @s ~~~ detect ~~-1~ tuff -1 tag @s add despawn
execute @e[type=item,name="tuff"] ~~~ detect ~~~ carpet -1 execute @s ~~~ detect ~~-1~ tuff -1 fill ~~~ ~~-1~ air 0
kill @e[type=item,tag=despawn]