const taskModel = require("../Models/TaskModel");

// Fetch the all data
const fetchData = async (req, res) => {
  try {
    const data = await taskModel.find({});
    res.status(200).json({ data, msg: "Successfully showed", success: true });
  } catch (errr) {
    res.status(500).json({ msg: "Unable to fetch data", success: false, errr });
  }
};

// Create the data

const createTask = async (req, res) => {
  const data = req.body;
  try {
    const createdTask = new taskModel(data);
    await createdTask.save();

    res.status(200).json({ msg: "Created task successfully", success: true });
  } catch (error) {
    res.status(500).json({ msg: "Error while creating task", success: false });
  }
};

// Updata task

const updateTask = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const object = { $set: { ...body } };

    await taskModel.findByIdAndUpdate(id, object);
    res.status(200).json({ msg: "Task updated ", success: true });
  } catch (error) {
    res.status(500).json({ msg: "Failed to update task", success: false });
  }
};

// Delete task

const deleteTask = async (req,res) => {
  try {
    const id = req.params.id;
    await taskModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "Task deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ msg: "Failed to delete task", success: false });
  }
};

module.exports = { fetchData, createTask,updateTask ,deleteTask};
