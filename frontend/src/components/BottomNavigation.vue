<template>
	<v-bottom-navigation :bg-color="colors.amber.lighten3" :max="0" grow>
		<v-btn @click="updateHide">
			<v-icon>{{ hide ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
			{{ hide ? 'Montrer' : 'Cacher' }}
		</v-btn>

		<v-btn @click="cleanTasks">
			<v-icon>mdi-broom</v-icon>
			Nettoyer
		</v-btn>

		<v-btn @click="updateTasks" icon>
			<v-icon>mdi-plus</v-icon>
			Ajouter
		</v-btn>

		<v-btn @click="updateDate" icon>
			<v-icon>mdi-clock</v-icon>
			{{ convertDate(date) }}
		</v-btn>
	</v-bottom-navigation>
</template>

<script lang="ts" setup>
import colors from 'vuetify/lib/util/colors';
</script>

<script lang="ts">
export default {
	props: {
		hide: {
			type: Boolean,
			required: true
		},
		date: {
			type: Number,
			required: true
		}
	},
	emits: ['update:hide', 'update:task', 'update:date', 'clean-tasks'],
	methods: {
		updateHide: function () {
			this.$emit('update:hide', !this.hide);
		},
		updateDate: function () {
			this.$emit('update:date', { dateDialog: true, date: this.date });
		},
		convertDate: function (timestamp: number) {
			return new Date(timestamp).toLocaleDateString('fr-FR');
		},
		updateTasks: function () {
			this.$emit('update:task', { dialog: true, task: { id: -1, text: "", done: false, date: Date.now() } });
		},
		cleanTasks: function () {
			this.$emit('clean-tasks');
		},
	}
}
</script>
