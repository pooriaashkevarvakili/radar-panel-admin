<template>
	<div class="filters-container">
		<div>
			<div class="title">فیلتر نظرات</div>
			<div class="list-title">امتیاز</div>
			<div class="filter-list">
				<rate-view
					v-for="rate in rates"
					:key="rate.title"
					:rate="rate"
					:selected="currentRate === rate.key"
					@click="setRateFilter(rate)"
				/>
			</div>

			<div class="list-title">منبع</div>
			<div class="filter-list">
				<source-view
					v-for="source in sources"
					:key="source.title"
					:source="source"
					@click="setSourceFilter(source)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

// components
import RateView, { RateInfo } from './RateView.vue';
import SourceView, { SourceInfo } from './SourceView.vue';

// stores
import ReputationStore, { ReputationModule } from '~/store/reputation';

export default Vue.extend({
	components: { RateView, SourceView },
	computed: {
		reputationStore(): ReputationModule {
			return ReputationStore.of(this.$store);
		},
		currentRate(): string | null {
			return this.reputationStore.state.rate;
		},
		rates(): RateInfo[] {
			return [
				{
					icon: 'face-smile',
					title: 'مثبت',
					color: '#8DC100',
					key: 'HIGH'
				},
				{
					icon: 'face-meh',
					title: 'میانه',
					color: '#FFAA00',
					key: 'MID'
				},
				{
					icon: 'face-frown',
					title: 'منفی',
					color: '#F3273F',
					key: 'LOW'
				},
				{
					title: 'همه',
					key: null
				}
			];
		},
		sources(): SourceInfo[] {
			return [
				...this.reputationStore.state.sources.map(s => ({
					id: s.id || null,
					title: s.name || '',
					image: s.slug
						? `/img/sources/${s.slug}.svg`
						: '/img/sources/default.png',
					isSelected: s.id === this.reputationStore.state.sourceId
				})),
				{
					id: null,
					isSelected: false,
					title: 'همه'
				}
			];
		}
	},
	methods: {
		setRateFilter(rate: RateInfo) {
			this.reputationStore.rate = rate.key;
			this.reputationStore.getComments();
		},
		setSourceFilter(source: SourceInfo) {
			this.reputationStore.sourceId = source.id;
			this.reputationStore.getComments();
		}
	}
});
</script>

<style lang="scss" scoped>
.filters-container {
	width: 364px;
	background: #ffffff;
	border: 1px solid #dfe0eb;
	border-radius: 8px;
	height: 430px;
	padding-bottom: 20px;
}

.title {
	display: flex;
	align-items: center;
	padding-right: 27px;
	height: 50px;
	border-bottom: 1px solid #dfe0eb;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 23px;
	text-align: right;
	letter-spacing: 0.2px;
	color: #000000;
}

.list-title {
	display: flex;
	align-items: center;
	padding-right: 27px;
	margin: 25px 0 15px 0;
	font-size: 14px;
	line-height: 20px;
	text-align: right;
	letter-spacing: 0.2px;
	color: #252733;
}

.filter-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0 27px;
	gap: 10px;
}
</style>
