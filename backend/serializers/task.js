const serializeTask = (task) => {
  return {
    id: task._id,
    title: task.title,
    description: task.description,
    tags: task.tags,
    color: task.color,
  };
};

module.exports = { serializeTask };
