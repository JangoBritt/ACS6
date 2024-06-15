import { world, system } from "@minecraft/server";


world.afterEvents.itemCompleteUse.subscribe(use =>{
  try{
    let p = use.source;
    let item = use.itemStack;

    if(item.typeId == "medieval:beer_mug_fill_item"){
      if(( Math.random() * 100) <= 20) {
        p.runCommandAsync("effect @s nausea 9 2")
        p.runCommandAsync("effect @s hunger 60 2")
      }
    }
    if(item.typeId == "medieval:wine_bottle_item"){
      if(( Math.random() * 100) <= 20) {
        p.runCommandAsync("effect @s nausea 9 2")
        p.runCommandAsync("effect @s hunger 60 2")
      }
    }



  }catch(e){
  }
})
