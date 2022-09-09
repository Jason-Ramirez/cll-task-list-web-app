const { Task } = require('../../models');

const createTask = async (request, response, next) => {
  const { note } = request.body;
  const user = response.locals.user;
  if (user && note) {
    const task = await Task.create(user.id, note);
    if (task) return response.send({ success: true, data: { task } });
  }
  return response.send({ success: false, error: 'Bad request!' });
}

const getTasks = async (request, response, next) => {
  const user = response.locals.user;
  if (user) {
    const tasks = await Task.getByUserId(user.id);
    if (tasks) return response.send({ success: true, data: { tasks } });
  }
  return response.send({ success: false, error: 'Bad request!' });
}

const deleteTask = async (request, response, next) => {
  const { task_id } = request.body;
  const user = response.locals.user;
  if (user && task_id) {
    const task = await Task.delete(task_id);
    if (task) return response.send({ success: true, data: { task } });
  }
  return response.send({ success: false, error: 'Bad request!' });
}

module.exports = {
  createTask,
  getTasks,
  deleteTask,
}