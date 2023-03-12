<template>
	<label class="ra-checkbox-container" :class="{ disabled: disabled }">
		<input
			id="input-checkbox"
			class="input"
			type="checkbox"
			:value="value"
			:checked="value"
			:readonly="disabled"
			@change="!disabled && $emit('input', $event.target.checked)"
		/>
		<ra-icon
			class="icon"
			:type="'solid'"
			color="#fff"
			:name="value ? 'check' : ''"
			:size="'small'"
		/>
		<div v-if="label" class="tg-light checkbox-label">
			{{ label }}
		</div>
	</label>
</template>

<script lang="ts">
import Vue from 'vue';

// global components
import RaIcon from '~/components/RaIcon.vue';

export default Vue.extend({
	name: 'RaCheckbox',
	components: { RaIcon },
	props: {
		value: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		}
	}
});
</script>

<style scoped lang="scss">
.ra-checkbox-container {
	align-self: flex-start;
	margin-top: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 30px;
	box-sizing: border-box;
	font-style: normal;
	font-weight: normal;
	font-size: 14.5px;
	line-height: 23px;
	text-align: right;
	color: #2d2a22;
	cursor: pointer;

	&:hover > .icon {
		background: #fff0e6;
	}

	&.disabled {
		cursor: not-allowed;
		&:hover > .icon {
			background: unset;
		}
		.input:checked ~ .icon {
			background: #e7e7e7 !important;
		}
		.icon {
			border-color: #e7e7e7;
		}
	}

	.input:checked {
		~ .icon {
			background: $radar-red;
		}
	}
}
.icon {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 17px;
	width: 17px;
	background: #ffffff;
	border: 1px solid $radar-red;
	border-radius: 4px;
	margin: 6.5px;
	box-sizing: border-box;
}

.checkbox-label {
	margin-right: 5px;
}

input {
	display: none;
}
</style>
