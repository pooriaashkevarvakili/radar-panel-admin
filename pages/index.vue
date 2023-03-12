<template>
	<div class="reputation-container">
		<dates-header />
		<statistics />
		<comments />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

// components
import DatesHeader from '~/components/reputation/DatesHeader.vue';
import Statistics from '~/components/reputation/Statistics.vue';
import Comments from '~/components/reputation/Comments.vue';

// stores
import ReputationStore from '~/store/reputation';

export default Vue.extend({
	components: { DatesHeader, Statistics, Comments },
	async beforeMount() {
		await ReputationStore.of(this.$store).getAccommodation();
		ReputationStore.of(this.$store).getReport();
		ReputationStore.of(this.$store).getComments();
		ReputationStore.of(this.$store).getSources();
	}
});
</script>

<style lang="scss" scoped>
.reputation-container {
	display: flex;
	flex-direction: column;
	padding: 0 31.5px 120px 31.5px;
}
</style>
