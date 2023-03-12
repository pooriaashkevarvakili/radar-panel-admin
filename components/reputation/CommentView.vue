<template>
	<div class="comment-view-container" :style="{ '--color': info.color }">
		<div class="sidebar-background" />
		<div class="info-container">
			<div class="rate-container">
				<ra-icon :name="info.icon" :type="'solid'" :color="info.color" />
				<div class="rate  font-iran-sans">
					{{ rate }}
				</div>
			</div>
			<div class="date ">{{ date }}</div>
			<div class="source-container  ">
				<img class="logo" alt="source.title" :src="
					source.slug
						? `/img/sources/${source.slug}.svg`
						: '/img/sources/default.png'
				" />
				<div class="name ">
					{{ source.name }}
				</div>
			</div>
		</div>
		<div class="content-container ">
			<div class="name  ">
				{{ name }}
			</div>
			<p class="description" v-html="description" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import dayjs from 'dayjs';

// components
import RaIcon from '~/components/RaIcon.vue';

// types
import { CommentDetailsDto, CommentSourceDetailsDto } from '~/api/reputation';

// stores
import ReputationStore, { ReputationModule } from '~/store/reputation';

export default Vue.extend({
	components: { RaIcon },
	props: {
		item: {
			type: Object as PropType<CommentDetailsDto>,
			required: true
		}
	},
	computed: {
		reputationStore(): ReputationModule {
			return ReputationStore.of(this.$store);
		},
		rate(): number {
			return this.item.rate || 0;
		},
		info(): {
			color: string;
			icon: string;
		} {
			if (this.rate <= 3) {
				return {
					icon: 'face-frown',
					color: '#F3273F'
				};
			} else if (this.rate <= 7) {
				return {
					icon: 'face-meh',
					color: '#FFAA00'
				};
			} else {
				return {
					icon: 'face-smile',
					color: '#8DC100'
				};
			}
		},
		date(): string {
			return dayjs(this.item.date).calendar('jalali').format('YYYY/MM/DD');
		},
		source(): CommentSourceDetailsDto {
			return this.reputationStore.state.sources.find(
				s => s.id === this.item.commentSource?.id
			)!;
		},
		name(): string {
			return this.item.name || '';
		},
		description(): string {
			return (
				this.item.text?.replace(
					this.reputationStore.state.searchKey,
					`<mark>${this.reputationStore.state.searchKey}</mark>`
				) || ''
			);
		}
	}
});
</script>

<style lang="scss" scoped>
.comment-view-container {
	display: flex;
	background: white;
	border-bottom: 1px solid #dfe0eb;

	.sidebar-background {
		flex-shrink: 0;
		align-self: stretch;
		width: 5px;
		background: var(--color);
	}
}

.info-container {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-start;
	padding: 28px 45px 0 18px;

	.rate-container {
		display: flex;

		.rate {
			font-size: 24px;
			line-height: 28px;
			letter-spacing: 0.01em;
			color: var(--color);
			margin-right: 8px;
		}
	}

	.date {
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.2px;
		color: #252733;
		margin: 15px 0 4px 0;
	}

	.source-container {
		display: block;

		.logo {
			object-fit: contain;
		}

		.name {
			font-size: 12px;
			line-height: 20px;
			letter-spacing: 0.2px;
			color: #8292a2;
			margin-right: 5px;
			white-space: nowrap;
		}
	}
}

.content-container {
	padding: 27px 0 38px 33px;

	.name {
		font-size: 14px;
		line-height: 20px;
		text-align: right;
		letter-spacing: 0.2px;
		color: #0c3d84;
		margin-bottom: 10px;
	}

	.description {
		margin: 0;
		font-style: normal;
		font-weight: 300;
		font-size: 12.5px;
		line-height: 27px;
		text-align: right;
		letter-spacing: 0.1px;
		color: #1d1d1d;
	}
}

.font-iran-sans {
	font-family: 'IRANSans-X';
}
</style>
