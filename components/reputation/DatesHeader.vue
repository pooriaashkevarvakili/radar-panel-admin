<template>
	<header class="dates-header">
		<div class="title">بازه تاریخ</div>
		<div class="date-tabs-container">
			<div
				v-for="tab in rangeTabs"
				:key="tab.title"
				class="tab"
				:class="{ selected: tab.isSelected }"
				@click="range = tab.range"
			>
				{{ tab.title }}
			</div>
		</div>
		<div class="input-range">
			<ra-icon
				:name="'calendar-day'"
				:type="'fas'"
				:color="'var(--radar-red)'"
				:size="'small'"
			/>
			<div class="date-title">
				{{ startDayText }}
			</div>
			<hr />
			<div class="date-title">
				{{ endDayText }}
			</div>
		</div>
		<date-picker
			v-model="range"
			range
			clearable
			format="YYYY-MM-DD"
			display-format="jMMMM jD"
			custom-input=".input-range"
			color="var(--radar-red)"
		/>
	</header>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import Vue from 'vue';

import DatePicker from 'vue-persian-datetime-picker';

import RaIcon from '~/components/RaIcon.vue';

// types
type RangeTab = {
	range: [string | null, string];
	isSelected: Boolean;
	title: string;
};

// stores
import ReputationStore, { ReputationModule } from '~/store/reputation';

export default Vue.extend({
	components: { DatePicker, RaIcon },
	computed: {
		reputationStore(): ReputationModule {
			return ReputationStore.of(this.$store);
		},
		range: {
			get(): [string | null, string] {
				return [
					this.reputationStore.state.startDate,
					this.reputationStore.state.endDate
				];
			},
			set(val: [string, string]) {
				this.reputationStore.startDate = val[0];
				this.reputationStore.endDate = val[1];
			}
		},
		rangeTabs(): RangeTab[] {
			const end = dayjs().format('YYYY-MM-DD');
			const week = dayjs().add(-1, 'week').format('YYYY-MM-DD');
			const month = dayjs().add(-1, 'month').format('YYYY-MM-DD');
			const year = dayjs().add(-1, 'year').format('YYYY-MM-DD');
			return [
				{
					title: 'هفته اخیر',
					range: [week, end],
					isSelected: this.range.toString() === [week, end].toString()
				},
				{
					title: 'ماه اخیر',
					range: [month, end],
					isSelected: this.range.toString() === [month, end].toString()
				},
				{
					title: 'سال اخیر',
					range: [year, end],
					isSelected: this.range.toString() === [year, end].toString()
				},
				{
					title: 'از ابتدا',
					range: [null, end],
					isSelected: this.range.toString() === [null, end].toString()
				}
			];
		},
		startDayText(): string {
			if (!this.range[0]) {
				return '-';
			}
			return dayjs(this.range[0])
				.calendar('jalali')
				.locale('fa')
				.format('DD MMMM YYYY');
		},
		endDayText(): string {
			return dayjs(this.range[1])
				.calendar('jalali')
				.locale('fa')
				.format('DD MMMM YYYY');
		}
	},
	watch: {
		range(val: any) {
			this.reputationStore.getReport();
			this.reputationStore.getComments();
		}
	}
});
</script>

<style lang="scss" scoped>
.dates-header {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin: 11px 0;
}

.title {
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 23px;
	display: flex;
	align-items: center;
	color: $radar-red;
}

.date-tabs-container {
	display: flex;
	height: 38px;
	background: #ffffff;
	border: 1px solid #d7dbec;
	border-radius: 5px;
	margin: 0 12px;
	overflow: hidden;
	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 75px;
		height: 36px;
		cursor: pointer;
		// text
		font-size: 13px;
		line-height: 15px;
		color: #131523;
		white-space: nowrap;
		&.selected {
			background: $radar-red;
			color: white;
		}
	}
}

.input-range {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 302px;
	height: 38px;
	background: #ffffff;
	border: 1px solid #d7dbec;
	border-radius: 5px;
	padding: 0 16px;

	hr {
		height: 24px;
		width: 0px;
		border-right: 1px solid #dfe0eb;
		margin: 0 10px;
	}

	.date-title {
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 23px;
		color: #000000;
		margin: 0 auto;
	}
}
</style>
