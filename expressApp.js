import express from 'express';

const app = express();

app.use(express.json());

let tasks = [
    {id: 1, taskName: "Login Page", assignedTo: "Rahul", status: "Pending", priority: "High"},
    {id: 2, taskName: "Homepage", assignedTo: "Amit", status: "Completed", priority: "Medium"},
    {id: 3, taskName: "Dashboard", assignedTo: "Priya", status: "Pending", priority: "Low"}
];

// GET ALL TASKS
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET TASK BY ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task)
        return res.status(404).json({message: "Task not found"});

    res.json(task);
});

// POST NEW TASK
app.post('/tasks', (req, res) => {
    const {id, taskName, assignedTo, status, priority} = req.body;

    if (!Number.isInteger(id) || id <= 0 ||
        !taskName?.trim() || !assignedTo?.trim() ||
        !status?.trim() || !priority?.trim()) {
        return res.status(400).json({message: "Invalid task details"});
    }

    if (tasks.some(t => t.id === id))
        return res.status(400).json({message: "ID already exists"});

    const newTask = {id, taskName, assignedTo, status, priority};

    tasks.push(newTask);

    res.status(201).json({
        message: "Task added successfully",
        task: newTask
    });
});

// PUT UPDATE TASK
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task)
        return res.status(404).json({message: "Task not found"});

    const {taskName, assignedTo, status, priority} = req.body;

    if (!taskName?.trim() || !assignedTo?.trim() ||
        !status?.trim() || !priority?.trim()) {
        return res.status(400).json({message: "Invalid task details"});
    }

    task.taskName = taskName;
    task.assignedTo = assignedTo;
    task.status = status;
    task.priority = priority;

    res.json({
        message: "Task updated successfully",
        task
    });
});

// DELETE TASK
app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === Number(req.params.id));

    if (index === -1)
        return res.status(404).json({message: "Task not found"});

    const deleted = tasks.splice(index, 1);

    res.json({
        message: "Task deleted successfully",
        task: deleted[0]
    });
});

// INVALID ROUTE
app.use((req, res) => {
    res.status(404).json({message: "Route not found"});
});

// START SERVER
app.listen(4000, () => {
    console.log("Express Server running at http://localhost:4000");
});