import Todo from "../models/todos.model.js";

const validStatuses = ["new", "inProgress", "done"];

export const getTodos = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;

    const todos = await Todo.find()
      .skip(Number(skip))
      .limit(Number(limit))
      .populate("user", "username email")
      .select("title status user");

    res.status(200).json({
      status: "success",
      todos,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", err: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
      .populate("user", "username email")
      .select("title status user");

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ status: "success", todo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", err: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, status = "new", user } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const todo = await Todo.create({ title, status, user });

    res.status(201).json({ message: "Todo created", todo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", err: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, status } = req.body;

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (title !== undefined) todo.title = title;
    if (status !== undefined) todo.status = status;

    await todo.save();

    res.status(200).json({ message: "Todo updated", todo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", err: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted", todo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", err: error.message });
  }
};
