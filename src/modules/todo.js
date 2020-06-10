const Todo = (title, description, dueDate, priority, completed = false) => {
    return {
        title,
        description,
        dueDate,
        priority,
        completed,
    }
}

export { Todo }