<template>
	<v-dialog :model-value="dialog" persistent>
		<v-card :color="colors.amber.lighten4">
			<v-sheet :color="colors.amber.darken2">
				<v-card-title align="center">{{ getCardTitle() }}</v-card-title>
			</v-sheet>

			<v-col justify="space-around" class="my-3">
				<v-switch v-model="taskDone" :label="taskDone ? 'Tâche terminée' : 'Tâche non terminée'"></v-switch>

				<v-text-field label="Entrez votre tâche ici" :placeholder="getFormText()" v-model="taskText" :error="error"
					:error-messages="getErrorMessage()" :bg-color="colors.amber.lighten5" variant="solo" class="mt-2 mx-1"
					clearable />

				<DateSelector v-model:date="taskDate" @update:date="updateDate" />

					<v-row class="d-flex justify-space-between mx-2 mt-4">
						<v-btn :color="colors.amber.lighten1" @click="updateTask">{{ getBtnText() }}</v-btn>
						<v-btn :color="colors.amber.darken3" @click="close">Annuler</v-btn>
					</v-row>
			</v-col>
		</v-card>
	</v-dialog>
</template>

<script lang="ts" setup>
import colors from 'vuetify/lib/util/colors';
import DateSelector from './DateSelector.vue';
</script>

<script lang="ts">
export default {
	props: {
		dialog: { type: Boolean, required: true },
		id: { type: Number, required: true },
		text: { type: String, required: true },
		done: { type: Boolean, required: true },
		date: { type: Number, required: true }
	},
	emits: ['update:task', 'put-task'],
	data() {
		return {
			taskText: "",
			taskDone: false,
			taskDate: Date.now(),
			error: false,
		}
	},
	beforeUpdate: function () {
		this.taskDone = this.done;
		this.taskText = this.text;
		this.taskDate = this.date;
	},
	methods: {
		close: function () {
			this.$emit('update:task', { dialog: false, task: { id: -1, text: "", done: false, date: Date.now() } });
		},
		updateTask: function (): void {
			if (this.taskText === "") {
				this.error = true;
				return;
			}
			this.$emit('update:task', { dialog: false, task: { id: this.id, text: this.taskText, done: this.taskDone, date: this.taskDate } });
		},
		updateDate: function (date: number) {
			this.taskDate = date;
		},
		getBtnText: function () {
			return this.id === -1 ? "Ajouter" : "Modifier";
		},
		getCardTitle: function () {
			return this.id === -1 ? "Ajouter une tâche" : "Modifier votre tâche";
		},
		getFormText: function () {
			return this.id === -1 ? "Entrez votre tâche ici" : this.text;
		},
		getErrorMessage: function (): string[] {
			return this.error ? ["Ce champ est requis avant de valider"] : [];
		}
	}
}
</script>
