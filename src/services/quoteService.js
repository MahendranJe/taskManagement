
export const getTodos = async () => {
  const res = await fetch("https://dummyjson.com/todos");
  const data = await res.json();
  return data.todos; 
};


export const addTodo = async ({ todo, completed = false, userId }) => {
  try {
    const res = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo,
        completed,
        userId,
      }),
    });

    if (!res.ok) throw new Error("Failed to add todo");

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error adding todo:", error.message);
    throw error;
  }
};
