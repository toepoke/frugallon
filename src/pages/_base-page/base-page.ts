import { AppActions } from './../../bricks/stores/actions/app.actions';
import { IAppState } from './../../bricks/stores/iapp.state';
import { Store } from '@ngrx/store';
import { ePages } from '../../bricks/models';

export class BasePage {
	protected _page: ePages = ePages.Empty;
	protected _store: Store<IAppState> = null;
	protected _appActions: AppActions = null;

	constructor(
		store: Store<IAppState>,
		appActions: AppActions,
		page: ePages
	) {
		this._store = store;
		this._appActions = appActions;
		this._page = page;
		
	}

	protected onViewDidEnter(): void {
		this._store.dispatch(
			this._appActions.ChangePage(this._page)
		);
	}

	protected onViewDidLeave(): void {
	}

	protected onViewPop(): void {
		this._store.dispatch(
			this._appActions.PopPage()
		);
	}

}