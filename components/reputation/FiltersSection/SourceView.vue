<template>
	<div
		class="source-view-container"
		:class="{ rounded: !source.id, selected: source.isSelected }"
		@click="$emit('click')"
	>
		<img v-if="source.image" :src="source.image" />
		<div class="title">
			{{ source.title }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

// components
import RaIcon from '~/components/RaIcon.vue';

// types
export type SourceInfo = {
	id: number | null;
	title: string;
	image?: string;
	isSelected: boolean;
};

export default Vue.extend({
	components: { RaIcon },
	props: {
		source: {
			type: Object as PropType<SourceInfo>,
			required: true
		}
	}
});
</script>

<style lang="scss" scoped>
.source-view-container {
	flex: 1 1 calc(50% - 10px);
	display: flex;
	align-items: center;
	justify-content: center;
	height: 30px;
	box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
	border-radius: 4px;
	cursor: pointer;
	background: #0093ee;
	&.selected {
		background: #0c3d84;
	}
	&.rounded {
		border: 1px solid #0093ee;
		background: white;
		.title {
			color: #0c3d84;
		}
	}
	img {
		object-fit: contain;
		width: 16px;
		height: 16px;
		background: #d0e7ff;
		border-radius: 3px;
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
