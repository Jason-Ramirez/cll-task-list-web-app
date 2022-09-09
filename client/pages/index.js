import AuthLayout from '../layouts/AuthLayout';
import { useEffect } from 'react';
import AddTaskField from '../components/AddTaskField';
import DisplayTasks from '../components/DisplayTasks';
import { useState } from 'react';
import { $post, $get } from '../composables/fetch';

export default function Tasks(props) {

  const [ tasks, setTasks ] = useState([]);  
  const [form, setForm] = useState({
    note: '',
  });

  const onSubmitForm = async e => {
    e.preventDefault();
    const { note } = form;
    const jsonResponse = await $post('/createTask', { note });
    if (jsonResponse.success) {
      const newTask = jsonResponse.data.task;
      setTasks([ ...tasks, { ...newTask } ]);
      setForm({ note: '' });
    }
    return false;
  }

  const getTasks = async () => {
    try {
      const jsonResponse = await $get('/getTasks');
      if (jsonResponse.success) {
        const data = jsonResponse.data.tasks;
        setTasks(data);
      }
    } catch (error) {
      alert('Something went wrong!');
    }
    return;
  }

  const onDeleteTask = async e => {
    try {
      const task_id = e.currentTarget.id;
      const jsonResponse = await $post('/deleteTask', { task_id });
      if (jsonResponse.success) {
        const deletedTask = jsonResponse.data.task;
        if (deletedTask) {
          const filteredTasks = tasks.filter(task => task.id != deletedTask.id);
          setTasks(filteredTasks);
          return;
        };
      }
      throw 'Bad request!';
    } catch (error) {
      alert('Something went wrong!');
    }
    return;
  }
  
  const handleForm = e => {
    const { name, value } = e.target;
    setForm(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <AuthLayout>
      <div className="task container max-w-7xl mx-auto pt-10">
        <AddTaskField onSubmit={onSubmitForm} handleForm={handleForm} value={form.note || ''}/>
        <DisplayTasks tasks={tasks} onDelete={onDeleteTask}/>
      </div>
    </AuthLayout>
  );
}
