<template>
	<div ref="calendar" class="d-flex justify-center">
		<DatePicker color="orange" v-model="dateSelected" @update:modelValue="updateDate" :min-date="new Date()" is-required>
			<template #footer>
				<v-chip class=" d-flex align-center justify-center my-2 mx-2">{{ getDate(dateSelected) }}</v-chip>
			</template>
			</DatePicker>
	</div>
</template>


<script lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
	components: {
		DatePicker
	},
	props: {
		date: { type: Number, required: true }
	},
	emits: ['update:date'],
	data() {
		return {
			dateSelected: new Date(this.date),
			calendar: null,
		}
	},
	methods: {
		getDate: function (date: Date): string {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('fr-FR', options);
    },
		updateDate: function () {
			this.$emit('update:date', this.dateSelected.getTime())
		},
	},
}
</script>
