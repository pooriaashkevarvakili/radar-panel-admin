import { ModuleAccessor, Module, mutation } from 'vuex-module-accessor';

export type SnackBar = {
	show: boolean;
	text: string;
	timeout: number;
};
class LayoutState {
	isDrawerOpen: boolean = false;
	snackBar: SnackBar = {
		show: false,
		text: '',
		timeout: 5000
	};
	breadcrumbs: string[] = ['مدیریت شهرت'];
}

export class LayoutModule extends Module<LayoutState> {
	constructor() {
		super(LayoutState);
	}

	/**
	 * show snack bar
	 *
	 * @param {string} text
	 * @memberof LayoutModule
	 */
	@mutation
	showSnack(snack: Partial<SnackBar>) {
		for (const k in snack) {
			(this.state.snackBar as any)[k] = (snack as any)[k];
		}
	}

	/**
	 * set is drawer open to toggle it
	 *
	 * @memberof LayoutModule
	 */
	set isDrawerOpen(is: boolean) {
		this.state.isDrawerOpen = is;
	}
}

export default new ModuleAccessor(new LayoutModule(), 'layout/');
