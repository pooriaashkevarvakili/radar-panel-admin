<template>
	<div class="login-page-container">
		<div class="content-container">
			<img class="logo-image" src="/img/logo.svg" />
			<p class="welcome">خوش آمدید</p>
			<p class="login">ورود به پنل</p>
			<ra-input v-model="username" :label="'نام کاربری'" />
			<ra-input v-model="password" :label="'رمز ورود'" :type="'password'" />
			<ra-checkbox v-model="rememberMe" :label="'مرا به خاطر بسپار'" />
			<ra-button class="login-button" :size="'big'" full-width @click="submit">
				ورود
			</ra-button>
		</div>
		<div class="image-container">
			<img class="image-background" src="/img/login.png" />
			<p class="description">
				از طریق سرویس مدیریت شهرت می‌توانید از وضعیت رضایت یا عدم رضایت
				کاربرانتان مطلع شوید |
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

// components
import RaInput from '~/components/RaInput.vue';
import RaCheckbox from '~/components/RaCheckbox.vue';
import RaButton from '~/components/RaButton.vue';

// store
import auth, { AuthModule } from '~/store/auth';

export default Vue.extend({
	layout: 'auth',
	components: { RaInput, RaCheckbox, RaButton },
	computed: {
		authStore(): AuthModule {
			return auth.of(this.$store);
		},
		username: {
			get(): string {
				return this.authStore.state.username;
			},
			set(value: string) {
				this.authStore.username = value;
			}
		},
		password: {
			get(): string {
				return this.authStore.state.password;
			},
			set(value: string) {
				this.authStore.password = value;
			}
		},
		rememberMe: {
			get(): boolean {
				return this.authStore.state.rememberMe;
			},
			set(val: boolean) {
				this.authStore.rememberMe = val;
			}
		}
	},
	methods: {
		async submit() {
			try {
				await this.authStore.login();
			} catch (error) {
				if ((error as any).response?.data?.Message) {
					this.$swal({
						title: 'خطا',
						text: (error as any).response?.data?.Message
					});
				}
			}
		}
	}
});
</script>

<style lang="scss" scoped>
.login-page-container {
	display: flex;
	min-width: 100vw;
	min-height: 100vh;
}

.content-container {
	flex: 4 0 560px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 105px;
	.logo-image {
	}
	.welcome {
		margin-bottom: 2px;
		font-size: 16px;
		line-height: 19px;
		text-align: center;
		color: #424242;
	}
	.login {
		font-style: normal;
		font-weight: 500;
		font-size: 26px;
		line-height: 41px;
		text-align: center;
		color: #424242;
		margin-bottom: 30px;
	}

	.login-button {
		margin-top: 25px;
	}
}

.image-container {
	flex: 6 1 61%;
	position: relative;

	.image-background {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.description {
		position: absolute;
		right: 69px;
		bottom: 48px;
		// text
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 27px;
		text-align: right;
		color: #ffffff;
	}
}
</style>
