<template>
	<div class="ra-inputs-container">
		<div
			v-if="!hideContainer"
			class="label"
			:class="{ 'disabled-label': disabled }"
		>
			{{ label }}
		</div>
		<label class="input-container" :class="{ fullWidth }">
			<input
				ref="input"
				v-model="localValue"
				class="input"
				:class="{
					invalid: localInvalid,
					success: isSuccess
				}"
				:type="type"
				:min="min"
				:max="max"
				:placeholder="placeholder"
				:maxlength="maxLength"
				:minlength="minLength"
				:readonly="readonly"
				:autocomplete="autocomplete"
				:disabled="disabled"
				@keypress.enter.prevent="$emit('submit')"
				@keypress="$emit('keypress', $event)"
				@focus="$emit('focus')"
				@blur="$emit('blur')"
			/>
		</label>
		<div
			v-if="invalid && errorText"
			class="error-text"
			:class="{
				'bottom-description': !!description.length
			}"
		>
			{{ errorText }}
		</div>
		<div v-if="!hideContainer && !!description.length" class="description">
			{{ description }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
	props: {
		label: {
			type: String,
			default: ''
		},
		errorText: {
			type: String,
			default: ''
		},
		description: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		invalid: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		hideContainer: {
			type: Boolean,
			default: false
		},
		validation: {
			type: Function,
			default: null
		},
		value: {
			type: [String, Number] as PropType<string | number | null>,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		min: {
			type: Number,
			default: Infinity
		},
		max: {
			type: Number,
			default: Infinity
		},
		minLength: {
			type: Number,
			default: 0
		},
		maxLength: {
			type: Number,
			default: Infinity
		},
		autocomplete: {
			type: String,
			default: 'on'
		},
		isSuccess: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		fullWidth: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		errorTxt(): string {
			if (this.localInvalid) {
				if (this.required && !this.value) {
					return 'خطا: این فیلد نمی‌تواند خالی باشد.';
				} else {
					return 'خطا: مقدار واردشده معتبر نیست.';
				}
			} else {
				return '';
			}
		},
		localValue: {
			get(): any {
				return this.value;
			},
			set(value: any): void {
				this.$emit('input', value);
			}
		},
		localInvalid(): boolean {
			if (this.validation) {
				return this.invalid && !this.validation(this.localValue);
			} else {
				return this.invalid;
			}
		}
	},
	methods: {
		handleEvent(event: any) {
			this.$emit(event);
		}
	}
});
</script>

<style scoped lang="scss">
.ra-inputs-container {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: fit-content;
	margin-top: 10px;
}
.label {
	font-size: 16px;
	line-height: 19px;
	margin-bottom: 6px;
	&.disabled-label {
		color: #808080;
	}
}
//
.error-text {
	position: absolute;
	bottom: -6px;
	right: 15px;
	background: #ffffff;
	color: #ff0000;
	padding: 0 5px;
	z-index: 1001;
}
.bottom-description {
	bottom: 17px;
}
.description {
	margin-top: 5px;
	color: #808080;
	min-height: 19px;
}
.input-container {
	position: relative;
	height: 50px;
}

.input {
	width: 100%;
	height: 100%;
	font-family: IRANSans-X;
	background: #f7fafc;
	border: 1px solid #e8e8e8;
	border-radius: 5px;
	text-align: right;
	padding: 0 15px;
	caret-color: $radar-red;
	outline: none;
	// text
	color: black;
	font-size: 13px;
	line-height: 30px;

	&.invalid {
		border-color: #ff0000 !important;
		color: #ff0000;
	}
	&.success {
		background: #e5ffeb;
		border-color: #28a745;
		color: #28a745;
		~ .input-button > .tg-label-medium {
			color: #28a745 !important;
		}
	}
}
.input::placeholder {
	font-family: IRANSans-X;
	color: #b2b2b2;
	font-weight: 300;
	font-size: 13px;
	line-height: 30px;
}
.input:focus {
	border-color: $radar-red;
}
.input:read-only,
.input[disabled] {
	background: #f2f2f2;
	border-color: #e7e7e7;
}

.input[disabled] {
	color: #b2b2b2;
	cursor: not-allowed;
}

.fullWidth {
	width: 100%;
}
</style>
