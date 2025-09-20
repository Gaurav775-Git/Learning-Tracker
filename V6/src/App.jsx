import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [topics, setTopics] = useState(() => {
    const saved = localStorage.getItem("topics");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTopic, setNewTopic] = useState("");
  const [category, setCategory] = useState("React");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);

  const addTopic = () => {
    if (!newTopic.trim()) return;
    setTopics([
      ...topics,
      {
        id: Date.now(),
        name: newTopic,
        category,
        deadline,
        status: "Not Started",
      },
    ]);
    setNewTopic("");
    setDeadline("");
  };

  const updateStatus = (id, newStatus) => {
    setTopics(
      topics.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const removeTopic = (id) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  const completedCount = topics.filter((t) => t.status === "Completed").length;
  const progress = topics.length
    ? Math.round((completedCount / topics.length) * 100)
    : 0;

  const [toggle, setToggle] = useState(false);

  return (
    <div className={toggle ? "dark" : "light"}>
      <button
        onClick={() => setToggle(!toggle)}
        className="theme-btn"
        title="Toggle Dark/Light Mode"
      >
        🌙
      </button>

      <div className="app-container">
        <h1 className="app-title">My Learning Tracker</h1>

        <div className="form-container">
          <input
            type="text"
            placeholder="New Topic..."
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            className="input-box topic-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select-box category-select"
          >
            <option>React</option>
            <option>Blockchain</option>
            <option>DSA</option>
            <option>Other</option>
          </select>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input-box deadline-input"
          />
          <button onClick={addTopic} className="add-btn">
            + Add
          </button>
        </div>

        <table className="topics-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header">Topic</th>
              <th className="table-header">Category</th>
              <th className="table-header">Status</th>
              <th className="table-header">Deadline</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => (
              <tr key={topic.id} className="table-row">
                <td className="table-data topic-name">{topic.name}</td>
                <td className="table-data topic-category">{topic.category}</td>
                <td className="table-data topic-status">
                  <select
                    value={topic.status}
                    onChange={(e) =>
                      updateStatus(topic.id, e.target.value)
                    }
                    className="status-select"
                  >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </td>
                <td className="table-data topic-deadline">
                  {topic.deadline || "—"}
                </td>
                <td className="table-data topic-actions">
                  <button
                    className="remove-btn"
                    onClick={() => removeTopic(topic.id)}
                  >
                     Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="progress-container">
          <p className="progress-text">Progress: {progress}% Completed</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
