<template>
	<div class="filters-container">
		<div class="title">ابرکلمات</div>
		<div>
			<div class="" style="margin-top: -10px">
				<vue-word-cloud
					class="vue-world-cloud"
					:spacing="spacing"
					:animation-overlap="animationOverlap"
					:animation-duration="animationDuration"
					style="width: 350px; height: 500px"
					:words="[
						[`${superWords[0].title.word}`, `${superWords[0].title.fontSize}`],
						[`${superWords[1].title.word}`, `${superWords[1].title.fontSize}`],
						[`${superWords[2].title.word}`, `${superWords[2].title.fontSize}`],
						[`${superWords[3].title.word}`, `${superWords[3].title.fontSize}`],
						[`${superWords[4].title.word}`, `${superWords[4].title.fontSize}`],
						[`${superWords[5].title.word}`, `${superWords[5].title.fontSize}`],
						[`${superWords[6].title.word}`, `${superWords[6].title.fontSize}`],
						[`${superWords[7].title.word}`, `${superWords[7].title.fontSize}`],
						[`${superWords[8].title.word}`, `${superWords[8].title.fontSize}`],
						[`${superWords[9].title.word}`, `${superWords[9].title.fontSize}`],
						[
							`${superWords[10].title.word}`,
							`${superWords[10].title.fontSize}`
						],
						[
							`${superWords[11].title.word}`,
							`${superWords[11].title.fontSize}`
						],
						[
							`${superWords[12].title.word}`,
							`${superWords[12].title.fontSize}`
						],
						[
							`${superWords[13].title.word}`,
							`${superWords[13].title.fontSize}`
						],
						[
							`${superWords[14].title.word}`,
							`${superWords[14].title.fontSize}`
						],
						[
							`${superWords[15].title.word}`,
							`${superWords[15].title.fontSize}`
						],
						[
							`${superWords[16].title.word}`,
							`${superWords[16].title.fontSize}`
						],
						[
							`${superWords[17].title.word}`,
							`${superWords[17].title.fontSize}`
						],
						[
							`${superWords[18].title.word}`,
							`${superWords[18].title.fontSize}`
						],
						[
							`${superWords[19].title.word}`,
							`${superWords[19].title.fontSize}`
						],
						[
							`${superWords[20].title.word}`,
							`${superWords[20].title.fontSize}`
						],
						[
							`${superWords[21].title.word}`,
							`${superWords[21].title.fontSize}`
						],
						[
							`${superWords[22].title.word}`,
							`${superWords[22].title.fontSize}`
						],
						[
							`${superWords[23].title.word}`,
							`${superWords[23].title.fontSize}`
						],
						[
							`${superWords[24].title.word}`,
							`${superWords[24].title.fontSize}`
						],
						[
							`${superWords[25].title.word}`,
							`${superWords[25].title.fontSize}`
						],
						[
							`${superWords[26].title.word}`,
							`${superWords[26].title.fontSize}`
						],
						[
							`${superWords[27].title.word}`,
							`${superWords[27].title.fontSize}`
						],
						[
							`${superWords[28].title.word}`,
							`${superWords[28].title.fontSize}`
						],
						[
							`${superWords[29].title.word}`,
							`${superWords[29].title.fontSize}`
						],
						[
							`${superWords[30].title.word}`,
							`${superWords[30].title.fontSize}`
						],
						[
							`${superWords[31].title.word}`,
							`${superWords[31].title.fontSize}`
						],
						[
							`${superWords[32].title.word}`,
							`${superWords[32].title.fontSize}`
						],
						[
							`${superWords[33].title.word}`,
							`${superWords[33].title.fontSize}`
						],
						[
							`${superWords[34].title.word}`,
							`${superWords[34].title.fontSize}`
						],
						[
							`${superWords[35].title.word}`,
							`${superWords[35].title.fontSize}`
						],
						[
							`${superWords[36].title.word}`,
							`${superWords[36].title.fontSize}`
						],
						[
							`${superWords[37].title.word}`,
							`${superWords[37].title.fontSize}`
						],
						[
							`${superWords[38].title.word}`,
							`${superWords[38].title.fontSize}`
						],
						[
							`${superWords[39].title.word}`,
							`${superWords[39].title.fontSize}`
						],
						[`${superWords[40].title.word}`, `${superWords[40].title.fontSize}`]
					]"
					:color="
						([, weight]) =>
							weight > `${superWords[1].title.fontSize}`
								? '#D964B0'
								: weight > `${superWords[2].title.fontSize}`
								? '#19BA10'
								: weight > `${superWords[9].title.fontSize}`
								? '#EFC5BF'
								: weight > `${superWords[6].title.fontSize}`
								? '#5D102A'
								: weight > `${superWords[11].title.fontSize}`
								? '#FF0000'
								: weight > `${superWords[7].title.fontSize}`
								? '#4DE7F3'
								: weight > `${superWords[8].title.fontSize}`
								? '#A6F023'
								: weight > `${superWords[10].title.fontSize}`
								? '#191970'
								: weight > `${superWords[12].title.fontSize}`
								? '#E0850C'
								: weight > `${superWords[14].title.fontSize}`
								? '#B64828'
								: weight > `${superWords[15].title.fontSize}`
								? '#A2A583'
								: weight > `${superWords[16].title.fontSize}`
								? '#6CEC05'
								: weight > `${superWords[18].title.fontSize}`
								? '#96512D'
								: weight > `${superWords[20].title.fontSize}`
								? '#300879'
								: weight > `${superWords[22].title.fontSize}`
								? '#BB04DB'
								: weight > `${superWords[24].title.fontSize}`
								? '#934875'
								: weight > `${superWords[26].title.fontSize}`
								? '#0D468E'
								: weight > `${superWords[28].title.fontSize}`
								? '#B40CDF'
								: weight > `${superWords[30].title.fontSize}`
								? '#32E511'
								: weight > `${superWords[32].title.fontSize}`
								? '#A0522D'
								: weight > `${superWords[34].title.fontSize}`
								? '#1D08A8'
								: weight > `${superWords[35].title.fontSize}`
								? '#A1DE00'
								: weight > `${superWords[38].title.fontSize}`
								? '#B0E0E6'
								: weight > `${superWords[40].title.fontSize}`
								? '#FF6347'
								: weight > `${superWords[13].title.fontSize}`
								? '#AB18BE'
								: weight >
								  `
                    ${superWords[15].title.fontSize}`
								? '#008080'
								: weight >
								  5`
                    ${superWords[4].title.fontSize}`
								? '#A711BC'
								: weight >
								  8`
                    ${superWords[17].title.fontSize}`
								? '#C9789E'
								: weight >
								  `
                    ${superWords[19].title.fontSize}`
								? '#0F5F4B'
								: weight > `${superWords[21].title.fontSize}`
								? '#C3D5E7'
								: weight > `${superWords[23].title.fontSize}`
								? '#61A1EA'
								: weight >
								  `
                    ${superWords[25].title.fontSize}`
								? '#F19E9D'
								: weight > `${superWords[27].title.fontSize}`
								? '#60E3FE'
								: weight > `${superWords[29].title.fontSize}`
								? '	#F1D52D'
								: weight >
								  `
                    ${superWords[31].title.fontSize}`
								? '	#64F9FA'
								: weight > `${superWords[33].title.fontSize}`
								? '	#FF00FF'
								: weight >
								  `
                    
                    ${superWords[0].title.fontSize}`
								? '#E1E36B'
								: weight > `${superWords[37].title.fontSize}`
								? '#1584F2'
								: weight > `${superWords[39].title.fontSize}`
								? '#0CFB66'
								: weight >
								  `
                    ${superWords[5].title.fontSize}`
								? '#6C0025'
								: weight > `${superWords[3].title.fontSize}`
								? '#82AA47'
								: 'Indigo'
					"
					font-family="IRANSans-X"
				>
				</vue-word-cloud>
			</div>
		</div>
	</div>
</template>

<script >
///@ts-ignore
import VueWordCloud from 'vuewordcloud';

import dayjs from 'dayjs';

import superwordsStore, { SuperWordsModule } from '~/store/superwords';
import ReputationStore, { ReputationModule } from '~/store/reputation';
// components

var svgNS = 'http://www.w3.org/2000/svg';
export default {
	components: { VueWordCloud },

	data() {
		return {
			ws: [],
			superWords: [],
			spacingValueIndex: 1,
			spacingValues: [5, 2 / 3, 1 / 9, 1, 5],
			code: null,
			fontSizeRatioValueIndex: 0,
			// fontSizeRatioValues: [8, 25],
			progressVisible: true,
			animationOverlapValueIndex: 1,
			animationOverlapValues: [0, 1 / 5, 1 / 2, 1],
			animationDurationValueIndex: 2,
			animationEasing: undefined,

			animationEasingValues: [
				'ease',
				'linear',
				'ease-in',
				'ease-out',
				'ease-in-out',
				'cubic-bezier(0.1,0.7,1.0,0.1)'
			],
			animationDurationValues: [0, 1000, 5000, 10000]
		};
	},
	computed: {
		animationOverlap() {
			return this.animationOverlapValues[this.animationOverlapValueIndex];
		},

		fontSizeRatio() {
			return this.fontSizeRatioValues[this.fontSizeRatioValueIndex];
		},

		animationDuration() {
			return this.animationDurationValues[this.animationDurationValueIndex];
		},

		spacing() {
			return this.spacingValues[this.spacingValueIndex];
		},

		reputationStore() {
			return ReputationStore.of(this.$store);
		},

		superwordsStore() {
			return superwordsStore.of(this.$store);
		}
	},
	methods: {
		async pooria() {
			const superWords = await this.superwordsStore.getWords();
			this.superWords = superWords.map((key, index) => {
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
};
</script>

<style lang="scss" scoped>
.filters-container {
	width: 364px;
	background: #ffffff;
	border: 1px solid #dfe0eb;
	border-radius: 8px;
	height: 540px;
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
.vue-world-cloud {
	border-radius: 40px;
}
</style>
