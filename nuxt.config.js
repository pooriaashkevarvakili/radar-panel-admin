import webpack from 'webpack';

export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// env variables
	env: {
		ACCOMMODATIONS_SERVICE_BASE_URL: process.env.ACCOMMODATIONS_SERVICE_BASE_URL,
		USERS_SERVICE_BASE_URL: process.env.USERS_SERVICE_BASE_URL,
	},

	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'پنل فروشندگان | رادار۳۶۱',
		htmlAttrs: {
			lang: 'fa',
			dir: 'rtl'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
			{ name: 'msapplication-TileColor', content: 'white' },
			{ name: 'theme-color', content: '#da532c' }
		],
		link: [
			// favicon
			{
				rel: 'shortcut icon',
				type: 'image/x-icon',
				href: '/favicon.ico'
			},
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png'
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png'
			},
			{
				rel: 'mask-icon',
				href: '/safari-pinned-tab.svg',
				color: '#da532c'
			},
			{ rel: 'manifest', href: '/site.webmanifest' },
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png'
			}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/static/fonts/font-faces.css', '~/assets/scss/common.scss'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/fontawesome.ts', '~/plugins/dayjs', '~/plugins/api.js', { src: '~/plugins/apex-chart.js', mode: 'client' },],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: false,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		'@nuxtjs/style-resources'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'vue-sweetalert2/nuxt'
	],

	sweetalert: {
		confirmButtonColor: '#EB384D',
		cancelButtonColor: '#FFAA00',
		confirmButtonText: 'باشه'
	},

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: '/'
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
	},

	styleResources: {
		scss: ['~/assets/scss/variables.scss']
	}
};
