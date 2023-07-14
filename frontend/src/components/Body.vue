<template>
  <template v-for="todo in filterTasks()" :key="todo.id">
    <v-list-item class="d-flex justify-space-between my-2 mx-n2">
        <template v-slot:prepend>
          <v-checkbox-btn :id="(todo.id).toString()" v-model="todo.done" @update:modelValue="(value: boolean) => updateDone(todo, value)"
            class="" :disabled="todo.generated"/>

          <v-list-item-title>
            <v-label :text="todo.text" :class="todo.done ? 'text-decoration-line-through' : ''"></v-label>
          </v-list-item-title>
        </template>

      <template v-slot:append>
        <v-btn :ref_for="!!todo.id" @click="updateTask({ dialog: true, task: todo })" class="mx-3"
          :color="colors.amber.darken2" icon="mdi-pencil" :disabled="todo.generated" :elevation="3"/>

        <v-btn :ref_for="!!todo.id" @click="removeTask(todo)" class="" :color="colors.amber.darken4"
          icon="mdi-delete" :disabled="todo.generated" :elevation="3"/>
      </template>
    </v-list-item>
  </template>

  <Dialog v-model:dialog="dialog" v-model:id="task.id" v-model:text="task.text" v-model:done="task.done"
    v-model:date="task.date" @update:task="updateTask" />

  <DateDialog v-model:dateDialog="dateDialog" v-model:date="date" @update:date="updateDate" />

  <BottomNavigation v-model:hide="hide" v-model:date="date" @update:hide="updateHide" @update:task="updateTask"
    @update:date="updateDate" @clean-tasks="deleteAllCompletedTasks" />
</template>

<script lang="ts" setup>
import colors from 'vuetify/lib/util/colors';
import BottomNavigation from './BottomNavigation.vue';
import Dialog from './Dialog.vue';
import DateDialog from './DateDialog.vue';
</script>

<script lang="ts">
import { token, baseURL } from '../plugins/index'
type Task = { id: number, text: string, date: number, done: boolean, generated: boolean }
export default {
  data() {
    return {
      date: Date.now(),
      dateDialog: false,
      todoList: [] as Task[],
      hide: false,
      dialog: false,
      task: { id: -1, text: "", done: false, date: Date.now() } as Task,
    }
  },
  created: function () {
    this.getTasks();
  },
  methods: {
    updateHide: function (value: boolean): void {
      this.hide = value;
    },
    updateTask: async function (value: { dialog: boolean, task: Task }): Promise<void> {
      this.dialog = value.dialog;
      this.task = value.task;
      if (!value.dialog && value.task.text !== "") await this.putTask(value.task);
      this.getTasks();
    },
    updateDate: async function (value: { dateDialog: boolean, date: number }): Promise<void> {
      this.dateDialog = value.dateDialog;
      const oldDate: number = this.date;
      this.date = value.date;
      if (!value.dateDialog && value.date !== oldDate) await this.getTasks();
    },
    updateDone: async function (task: Task, done: boolean): Promise<void> {
      task.done = done;
      await this.putTask(task);
    },
    filterTasks: function (): Task[] {
      return this.todoList.filter((t) => !t.done || !this.hide);
    },
    removeTask: async function (task: Task): Promise<void> {
      this.todoList = this.todoList.filter((t) => t.id !== task.id)
      fetch(`${baseURL}${task.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      }).catch(err => console.log(err));
    },
    deleteAllCompletedTasks: async function (): Promise<void> {
      this.todoList.filter((t) => t.done).forEach(async (t) => await this.removeTask(t));
    },
    putTask: async function (task: Task): Promise<void> {
      if (task.id === -1) {
        task.id = Math.max(...this.todoList.map((t) => t.id)) + 1;
        this.todoList.push(task);
        await this.sendTask(task, 'POST');
      } else {
        let oldTask: Task | undefined = this.todoList.find((t) => t.id === task.id);
        if (oldTask !== undefined) {
          oldTask.text = task.text;
          oldTask.done = task.done;
          oldTask.date = task.date;
          await this.sendTask(oldTask, 'PUT');
        }
      }
    },
    getTasks: async function (): Promise<void> {
      fetch(this.date ? `${baseURL}${this.date}/` : `${baseURL}${Date.now()}/`, {
        method: 'GET',
        headers: { 'Authorization': token }
      }).then(res => res.json()).then(res => {
        this.todoList = res.data
      }).catch(err => console.log(err));
    },
    sendTask: async function (task: Task, method: string): Promise<void> {
      fetch(method === 'POST' ? baseURL : `${baseURL}${task.id}/`, {
        method: method,
        headers: { 'Authorization': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: task })
      }).catch(err => console.log(err));
    },
  }
}
</script>
