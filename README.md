# Planning

Student task manager that automates task creation based on the schedule and the revision frequency for each subject.

## How to configure it

Go to the repertory containing the data :

```bash
cd backend/data
```

### Set up your schedule

Open the file `schedule.json`. This JSON will contain your schedule.  
This JSON contains 7 keys as you can see in the file, one for each day of the week. The value assocatied to each key is the list of `subject` object corresponding to the subjects you have this day.  
Here is an example of `subject` object:

```json
{
    "name": "Physique",
    "type": "TD",
    "revision": [0, 2, 6, 15]
},
```

- `name`: name of your subject
- `type`: have to be `TD`, `CM` or `TP`. But, in fact, this field is not so important. If you want, you can put everythong to `CM`.
- `revision`: corresponds to the revision frequency of the subject. Each number corresponds to the number of day after your lesson. For example, on the example above, the subject will create a task of revision the day of the lesson, two days after, six days after and fifteen days after. So, you could learn your lesson 4 times. To avoid the creation of task on a subject, just put an empty list `[]`.

So you can fill the JSON as you want to set up your schedule and the revision frequency of each subject.  

### Set up the tasks file

Open the file `tasks.json`. This JSON contains two keys `tasks` and `lastUpdated`.  
If you want to delete all the tasks registered here, replace the value of associated to the key `tasks` by an empty list `[]`.  
Then, it's necessary to modify the value associated to `lastUpdated` by the result of the following Javascript code:  

```js
new Date(new Date().getTime()).setDate(new Date().getDate() - 1)
```

The result corresponds to the timestamp of yesterday. So when you will start the app, the app will detect that the tasks hasn't been updated today and will create the tasks of your schedule for today.

### Install dependencies and start the app

Open two terminal and go the root directory of the project in each terminal.

#### Backend

In one terminal, go to the root directory of the backend.

```bash
cd backend
```

Install the dependencies.

```bash
yarn install
```

Start the server.

```bash
yarn start
```

#### Frontend

In the other terminal, go to the root directory of the frontend.

```bash
cd frontend
```

Install the dependencies.

```bash
yarn install
```
Start the frontend.

```bash
yarn dev
```

And finally, go to the following URL to enjoy the app: [http://localhost:3000/](http://localhost:3000/)

