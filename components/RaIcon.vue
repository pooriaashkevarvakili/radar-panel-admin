<template>
	<span
		class="ra-icon-container"
		:class="[`${size}`, `mobile-${mSize}`]"
		v-on="$listeners"
	>
		<font-awesome-icon
			v-if="name"
			:icon="[`fa-${type}`, `fa-${name}`]"
			:style="{
				color
			}"
			:rotation="rotation"
		/>
	</span>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// types
export type IconSize =
	| 'x-large'
	| 'large'
	| 'medium'
	| 'small'
	| 'x-small'
	| 'free';
export type IconType = 'regular' | 'solid' | 'light' | 'brands';

export default Vue.extend({
	components: { FontAwesomeIcon },
	props: {
		name: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: 'inherit'
		},
		size: {
			type: String as PropType<IconSize>,
			default: 'medium'
		},
		mSize: {
			type: String as PropType<IconSize>,
			default: undefined
		},
		type: {
			type: String as PropType<IconType>,
			default: 'regular'
		},
		rotation: {
			type: String,
			default: undefined
		}
	}
});
</script>

<style scoped lang="scss">
@mixin x-large() {
	width: 48px;
	height: 48px;
	font-size: 28px;
}
@mixin large() {
	width: 32px;
	height: 32px;
	font-size: 22px;
}
@mixin medium() {
	width: 24px;
	height: 24px;
	font-size: 18px;
}
@mixin small() {
	width: 20px;
	height: 20px;
	font-size: 16px;
}
@mixin x-small() {
	width: 13px;
	height: 13px;
	font-size: 14px;
}
.ra-icon-container {
	display: flex;
	align-items: center;
	justify-content: center;

	&::before {
		color: inherit;
	}

	// size
	&.x-large {
		@include x-large();
	}
	&.large {
		@include large();
	}
	&.medium {
		@include medium();
	}
	&.small {
		@include small();
	}
	&.x-small {
		@include x-small();
	}
}
</style>
