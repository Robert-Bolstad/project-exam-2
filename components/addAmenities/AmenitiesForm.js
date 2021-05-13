import { useState } from "react";

function AmenitiesForm({ addItem, placeholderText }) {
  const [item, setItem] = useState({
    id: "",
    task: "",
  });

  function handleTaskInputChange(e) {
    setItem({ ...item, task: e.target.value });
  }

  function handleClick(e) {
    e.preventDefault();
    if (item.task.trim()) {
      addItem({ ...item, id: Math.random() });
      setItem({ ...item, task: "" });
    }
  }
  return (
    <div>
      <input
        placeholder={placeholderText}
        name="task"
        type="text"
        value={item.task}
        onChange={handleTaskInputChange}
      />
      <button onClick={(e) => handleClick(e)}>add</button>
    </div>
  );
}

export default AmenitiesForm;
