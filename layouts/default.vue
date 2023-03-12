<template>
	<div class="main-layout-container">
		<transition name="drawer">
			<aside v-if="showDrawer" class="panel-sidebar-container">
				<div class="logo-container">
					<img class="logo" src="/img/logo.svg" />
				</div>
				<nuxt-link
					v-for="item in items"
					:key="item.icon"
					:to="item.to"
					class="nav-item-container"
				>
					<ra-icon class="icon" :name="item.icon" :type="'solid'" />
					<div class="title">
						{{ item.title }}
					</div>
				</nuxt-link>
			</aside>
		</transition>
		<div class="main-page-container">
			<header class="header">
				<ra-icon
					class="bars-icon"
					:name="'bars'"
					:type="'solid'"
					:color="'var(--radar-red)'"
					:size="'small'"
					@click="showDrawer = !showDrawer"
				/>
				<div class="title">{{ title }}</div>
				<template v-for="(b, i) in breadcrumbs">
					<ra-icon
						class="bicon"
						:key="`icon-${i}`"
						:name="'angle-left'"
						:type="'solid'"
						:color="'#9FA2B4'"
						:size="'x-small'"
					/>
					<div class="breadcrumb" :key="`breadcrumb-${i}`">
						{{ b }}
					</div>
				</template>
				<hr class="logout-divider" />
				<ra-button
					:type="'transparent'"
					:icon="'sign-out-alt'"
					:iconType="'solid'"
					:iconColor="'black'"
					:iconPos="'right'"
					:size="'big'"
					@click="logout"
				>
					خروج
				</ra-button>
			</header>
			<nuxt-child />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosError } from 'axios';
import { typedMapState } from 'vuex-module-accessor';

// components
import RaIcon from '~/components/RaIcon.vue';
import RaButton from '~/components/RaButton.vue';

// store
import layout, { LayoutModule, SnackBar } from '~/store/layout';
import auth, { AuthModule } from '~/store/auth';
import reputation, { ReputationModule } from '~/store/reputation';

export default Vue.extend({
	components: { RaIcon, RaButton },
	data() {
		return {
			items: [
				{
					title: 'مدیریت شهرت',
					icon: 'chart-pie',
					to: '/'
				}
			],
			errors: [] as SnackBar[],
			showDrawer: true
		};
	},
	computed: {
		authStore(): AuthModule {
			return auth.of(this.$store);
		},
		layoutStore(): LayoutModule {
			return layout.of(this.$store);
		},
		reputationStore(): ReputationModule {
			return reputation.of(this.$store);
		},
		...typedMapState(layout, {
			snackText: state => state.snackBar.text,
			timeout: state => state.snackBar.timeout,
			breadcrumbs: state => state.breadcrumbs
		}),
		title(): string {
			return this.reputationStore.state.currentAccommodation?.nameFa || '';
		},
		drawer: {
			get(): boolean {
				return this.layoutStore.state.isDrawerOpen;
			},
			set(value: boolean) {
				this.layoutStore.isDrawerOpen = value;
			}
		},
		showSnackbar: {
			get(): boolean {
				return this.layoutStore.state.snackBar.show;
			},
			set(value: boolean) {
				this.layoutStore.showSnack({
					show: value,
					text: ''
				});
			}
		}
	},
	beforeMount() {
		this.authStore.setToken();
		if (!this.authStore.state.token) {
			this.$router.replace('/login');
		}
		axios.interceptors.request.use(
			config => {
				const token = this.authStore.state.token;
				config.headers.Authorization = 'Bearer ' + token;
				return config;
			},
			error => {
				return Promise.reject(error);
			}
		);
		axios.interceptors.response.use(
			response => {
				return response;
			},
			(error: AxiosError) => {
				if (error.response?.status === 401 || error.response?.status === 403) {
					this.authStore.logout();
					this.$router.replace('/login');
				}
				if (error.response && (error.response as any).data.errors) {
					const errors = (error.response as any).data.errors as {
						[key: string]: string;
					};

					this.errors = Object.keys(errors).map(key => ({
						show: true,
						text: errors[key][0],
						timeout: 2500
					}));
				} else if (error.response && (error.response as any).data.Message) {
					this.layoutStore.showSnack({
						show: true,
						text: (error.response as any).data.Message as string
					});
				}
				return Promise.reject(error);
			}
		);
	},
	methods: {
		async logout() {
			const { isConfirmed } = await this.$swal({
				text: 'آیا می‌خواهید خارج شوید؟',
				confirmButtonText: 'بله',
				showCancelButton: true,
				cancelButtonText: 'خیر'
			});
			if (isConfirmed) {
				this.authStore.logout();
				this.$router.push('/login');
			}
		}
	}
});
</script>

<style lang="scss" scoped>
$duration: 0.2s;

.drawer-leave-active {
	animation: $duration leave-animation;
}

.drawer-enter-active {
	animation: $duration enter-animation;
}

@keyframes enter-animation {
	from {
		transform: translateX(100%);
	}

	to {
		transform: translateX(0);
	}
}

@keyframes leave-animation {
	from {
		transform: translateX(0);
	}

	to {
		transform: translateX(100%);
	}
}

.main-layout-container {
	display: flex;
}

.panel-sidebar-container {
	flex: 0 0 255px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	min-height: 100vh;
	width: 255px;
	background: #ffffff;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.logo-container {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0px 16px;
	width: 255px;
	height: 64.85px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.12);
	margin-bottom: 11px;

	.logo {
	}
}

.nav-item-container {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 0px 16px 0px 8px;
	height: 42px;
	background: rgba(0, 0, 0, 0.02);
	border-radius: 4px;
	margin: 5px 8px;
	text-decoration: none;

	.icon {
		color: #808080;
	}

	.title {
		font-style: normal;
		font-weight: 500;
		font-size: 13px;
		line-height: 16px;
		margin-right: 16px;
		color: #808080;
	}

	&.nuxt-link-exact-active {
		.icon,
		.title {
			color: #000000;
		}
	}
}

.main-page-container {
	flex: 1;
	background: #f2f6fc;
}

.header {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	height: 64px;
	padding: 8px 16px;
	background: #ffffff;
	box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.12);

	.bars-icon {
		cursor: pointer;
	}

	.title {
		font-style: normal;
		font-weight: 500;
		font-size: 17px;
		line-height: 27px;
		text-align: right;
		letter-spacing: 0.3px;
		color: #000000;
		border-right: 1px solid #dadada;
		padding-right: 16px;
		margin-right: 16px;
	}

	.breadcrumb {
		font-size: 17px;
		line-height: 20px;
		text-align: right;
		letter-spacing: 0.3px;
		color: #000000;
	}

	.bicon {
		width: 12px !important;
		margin: 0 8px;
	}

	.logout-divider {
		height: 32px;
		width: 1px;
		border-right: 1px solid #dadada;
		margin: 0 auto 0 0;
	}
}
</style>
