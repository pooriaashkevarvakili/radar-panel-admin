<template>
	<section class="comments-section-container">
		<filters-header />
		<template v-if="isLoading">
			<div class="comments-loader loading-skeleton" />
			<div class="comments-loader loading-skeleton" />
			<div class="comments-loader loading-skeleton" />
		</template>
		<comment-view
			v-else
			v-for="comment in comments"
			:key="comment.description"
			:item="comment"
		/>
		<comments-pagination />
	</section>
</template>

<script lang="ts">
import Vue from 'vue';

// components
import FiltersHeader from './FilterHeader.vue';
import CommentView from './CommentView.vue';
import CommentsPagination from './CommentsPagination.vue';

// stores
import ReputationStore, { ReputationModule } from '~/store/reputation';

// types
import { CommentDetailsDto } from '~/api/reputation';

export default Vue.extend({
	components: { FiltersHeader, CommentView, CommentsPagination },
	computed: {
		reputationStore(): ReputationModule {
			return ReputationStore.of(this.$store);
		},
		comments(): CommentDetailsDto[] {
			return this.reputationStore.state.comments;
		},
		isLoading(): boolean {
			return this.reputationStore.state.isLoadingComments;
		}
	}
});
</script>

<style lang="scss" scoped>
.comments-section-container {
	flex: 3 1 75%;
}

.comments-loader {
	width: 100%;
	height: 200px;
	margin: 4px 0;
}
</style>
