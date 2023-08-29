import { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addTodo = () => {
    if (input.trim() !== "") {
      if (editingIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editingIndex] = { text: input, done: false };
        setTodos(updatedTodos);
        setEditingIndex(null);
      } else {
        setTodos([...todos, { text: input, done: false }]);
      }
      setInput("");
    }
  };

  const editTodo = (index) => {
    const todoToEdit = todos[index];
    setInput(todoToEdit.text);
    setEditingIndex(index);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    console.log(updatedTodos);
    setTodos(updatedTodos);
  };

  const toggleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h1>What To Do?</h1>
      <div className="todoinput">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
          autoFocus
        />
        <button className="addbtn" onClick={addTodo}>
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <div className="input-list">
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
            <div className="flex">
            <div className="todotext">
              <span className={todo.done ? "done" : ""}>{todo.text}</span>
            </div>
              <div className="buttons">
                <button className="padbtn" style={{backgroundColor: todo.done? 'blue' : 'green'}} onClick={() => toggleDone(index)}>
                  {todo.done ? "Done" : "Mark Done"}
                </button>
                <button className="padbtn" onClick={() => editTodo(index)}>Edit</button>
                <button className="padbtn" style={{backgroundColor: 'red'}}onClick={() => deleteTodo(index)}>Delete</button>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
