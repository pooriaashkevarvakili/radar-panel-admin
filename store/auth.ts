import { ModuleAccessor, Module, mutation } from 'vuex-module-accessor';

import { LoginApi } from '~/api/auth';

class AuthState {
	token: string | null = null;
	username: string = '';
	password: string = '';
	rememberMe: boolean = false;
}

const loginApi = new LoginApi();

export class AuthModule extends Module<AuthState> {
	constructor() {
		super(AuthState);
	}

	/**
	 *	set token (from props or localStorage)
	 *
	 * @memberof AuthModule
	 */
	@mutation
	setToken(token?: string | null) {
		if (token !== undefined) {
			if (token) {
				const expire = new Date();
				expire.setDate(expire.getDate() + 7);
				localStorage.setItem('token', token);
				localStorage.setItem('tokenExpireDate', expire.toISOString());
				this.state.token = token;
			} else {
				localStorage.removeItem('token');
				localStorage.removeItem('tokenExpireDate');
				this.state.token = null;
			}
		} else {
			const tokenExpireDate = localStorage.getItem('tokenExpireDate');
			if (
				tokenExpireDate &&
				new Date(tokenExpireDate).getTime() > new Date().getTime()
			) {
				this.state.token = localStorage.getItem('token');
			} else {
				localStorage.removeItem('token');
				localStorage.removeItem('tokenExpireDate');
				this.state.token = null;
			}
		}
	}

	/**
	 * set username (phone number)
	 *
	 * @memberof AuthModule
	 */
	set username(username: string) {
		this.state.username = username;
	}

	/**
	 * set password
	 *
	 * @memberof AuthModule
	 */
	set password(password: string) {
		this.state.password = password;
	}

	/**
	 * set rememberMe to vuex state
	 *
	 * @memberof AuthModule
	 */
	set rememberMe(val: boolean) {
		this.state.rememberMe = val;
	}

	/**
	 * login user
	 *
	 * @memberof AuthModule
	 */
	async login() {
		const response = await loginApi.apiLoginVerifyUserNamePost({
			loginRequestDto: {
				password: this.state.password,
				userName: this.state.username,
				rememberMe: this.state.rememberMe
			}
		});
		this.setToken(response.data.token);
		response.data.userDetails;
		this.context.store?.$router.replace('/');
	}

	/**
	 * logout user
	 *
	 * @memberof AuthModule
	 */
	logout() {
		this.setToken(null);
	}
}

export default new ModuleAccessor(new AuthModule(), 'auth/');
