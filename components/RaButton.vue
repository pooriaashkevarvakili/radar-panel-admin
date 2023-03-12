<template>
	<button
		class="ra-button"
		:class="[
			type,
			size,
			{
				'icon-right': iconPos === 'right',
				'icon-left': iconPos === 'left',
				fullWidth,
				'icon-button': iconButton
			}
		]"
		:disabled="disabled"
		@click="$emit('click')"
	>
		<slot />
		<ra-icon
			v-if="icon !== ''"
			class="icon"
			:name="icon"
			:type="iconType"
			:color="iconColor"
			:size="'x-small'"
		/>
	</button>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';

// components
import RaIcon, { IconType } from '~/components/RaIcon.vue';

// types
type ButtonType = 'primary' | 'transparent';
type ButtonSize = 'small' | 'medium' | 'big';

export default Vue.extend({
	name: 'IgButton',
	components: { RaIcon },
	props: {
		type: {
			type: String as PropType<ButtonType>,
			default: 'primary'
		},
		size: {
			type: String as PropType<ButtonSize>,
			default: 'small'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		iconButton: {
			type: Boolean,
			default: false
		},
		iconPos: {
			type: String as PropType<'right' | 'left'>,
			default: 'left'
		},
		icon: {
			type: String,
			default: ''
		},
		iconType: {
			type: String as PropType<IconType>,
			default: 'regular'
		},
		iconColor: {
			type: String,
			default: '#9FA2B4'
		},
		fullWidth: {
			type: Boolean,
			default: false
		}
	}
});
</script>

<style scoped lang="scss">
.ra-button {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	border: 0;
	outline: none;
	cursor: pointer;
	overflow: hidden;
	box-sizing: border-box;
	// text
	font-family: IRANSans-X;
	text-align: center;

	&.icon-button {
		.icon {
			margin: 0 !important;
		}
	}

	// icon pos
	&.icon-left {
		flex-direction: row;
		.icon {
			margin-right: 10px;
		}
	}
	&.icon-right {
		flex-direction: row-reverse;
		.icon {
			margin-left: 10px;
		}
	}

	// size
	&.big {
		height: 50px;
		padding: 10px 15px;
		// text
		text-align: right;
		font-size: 14px;
		line-height: 30px;
		font-weight: normal;
		&.icon-button {
			width: 50px;
		}
	}
	&.medium {
		height: 39px;
		padding: 10px 15px;
		// text
		text-align: right;
		font-size: 12px;
		line-height: 19px;
		font-weight: normal;
		&.icon-button {
			width: 39px;
		}
	}
	&.small {
		height: 29px;
		padding: 5px 10px;
		// text
		text-align: right;
		font-size: 12px;
		line-height: 19px;
		font-weight: normal;
		&.icon-button {
			width: 29px;
		}
	}

	// type
	&.primary {
		box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
		background: $radar-red;
		color: #fff !important;
		.icon {
			color: #fff !important;
		}
		&:hover {
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
		}
		&:active {
			background: $radar-red;
			color: #ffffff;
			box-shadow: none;
			.icon {
				color: #ffffff !important;
			}
		}
		&:disabled {
			cursor: not-allowed;
			background: #f2f2f2;
			color: #b2b2b2;
			box-shadow: none;
			.icon {
				color: #b2b2b2 !important;
			}
			&:hover {
				border: none;
				background: #f2f2f2;
				box-shadow: none;
			}
		}
	}

	&.transparent {
		background: transparent;
		color: #000 !important;
		&:hover {
			background: rgba($color: #000000, $alpha: 0.1);
		}
		&:active {
			background: rgba($color: #000000, $alpha: 0.2);
		}
		&:disabled {
			cursor: not-allowed;
			background: #f2f2f2;
			color: #b2b2b2;
			box-shadow: none;
			.icon {
				color: #b2b2b2 !important;
			}
			&:hover {
				border: none;
				background: #f2f2f2;
				box-shadow: none;
			}
		}
	}
}
.fullWidth {
	width: 100%;
}
</style>
