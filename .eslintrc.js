module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'prettier',
		'prettier/vue',
		'plugin:prettier/recommended',
		'plugin:nuxt/recommended'
	],
	plugins: ['prettier'],
	ignorePatterns: ['api/**/*.ts'],
	// add your custom rules here
	rules: {
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		'vue/html-indent': ['error', 'tab'],
		semi: 'off',
		'@typescript-eslint/semi': ['error', 'always'],
		'no-dupe-class-members': 'off',
		'@typescript-eslint/no-dupe-class-members': ['error'],
		'no-console': 'off',
		'vue/no-v-html': 'off',
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always'
			}
		],
		curly: ['error', 'multi-line'],
		'object-shorthand': 'off',
		'no-useless-constructor': 'off',
		'no-unused-vars': 'off',
		'no-mixed-operators': 'off',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',
		'no-array-constructor': 'off',
		'no-throw-literal': 'off',
		'accessor-pairs': 'off',
		'no-misleading-character-class': 'off',
		'no-prototype-builtins': 'off'
	}
};

