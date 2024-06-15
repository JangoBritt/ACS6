var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BlockPermutation, Direction, system, world } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";
export class TatamiBlock {
    placeBlock(args) {
        const block = args.block;
        const itemStack = args.itemStack;
        if (!(itemStack?.typeId == "farmersdelight:tatami" && block.typeId == "farmersdelight:tatami" && block.permutation.getState('farmersdelight:connection') == "none"))
            return;
        let { x, y, z } = block.location;
        const dimension = block.dimension;
        const face = args.face;
        system.run(() => {
            const blockPermutation = BlockPermutation.resolve('farmersdelight:tatami');
            const permutation = block.permutation;
            let thisPerm = 'south';
            let neighborPerm = 'north';
            switch (face) {
                case Direction.North:
                    thisPerm = 'south';
                    neighborPerm = 'north';
                    z -= 1;
                    break;
                case Direction.South:
                    thisPerm = 'north';
                    neighborPerm = 'south';
                    z += 1;
                    break;
                case Direction.East:
                    thisPerm = 'west';
                    neighborPerm = 'east';
                    x += 1;
                    break;
                case Direction.West:
                    thisPerm = 'east';
                    neighborPerm = 'west';
                    x -= 1;
                    break;
                case Direction.Up:
                    thisPerm = 'down';
                    neighborPerm = 'up';
                    y += 1;
                    break;
                case Direction.Down:
                    thisPerm = 'up';
                    neighborPerm = 'down';
                    y -= 1;
                    break;
                default:
                    break;
            }
            ;
            if (dimension.getEntitiesAtBlockLocation({ x, y, z }).length != 0 && dimension.getBlock({ x, y, z })?.typeId != 'farmersdelight:tatami')
                return;
            block.setPermutation(permutation.withState('farmersdelight:connection', neighborPerm));
            dimension.getBlock({ x, y, z })?.setPermutation(blockPermutation.withState("farmersdelight:connection", thisPerm));
        });
    }
}
__decorate([
    methodEventSub(world.beforeEvents.playerPlaceBlock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TatamiBlock.prototype, "placeBlock", null);
//# sourceMappingURL=TatamiBlock.js.map