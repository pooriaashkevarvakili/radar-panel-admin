<template>
	<div class="comments-container">
		<comments-section />
		<div class="d-flex flex-column">
			<filters-section />

			<KeyWords />
			<Superwords />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

// components
import CommentsSection from './CommentsSection/CommentsSection.vue';
import FiltersSection from './FiltersSection/FiltersSection.vue';
import KeyWords from './FiltersSection/keywordsSection.vue';
import Superwords from './FiltersSection/SuperWords.vue';
export default Vue.extend({
	components: {
		CommentsSection,
		FiltersSection,
		KeyWords,
		Superwords
	}
});
</script>

<style lang="scss" scoped>
.comments-container {
	align-self: stretch;
	display: flex;
	width: 100%;
	gap: 20px;
	margin-top: 20px;
}
</style>
