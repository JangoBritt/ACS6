import { itemApplyDamage } from '../util/utils';

export class MfItemBreakBlock {
	onMineBlock(e) {
		const { itemStack, source } = e;
		itemApplyDamage(source, itemStack);
	}
}
export class MfBeerEffects {
	onConsume(e) {
		const { source } = e;
		source.addEffect("nausea", 180, {amplifier: 2});
		source.addEffect("hunger", 1200, {amplifier: 2});
	}
}