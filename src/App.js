import { useEffect, useRef, useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import { motion } from "framer-motion";
import DeletedTasks from "./components/DeletedTasks";

function App() {
  const [inputTask, setInputTask] = useState("");
  const [editIndex, setEditindex] = useState(null);

  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("todoData");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(data));
  }, [data]);

  const addTask = () => {
    if (inputTask.trim() !== "") {
      const newTask = {
        title: inputTask,
        date: new Date().toString(),
        completed: false,
        deleted: false,
      };

      setData((prevData) => [...prevData, newTask]);
      setInputTask("");
    }
  };

  const markTaskCompleted = (index) => {
    const updatedData = [...data];
    updatedData[index].completed = !updatedData[index].completed;
    setData(updatedData);
  };

  const handleEditChange = (e, index) => {
    const updatedData = [...data];
    updatedData[index].title = e.target.value;
    setData(updatedData);
  };

  const saveEditedTask = (index) => {
    setEditindex(null);
  };

  const deleteTask = (index) => {
    const updatedData = [...data];
    updatedData[index].deleted = !updatedData[index].deleted;
    setData(updatedData);
  };

  const [completed, setCompleted] = useState(0);
  useEffect(() => {
    let count = data.reduce((total, data) => {
      return (total += !data.completed && !data.deleted);
    }, 0);
    setCompleted(count);
  }, [data]);

  const taskRef = useRef(null);

  return (
    <div className="mainPage flex">
      <SideBar data={data} setData={setData} />
      
      <main className="w-full h-[92%] mt-6 mr-6 rounded-lg task-area p-5">
        <h1 className="text-[#dfdfdf] font-black text-2xl flex">
          <img src="" className="" alt="" />
          {`${
            data.length > 0
              ? `You have ${completed} task to complete..`
              : "Create a Task"
          }`}
        </h1>
        <h6 className="text-md text-[#dfdfdf]">
          You can Reschedule tasks appear in the left or right panels
        </h6>
        <div className="flex w-full h-full">
          <div className="w-1/2 h-[90%] mt-2 rounded-xl bg-[#0000005e] p-5 shadow-inner shadow-black">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="task-box w-full flex py-2 px-4 rounded-full bg-[#00000080] shadow-md shadow-black"
            >
              <input
                type="text"
                className="w-full bg-transparent outline-0 border-opacity-0 text-white"
                value={inputTask}
                onChange={(e) => setInputTask(e.target.value)}
                ref={taskRef}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="addBtn"
                onClick={addTask}
              >
                Add
              </motion.button>

            </motion.div>
            <div className="tasks w-full h-[91%] mt-4 overflow-y-scroll">
              {data.map(
                (task, index) =>
                  !task.completed &&
                  !task.deleted && (
                    <div
                      className="task flex w-full items-center mb-3"
                      key={index}
                    >
                      <motion.input
                        whileTap={{ scale: 0.5 }}
                        type="checkbox"
                        className="checkbox mr-2"
                        onChange={() => markTaskCompleted(index)}
                      />
                      <div className="bg-black p-3 rounded-xl  w-full">
                        <h3
                          className={`text-[#dedede] hover:text-white cursor-pointer flex justify-between ${
                            task.completed ? "line-through" : ""
                          }`}
                        >
                          {editIndex === index ? (
                            <div
                              whileTap={{ scale: 0.9 }}
                              className="task-box w-full flex py-2 px-4 rounded-full bg-[#fff]"
                            >
                              <input
                                type="text"
                                className="w-full bg-white outline-0 border-opacity-0 text-black"
                                value={task.title}
                                onChange={(e) => handleEditChange(e, index)}
                              />
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="addBtn"
                                onClick={() => saveEditedTask(index)}
                              >
                                Edit
                              </motion.button>
                            </div>
                          ) : (
                            <>
                              {task.title}
                              <span>
                                <motion.i
                                  whileHover={{ y: -4, scale: 1.1, rotate: 45 }}
                                  className="fa-solid fa-pen-to-square text-yellow-300 text-xl"
                                  onClick={() => setEditindex(index)}
                                ></motion.i>
                                <motion.i
                                  whileHover={{ y: -1, scale: 1.3, rotate: 65 }}
                                  className="fa-regular fa-circle-xmark text-red-300 text-xl ml-3"
                                  onClick={() => deleteTask(index)}
                                ></motion.i>
                              </span>
                            </>
                          )}
                        </h3>
                        <h5 className="flex justify-between text-xs text-yellow-600">
                          <span>
                            {new Date(task.date).toLocaleDateString(undefined, {
                              weekday: "long",
                            })}
                          </span>
                          <span>
                            {new Date(task.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </h5>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="w-1/2 h-[90%] mt-2 rounded-xl bg-[#00000020] p-5">
            <DeletedTasks data={data} setData={setData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
