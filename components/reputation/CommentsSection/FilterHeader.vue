<template>
	<header class="filters-header-container">
		<div class="title">مرتب سازی بر اساس:</div>
		<div
			v-for="sort in sorts"
			:key="sort.value"
			class="sort-item"
			:class="{ selected: sort.isSelected }"
			@click="setSort(sort)"
		>
			{{ sort.title }}
			<svg
				v-if="sort.isSelected"
				class="icon"
				width="23"
				height="13"
				viewBox="0 0 23 13"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M2.16774 10.3929L11.5 1.06066L20.8323 10.3929L11.5 10.3929L2.16774 10.3929Z"
					stroke="#DFE0EB"
					stroke-width="1.5"
				/>
				<path
					d="M22.6429 12.8572L11.5 1.71429L0.357079 12.8572H11.5H22.6429Z"
					fill="white"
				/>
			</svg>
		</div>
		<ra-input
			v-model="searchKey"
			class="search-input"
			hide-container
			:placeholder="'جستجو'"
		/>
	</header>
</template>

<script lang="ts">
import Vue from 'vue';
import { typedMapState } from 'vuex-module-accessor';

// components
import RaInput from '~/components/RaInput.vue';

// stores
import ReputationStore, { ReputationModule } from '~/store/reputation';

// types
type SortItem = {
	title: string;
	value: 'Newest' | 'MinRate' | 'MaxRate';
	isSelected: boolean;
};

export default Vue.extend({
	components: { RaInput },
	computed: {
		...typedMapState(ReputationStore, {
			sortBy: s => s.sortBy,
			sortDirection: s => s.sortDirection
		}),
		reputationStore(): ReputationModule {
			return ReputationStore.of(this.$store);
		},
		sorts(): SortItem[] {
			return [
				{
					title: 'آخرین نظرات',
					value: 'Newest',
					isSelected: this.sortBy === 'Date' && this.sortDirection === 'DESC'
				},
				{
					title: 'پایین ترین امتیاز',
					value: 'MinRate',
					isSelected: this.sortBy === 'Rate' && this.sortDirection === 'ASC'
				},
				{
					title: 'بالاترین امتیاز',
					value: 'MaxRate',
					isSelected: this.sortBy === 'Rate' && this.sortDirection === 'DESC'
				}
			];
		},
		searchKey: {
			get(): string {
				return this.reputationStore.state.searchKey;
			},
			set(val: string) {
				this.reputationStore.searchKey = val;
				this.reputationStore.getComments();
			}
		}
	},
	methods: {
		setSort(item: SortItem) {
			switch (item.value) {
				default:
				case 'Newest':
					this.reputationStore.sortBy = 'Date';
					this.reputationStore.sortDirection = 'DESC';
					break;
				case 'MinRate':
					this.reputationStore.sortBy = 'Rate';
					this.reputationStore.sortDirection = 'ASC';
					break;
				case 'MaxRate':
					this.reputationStore.sortBy = 'Rate';
					this.reputationStore.sortDirection = 'DESC';
					break;
			}
			this.reputationStore.getComments();
		}
	}
});
</script>

<style lang="scss" scoped>
.filters-header-container {
	align-self: stretch;
	display: flex;
	align-items: center;
	height: 50px;
	width: 100%;
	background: #fcfcfc;
	padding: 5px;
	border: 1px solid #dfe0eb;
	border-radius: 8px 8px 0px 0px;
}

.title {
	font-size: 14px;
	line-height: 16px;
	text-align: right;
	letter-spacing: 0.2px;
	color: #c5c7cd;
	margin: 0 32px 0 16px;
}

.sort-item {
	position: relative;
	padding: 0 8px;
	font-size: 14px;
	line-height: 16px;
	text-align: right;
	letter-spacing: 0.2px;
	color: #8dabc4;
	margin: 0 16px;
	cursor: pointer;
	&.selected {
		color: #0c3d84;
	}
	.icon {
		position: absolute;
		top: 130%;
		left: 50%;
		transform: translateX(-50%);
	}
}

.search-input {
	height: 40px;
	max-width: 180px;
	margin: 5px;
	margin-right: auto;
	::v-deep .input {
		background: white;
	}
}
</style>
