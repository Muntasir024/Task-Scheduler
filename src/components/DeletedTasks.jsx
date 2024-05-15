import React from "react";
import { motion } from "framer-motion";

const DeletedTasks = ({ data, setData }) => {
  const handledelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleReschedule = (index) => {
    const updatedData = [...data];
    updatedData[index].deleted = !updatedData[index].deleted;
    setData(updatedData);
  }

  return (
    <div className="w-full h-[100%] mb-3 bg-[#0000004e] rounded-xl shadow-inner shadow-black p-3 overflow-y-scroll">
      <h1 className="text-white mb-2 px-3">Task Postponed...</h1>
      {data.map(
        (task, index) =>
          task.deleted && (
            <div
              className="cancelled-one mb-3 bg-black p-2 px-4 rounded-full"
              key={index}
            >
              <h3 className="text-[#dedede] hover:text-white cursor-pointer flex justify-between items-center">
                <span>{task.title}</span>{" "}
                <span>
                  <motion.i
                    whileHover={{ rotate: -260, scale: 1.2 }}
                    className="fa-solid fa-arrow-rotate-left text-yellow-500"
                    onClick={() => handleReschedule(index)}
                  ></motion.i>
                  <motion.i
                    whileHover={{ rotate: 45, scale: 1.2, y: -1 }}
                    className="fa-solid fa-trash text-red-500 ml-3"
                    onClick={() => handledelete(index)}
                  ></motion.i>
                </span>
              </h3>
            </div>
          )
      )}
    </div>
  );
};

export default DeletedTasks;
