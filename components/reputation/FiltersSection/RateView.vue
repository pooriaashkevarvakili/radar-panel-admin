<template>
	<div
		class="rate-view-container"
		:class="{ rounded: !rate.key, selected }"
		:style="{ '--background': rate.color }"
		@click="$emit('click')"
	>
		<ra-icon
			v-if="rate.icon"
			:color="'white'"
			:name="rate.icon"
			:size="'small'"
		/>
		<div class="title">
			{{ rate.title }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

// components
import RaIcon from '~/components/RaIcon.vue';

// types
export type RateInfo = {
	icon?: string;
	title: string;
	color?: string;
	key: string | null;
};

export default Vue.extend({
	components: { RaIcon },
	props: {
		rate: {
			type: Object as PropType<RateInfo>,
			required: true
		},
		selected: {
			type: Boolean,
			default: false
		}
	}
});
</script>

<style lang="scss" scoped>
.rate-view-container {
	flex: 1 1 calc(50% - 10px);
	display: flex;
	align-items: center;
	justify-content: center;
	height: 30px;
	box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
	border-radius: 4px;
	background: var(--background);
	cursor: pointer;
	&.selected {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.21), rgba(0, 0, 0, 0.21)),
			var(--background);
	}
	&.rounded {
		border: 1px solid #0093ee;
		.title {
			color: #0c3d84;
		}
	}
	.title {
		font-style: normal;
		font-weight: 400;
		font-size: 13px;
		line-height: 20px;
		color: #ffffff;
		margin-right: 8px;
	}
}
</style>
