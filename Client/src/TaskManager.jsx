import React, { useState, useEffect } from "react";
import { FaCheck, FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { CreateTask, DeleteTask, GetAllTask, updateTask } from "./api";
import { notify } from "./utils";
import { ToastContainer } from "react-toastify";

function TaskManager() {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]); // Initialize as an empty array
  const [copyTask, setCopyTask] = useState([]);

  async function handleAddTask() {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { success, msg } = await CreateTask(obj);
      if (success) {
        notify(msg, "success");
      } else {
        notify(msg, "error");
      }
      setInput("");
      fetchAllTask();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  }

  const fetchAllTask = async () => {
    try {
      const { data } = await GetAllTask();
      setTask(data || []); // Ensure `task` is always an array
      setCopyTask(data || []);
    } catch (err) {
      console.error("error", err);
    }
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  const handleDeleteTask = async (id) => {
    const { success, msg } = await DeleteTask(id);
    if (success) {
      notify(msg, "success");
    } else {
      notify(msg, "Error");
    }
    fetchAllTask();
  };

  const handleCheckAndUncheck = async (i) => {
    const { _id, isDone, taskName } = i;

    const obj = {
      taskName,
      isDone: !isDone,
    };
    const { success, msg } = await updateTask(_id, obj);
    if (success) {
      notify(msg, "success");
    } else {
      notify(msg, "Error");
    }
    fetchAllTask();
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTask = [...copyTask];
    const result = oldTask.filter((item) =>
      item.taskName.toLowerCase().includes(term)
    );
    setTask(result);
  };

  return (
    <div className="flex-column m-auto align-items-center w-50 mt-5">
      <h1 className="text-center">Task Manager</h1>

      {/*  Input section */}
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="input-group flex-grow-1 me-2 w-100">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new Task"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            className="btn btn-success btn-sm me-2"
            onClick={handleAddTask}
          >
            <FaPlus />
          </button>
        </div>
        <div className="input-group flex-grow-1 me-2 w-100">
          <button className="btn btn-light btn-sm me-2">
            <FaSearch />
          </button>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search task here"
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Todo tasks manager */}
      {Array.isArray(task) && task.length > 0 ? (
        task.map((i) => (
          <div
            key={i._id}
            className="d-flex align-items-center justify-content-between tasks w-100 mt-3 bg-light p-2 row"
          >
            <p
              className={
                i.isDone
                  ? "text-decoration-line-through text-center"
                  : "text-center"
              }
            >
              {i.taskName}
            </p>
            <div className="btn-group">
              <button
                className="btn btn-success btn-sm me-1"
                onClick={() => handleCheckAndUncheck(i)}
              >
                <FaCheck />
              </button>
              <button className="btn btn-primary btn-sm me-1">
                <FaPen />
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteTask(i._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-4">No tasks found</p>
      )}
      
      {/* Toastify container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TaskManager;
