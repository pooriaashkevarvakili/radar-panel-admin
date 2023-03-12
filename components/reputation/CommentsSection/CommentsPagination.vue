<template>
	<footer class="comments-pagination">
		<div class="select-container">ردیف در صفحه :</div>
		<select v-model="pageSize">
			<option :value="8">8</option>
			<option :value="16">16</option>
			<option :value="32">32</option>
		</select>
		<div class="count-text">
			{{ count }}
		</div>
		<ra-button
			:type="'transparent'"
			:icon="'chevron-right'"
			:icon-type="'solid'"
			icon-button
			@click="nextPage"
		/>
		<ra-button
			:type="'transparent'"
			:icon="'chevron-left'"
			:icon-type="'solid'"
			icon-button
			@click="prevPage"
		/>
	</footer>
</template>

<script lang="ts">
import Vue from 'vue';

// stores
import ReputationStore, { ReputationModule } from '~/store/reputation';

// components
import RaButton from '~/components/RaButton.vue';

export default Vue.extend({
	components: { RaButton },
	computed: {
		reputationStore(): ReputationModule {
			return ReputationStore.of(this.$store);
		},
		pageSize: {
			get(): number {
				return this.reputationStore.state.pageSize;
			},
			set(val: number) {
				this.reputationStore.pageSize = val;
				this.reputationStore.getComments();
			}
		},
		count(): string {
			const from =
				(this.reputationStore.state.pageIndex - 1) *
					this.reputationStore.state.pageSize +
				1;
			const to =
				this.reputationStore.state.pageIndex *
				this.reputationStore.state.pageSize;
			return `${from}-${to} از ${this.reputationStore.state.totalCount}`;
		}
	},
	methods: {
		nextPage() {
			this.reputationStore.pageIndex = this.reputationStore.state.pageIndex + 1;
			this.reputationStore.getComments();
		},
		prevPage() {
			if (this.reputationStore.state.pageIndex < 2) return;
			this.reputationStore.pageIndex = this.reputationStore.state.pageIndex - 1;
			this.reputationStore.getComments();
		}
	}
});
</script>

<style lang="scss" scoped>
.comments-pagination {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-top: 1px solid #dfe0eb;
	height: 71px;
	background: #ffffff;
	border-radius: 0px 0px 8px 8px;
}

select {
	border: none;
	font-family: IRANSans-X;
}

option {
	font-family: IRANSans-X;
}

.count-text {
	margin: 0 50px 0 38px;
	font-size: 16px;
	line-height: 20px;
	text-align: right;
	letter-spacing: 0.3px;
	color: #9fa2b4;
}
</style>
