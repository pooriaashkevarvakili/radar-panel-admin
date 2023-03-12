<template>
	<div class="filters-container">
		<div class="title">کلمات کلیدی</div>
		<div style="margin-top: 30px" class="filter-list">
			<rate-view
				v-for="(keyword, index) in keywords"
				:key="index"
				:selected="currentRate === keyword.key"
				@onClick="setRateFilter(keyword)"
				:rate="keyword"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

// components
import RateView, { RateInfo } from './RateViewOne.vue';
import SourceView, { SourceInfo } from './SourceView.vue';

// stores
import KeywordStore, { KeywordModule } from '~/store/keyword';
import ReputationStore, { ReputationModule } from '~/store/reputation';

export default Vue.extend({
	components: { RateView, SourceView },

	data() {
		return {
			keywords: []
		};
	},
	computed: {
		currentRate(): string | null {
			return this.reputationStore.state.rate;
		},
		reputationStore(): ReputationModule {
			return ReputationStore.of(this.$store);
		},
		keywordStore(): KeywordModule {
			return KeywordStore.of(this.$store);
		},
		currentKeyword(): any {
			return this.reputationStore.state.searchKey || '';
		},
		rates(): RateInfo[] {
			return [
				{
					icon: 'face-smile',
					title: '',
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
				}
			];
		}
	},
	methods: {
		setRateFilter(rate: RateInfo) {
			this.reputationStore.searchKey = rate.title;
			this.reputationStore.getComments();
		},
		setSourceFilter(source: SourceInfo) {
			// this.keywordStore.sourceId = source.id;
			// this.keywordStore.getComments();
		},
		async pooria() {
			const keywords = await this.keywordStore.getWords();
			this.keywords = keywords.map((key: any, index: any) => {
				return {
					title: key,
					index: 1,
					icon: ''
				};
			});
		}
	},
	mounted() {
		this.pooria();
	}
});
</script>

<style lang="scss" scoped>
.filters-container {
	width: 364px;
	background: #ffffff;
	border: 1px solid #dfe0eb;
	border-radius: 8px;
	height: 460px;
	padding-bottom: 20px;
	margin-top: 10px;
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
