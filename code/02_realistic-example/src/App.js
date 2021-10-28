import React, { useEffect, useState } from "react";
import useHttp from "./hooks/use-https";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  // useHttp returns state values and a function which we can store:
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    // transforms all the tasks from objects which we get back from firebase
    const transformTask = (data) => {
      console.log(data);
      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: "https://custom-hooks-example-640a6-default-rtdb.firebaseio.com/tasks.json",
      },
      transformTask
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
