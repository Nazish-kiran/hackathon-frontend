"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProtectedUser from "../Components/ProtectedUser.jsx";
import ThemeToggler from "../Components/ThemeToggler.jsx";

const page = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user: "",
    status: "To Do",
  });
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
  });
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks using axios
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Create task using axios
  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, formData);
      setShowModal(false);
      setFormData({ title: "", description: "", user: "", status: "To Do" });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Delete task using axios
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks?id=${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Update task using axios
  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${currentTaskId}`,
        editFormData
      );
      setShowEditModal(false);
      setEditFormData({ title: "", description: "", status: "To Do" });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Open edit modal
  const openEditModal = (task) => {
    setCurrentTaskId(task._id);
    setEditFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setShowEditModal(true);
  };

  return (
    <>
      <ProtectedUser>
        <div className="absolute top-4 right-4">
        </div>
          <ThemeToggler />
          <div className=" min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-600">
                  Task Manager
                </h1>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create Task
                </button>
              </div>

              {/* Create Modal */}
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Create New Task</h2>
                    <form onSubmit={createTask} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 border rounded"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                      <textarea
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                        rows="3"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-2 border rounded"
                        value={formData.user}
                        onChange={(e) =>
                          setFormData({ ...formData, user: e.target.value })
                        }
                        required
                      />
                      <select
                        className="w-full p-2 border rounded"
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setShowModal(false)}
                          className="px-4 py-2 text-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Edit Modal */}
              {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                    <form onSubmit={updateTask} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 border rounded"
                        value={editFormData.title}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            title: e.target.value,
                          })
                        }
                        required
                      />
                      <textarea
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                        rows="3"
                        value={editFormData.description}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            description: e.target.value,
                          })
                        }
                      />
                      <select
                        className="w-full p-2 border rounded"
                        value={editFormData.status}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setShowEditModal(false)}
                          className="px-4 py-2 text-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Tasks List */}
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{task.title}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(task.time).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{task.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{task.user}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            task.status === "To Do"
                              ? "bg-red-100 text-red-800"
                              : task.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(task)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </ProtectedUser>
    </>
  );
};

export default page;
