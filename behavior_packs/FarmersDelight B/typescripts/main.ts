
import { CookingPotBlock } from "./block/CookingPotBlock";
import { CookingPotBlockEntity } from "./block/entity/CookingPotBlockEntity";
import { CuttingBoardBlock } from "./block/CuttingBoardBlock";
import { CuttingBoardBlockEntity } from "./block/entity/CuttingBoardBlockEntity";
import { StoveBlock } from "./block/StoveBlock";
import { StoveBlockEntity } from "./block/entity/StoveBlockEntity";
import { SKilletBlock } from "./block/SkilletBlock";
import { SkilletBlockEntity } from "./block/entity/SkilletBlockEntity";
import { Knife } from "./item/Knife";
import { CookingPotRecipeRegistries } from "./init/CookingPotRecipeRegistries";
import { Food } from "./item/Food";
import { Cabinets } from "./block/Cabinets"
import { CabinetsBlockEntity } from "./block/entity/CabinetsBlockEntity";
import { CuttingBoardRegistries } from "./init/CuttingBoardRecipeRegistries";
import { RiceBlock } from "./block/Rice";
import { CookRecipeRegistries } from "./init/CookRecipeRegistries";
import { FarmersBook } from "./item/FarmersBook";
import { FertilizerItem } from "./item/FertilizerItem";
import { BlockFood } from "./block/BlockFood";
import { RiceRollMedleyComponentRegister } from "./customComponents/block/RiceRollMedleyComponent";
import { RiceSeedComponentRegister } from "./customComponents/item/RiceSeedComponent";
import { CropComponentRegister } from "./customComponents/block/CropComponent";
import { InteractComponentRegister } from "./customComponents/block/InteractComponent";
import { WildCropComponentRegister } from "./customComponents/block/WildCropComponent";
import { RichSoilComponentRegister } from "./customComponents/block/RichSoilComponent";
import { RichSoilFarmlandComponentRegister } from "./customComponents/block/RichSoilFarmlandComponent";
import { MushroomColonyComonentRegister } from "./customComponents/block/MushroomColonyComonent";
import { ColoniesComonentRegister } from "./customComponents/item/ColoniesComonent";
import { OrganicCompostComonentRegister } from "./customComponents/block/OrganicCompostComonent";
import { RopeComponentRegister } from "./customComponents/block/RopeComponent";
import { TatamMatComponentRegister } from "./customComponents/block/TatamMatComponent";
import { TatamComponentRegister } from "./customComponents/block/TatamiComponent";
import { StoveComponentRegister } from "./customComponents/block/StoveComponent";


CookingPotRecipeRegistries.initCookingPotScoRegistries();
CuttingBoardRegistries.initCuttingBoardScoRegistries();
CookRecipeRegistries.initCookScoRegistries();

new CookingPotBlock();
new CookingPotBlockEntity();
new CuttingBoardBlock();
new CuttingBoardBlockEntity();
new StoveBlock();
new StoveBlockEntity();
new SKilletBlock();
new SkilletBlockEntity();
new Cabinets();
new CabinetsBlockEntity();
new RiceBlock();
new FarmersBook();
new Food();
new Knife();
new FertilizerItem();
new BlockFood();
new CookingPotRecipeRegistries();

new RiceRollMedleyComponentRegister();
new CropComponentRegister()
new InteractComponentRegister()
new WildCropComponentRegister();
new RichSoilComponentRegister();
new RichSoilFarmlandComponentRegister();
new MushroomColonyComonentRegister();
new OrganicCompostComonentRegister();
new RopeComponentRegister();
new TatamMatComponentRegister();
new TatamComponentRegister();
new StoveComponentRegister();

new ColoniesComonentRegister();
new RiceSeedComponentRegister();