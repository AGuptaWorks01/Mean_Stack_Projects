const Task = require('../db/taskModel')


exports.getBook = async (req, res) => {
    try {
        if (req.params.id) {
            const book = await Task.findById(req.params.id);
            if (!book) return res.status(404).json({ message: "Book not found" });
            return res.json(book);
        } else {
            const getTasks = await Task.find({ user: req.user.userId });
            res.json(getTasks);
        }
    } catch (error) {
        return res.status(500).json({ message: "Error while fetching data" });
    }
}


exports.addBook = async (req, res) => {
    const { title, Author, Description } = req.body
    if (!title || !Author || !Description) return res.status(400).json({ message: 'All fields are required.' })
    const addtask = await new Task({ title, Author, Description, user: req.user.userId })
    try {
        addtask.save()
        return res.status(200).json({ message: "Task Added Success", addtask })
    } catch (error) {
        return res.status(500).json({ message: "While create task" })
    }
}

exports.updateBook = async (req, res) => {
    try {
        const UpdateTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!UpdateTask) return res.status(400).json({ message: 'Task not found.' })
        res.json(UpdateTask)
    } catch (err) {
        return res.status(400).json({ message: "Error while updating" })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)
        if (!deleteTask) return res.status(404).json({ message: "Task not found" })
        res.json({ message: "Task Deleted Successfully", deleteTask })
    } catch (err) {
        return res.status(500).json({ message: "unable to delete task", err })
    }
}
