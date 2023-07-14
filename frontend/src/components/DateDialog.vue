<template>
	<v-dialog :model-value="dateDialog" persistent class="d-flex flex-column align-center">
		<v-col class="d-flex align-center justify-center">

			<DateSelector v-model:date="dateSelected" @update:date="updateDate" />

			<v-btn @click="close" :elevation="0" class="align-self-start mt-n4 ml-n4" size="x-small" icon>
				<v-icon :color="colors.grey.darken1">mdi-close</v-icon>
			</v-btn>

		</v-col>
	</v-dialog>
</template>


<script lang="ts" setup>
import colors from 'vuetify/lib/util/colors';
import DateSelector from './DateSelector.vue';
</script>

<script lang="ts">
export default {
	props: {
		dateDialog: { type: Boolean, required: true },
		date: { type: Number, required: true }
	},
	emits: ['update:date'],
	data() {
		return {
			dateSelected: Date.now(),
		}
	},
	beforeUpdate: function () {
		this.dateSelected = this.date;
	},
	methods: {
		close: function () {new Date()
			this.$emit('update:date', { dateDialog: false, date: this.date });
		},
		updateDate: function (date: number) {
			this.dateSelected = date;
			this.$emit('update:date', { dateDialog: false, date: this.dateSelected });
		}
	}
}
</script>
