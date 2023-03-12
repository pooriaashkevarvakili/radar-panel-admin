<template>
	<div class="statistics-container">
		<div class="doughnut-container">
			<doughnut
				:chart-options="chartOptions"
				:chart-data="rateChartData"
				:chart-id="'rate-chart'"
				:width="150"
				:height="150"
			/>
			<div class="char-icon-container">
				<ra-icon :name="'comments'" :color="'#969CBA'" :size="'large'" />
			</div>
		</div>
		<div class="comments-count-container">
			<div class="count-title">
				<div class="count">
					{{ comments }}
				</div>
				<div class="description">
					{{ commentsDes }}
				</div>
			</div>
			<div v-for="c in commentsInfo" :key="c.icon" class="comment-info">
				<ra-icon :name="c.icon" :type="'solid'" :color="c.iconColor" />
				<div class="title">
					{{ c.title }}
				</div>
				<div class="percent">({{ c.percent }}%)</div>
				<div class="count">
					{{ c.count }}
				</div>
			</div>
		</div>
		<div class="extra-info">
			<div class="rage-info-container">
				<div class="doughnut-container">
					<doughnut
						:chart-options="chartOptions"
						:chart-data="pointChartData"
						:chart-id="'point-chart'"
						:width="90"
						:height="90"
					/>
					<div class="point">
						{{ averageRate }}
					</div>
				</div>
				<div class="title">میانگین<br />امتیاز</div>
			</div>
			<div class="helper orange">تعداد نظرات</div>
			<div class="helper blue">میانگین امتیاز</div>
		</div>
		<div class="line-charts-container">
			<line-chart
				v-if="haveCommentsData"
				:chart-options="lineChartOptions"
				:chart-data="commentsChartData"
				:chart-id="'comments-chart-id'"
				:width="285"
				:height="60"
			/>
			<div
				v-else
				class="empty-chart-title"
				:class="{ 'loading-skeleton': isLoading }"
			>
				در بازه انتخابی داده‌ای برای نظرات موجود نیست.
			</div>
			<line-chart
				v-if="havePointsData"
				:chart-options="lineChartOptions"
				:chart-data="pointsChartData"
				:chart-id="'rate-chart-id'"
				:width="285"
				:height="60"
			/>
			<div
				v-else
				class="empty-chart-title"
				:class="{ 'loading-skeleton': isLoading }"
			>
				در بازه انتخابی داده‌ای برای امتیازها موجود نیست.
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Doughnut, Line as LineChart } from 'vue-chartjs/legacy';
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	CategoryScale,
	LineElement,
	LinearScale,
	PointElement,
	Filler
} from 'chart.js';
ChartJS.register(
	Title,
	Tooltip,
	Legend,
	ArcElement,
	CategoryScale,
	LineElement,
	LinearScale,
	PointElement,
	Filler
);

// components
import RaIcon from '~/components/RaIcon.vue';

// libs
import { formatSeparator } from '~/lib/utils';

// stores
import ReputationStore, { ReputationModule } from '~/store/reputation';
import AuthStore, { AuthModule } from '~/store/auth';
import { OwnerCommentResponseDto } from '~/api/reputation';
import dayjs from 'dayjs';

// types
type CommentInfo = {
	icon: string;
	title: string;
	percent: number;
	count: number;
	iconColor: string;
};

export default Vue.extend({
	components: { RaIcon, Doughnut, LineChart },
	data: () => ({
		chartOptions: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					enabled: false
				}
			}
		},
		lineChartOptions: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					display: false
				},
				y: {
					display: false
				}
			},
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					rtl: true,
					backgroundColor: 'white',
					titleColor: '#A9A9A9',
					titleFont: {
						family: 'IRANSans-X',
						size: 12,
						weight: 400
					},
					bodyColor: '#3F536E',
					bodyFont: {
						family: 'IRANSans-X',
						size: 12,
						weight: 500
					},
					padding: {
						top: 8,
						right: 8,
						bottom: 10,
						left: 8
					},
					displayColors: false,
					yAlign: 'top'
				}
			},
			elements: {
				point: {
					radius: 0
				},
				line: {
					tension: 0.5
				}
			}
		}
	}),
	computed: {
		reputationStore(): ReputationModule {
			return ReputationStore.of(this.$store);
		},
		authStore(): AuthModule {
			return AuthStore.of(this.$store);
		},
		rateChartData(): any {
			return {
				datasets: [
					{
						backgroundColor: ['#FFAA00', '#F3273F', '#8DC100'],
						data: [
							this.reputationStore.neutralCommentsCount,
							this.reputationStore.negativeCommentsCount,
							this.reputationStore.positiveCommentsCount
						],
						borderWidth: 0,
						cutout: 60,
						rotation: 60
					}
				]
			};
		},
		comments(): string {
			return formatSeparator(this.reputationStore.commentsCount);
		},
		commentsDes(): string {
			return `نظر (${
				this.reputationStore.commentsPercentOfCity
			}% کل نظرات هتل های ${
				this.reputationStore.state.currentAccommodation?.city?.nameFa || ''
			})`;
		},
		commentsInfo(): CommentInfo[] {
			return [
				{
					icon: 'face-smile',
					title: 'نظرات مثبت',
					percent: this.reputationStore.positiveCommentsPercent,
					count: this.reputationStore.positiveCommentsCount,
					iconColor: '#8DC100'
				},
				{
					icon: 'face-meh',
					title: 'نظرات میانه',
					percent: this.reputationStore.neutralCommentsPercent,
					count: this.reputationStore.neutralCommentsCount,
					iconColor: '#FFAA00'
				},
				{
					icon: 'face-frown',
					title: 'نظرات منفی',
					percent: this.reputationStore.negativeCommentsPercent,
					count: this.reputationStore.negativeCommentsCount,
					iconColor: '#F3273F'
				}
			];
		},
		averageRate(): number {
			return this.reputationStore.averageRate;
		},
		pointChartData(): any {
			return {
				datasets: [
					{
						backgroundColor: ['#EEEEEE', '#8DC100'],
						data: [10 - this.averageRate, this.averageRate],
						borderWidth: 0,
						cutout: 30,
						rotation: 295
					}
				]
			};
		},
		commentsTable(): OwnerCommentResponseDto[] {
			const list =
				this.reputationStore.state.report?.commentsTable?.filter(c => c.date) ||
				[];

			return list.length
				? list
				: [
						{
							date: '1',
							count: 0,
							averageRate: 0
						},
						{
							date: '2',
							count: 0,
							averageRate: 0
						}
				  ];
		},
		labels(): string[] {
			return this.commentsTable.map(c =>
				dayjs(c.date!).calendar('jalali').format('YYYY/MM/DD')
			);
		},
		haveCommentsData(): boolean {
			return this.commentsTable.some(v => !!v.count);
		},
		commentsChartData(): any {
			return {
				labels: this.labels,
				datasets: [
					{
						backgroundColor: '#F7E0B1',
						borderColor: '#FFAA00',
						data: this.commentsTable.map(c => c.count || 0),
						fill: true
					}
				]
			};
		},
		havePointsData(): boolean {
			return this.commentsTable.some(v => !!v.averageRate);
		},
		pointsChartData(): any {
			return {
				labels: this.labels,
				datasets: [
					{
						backgroundColor: '#89D2FF',
						borderColor: '#0093EE',
						data: this.commentsTable.map(c => c.averageRate || 0),
						fill: true
					}
				]
			};
		},
		isLoading(): boolean {
			return this.reputationStore.state.isLoadingComments;
		}
	}
});
</script>

<style lang="scss" scoped>
.statistics-container {
	display: flex;
	align-items: stretch;
	justify-content: space-between;
	height: 210px;
	background: #ffffff;
	border: 1px solid #dfe0eb;
	border-radius: 8px;
	padding: 12px 27px;
}

.doughnut-container {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 186.75px;
	height: 186.75px;
	.char-icon-container {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 89px;
		height: 89px;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		background: #ffffff;
		box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
		border-radius: 100%;
	}
}

.comments-count-container {
	display: flex;
	flex-direction: column;
	align-self: center;

	.count-title {
		display: flex;
		.count {
			font-style: normal;
			font-weight: 500;
			font-size: 30px;
			line-height: 16px;
			margin-left: 12px;
		}
		.description {
			font-style: normal;
			font-weight: 500;
			font-size: 12px;
			line-height: 16px;
			color: #a6acbe;
		}
	}
}

.comment-info {
	display: flex;
	align-items: center;
	margin-top: 12px;
	.title {
		margin-right: 8px;
		font-size: 14px;
		line-height: 16px;
		text-align: right;
		letter-spacing: 0.01em;
		color: #a6acbe;
	}

	.percent {
		margin-right: auto;
		font-size: 12px;
		line-height: 16px;
		text-align: right;
		letter-spacing: 0.01em;
		color: #a6acbe;
	}

	.count {
		margin-right: 8px;
		font-size: 14px;
		line-height: 16px;
		text-align: right;
		letter-spacing: 0.01em;
		color: #000000;
	}
}

.extra-info {
	align-self: center;
	display: flex;
	flex-direction: column;
	.rage-info-container {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		.doughnut-container {
			position: relative;
			display: flex;
			width: 90px;
			height: 90px;
			.point {
				position: absolute;
				right: 50%;
				top: 50%;
				transform: translateX(50%);
				font-style: normal;
				font-weight: 500;
				font-size: 30px;
				line-height: 16px;
				text-align: right;
				color: #8dc100;
			}
		}
		.title {
			margin-right: 11px;
			font-weight: 500;
			font-size: 12px;
			line-height: 16px;
			text-align: right;
			color: #a6acbe;
		}
	}
	.helper {
		display: flex;
		align-items: center;
		margin-right: 40px;
		font-size: 14px;
		line-height: 16px;
		text-align: right;
		letter-spacing: 0.01em;
		color: #a6acbe;

		&.orange {
			&::before {
				background: #ffaa00;
			}
		}
		&.blue {
			margin-top: 12px;
			&::before {
				background: #0093ee;
			}
		}

		&::before {
			content: ' ';
			width: 8px;
			height: 8px;
			border-radius: 100%;
			margin-left: 8px;
		}
	}
}
.line-charts-container {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	.empty-chart-title {
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		text-align: right;
		color: #a6acbe;
	}
}
</style>
