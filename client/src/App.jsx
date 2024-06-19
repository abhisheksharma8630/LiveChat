import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import CopyToClipboard from "./CopyToClipboard";

const App = () => {
  const socket = useMemo(() => io("http://localhost:8080"), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [allUser, setAllUser] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(localStorage.getItem(socketId) == null){
      let messages = [{
        message:message,
        to:room
      }]
      messages = JSON.stringify(messages);
      localStorage.setItem(socketId,messages);
    }else{
      let messages = JSON.parse(localStorage.getItem(socketId));
      messages = [...messages,{
        message:message,
        to:room
      }]
      messages = JSON.stringify(messages);
      localStorage.setItem(socketId,messages);
    }
    socket.emit("message", { message, room });
    setMessage("");
    setRoom("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
      setSocketId(socket.id);
    });

    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    socket.on("welcome2", (msg) => {
      console.log(msg);
    });

    socket.on("receive-message", (msg) => {
      setUserMessages((mess) => [...mess, msg]);
    });

    socket.on("updateUserList", (msg) => {
      setAllUser(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-10">
      <h5>{socketId}</h5>
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div>
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Message
          </label>
          <input
            type="text"
            id="message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-52"
            placeholder="Hii"
            required
          />
        </div>
        <div>
          <label
            for="room"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            User Id
          </label>
          <input
            type="text"
            id="room"
            name="room"
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-52"
            placeholder="User Id"
            required
          />
        </div>
        <button
          type="submit"
          className="h-10 flex justify-center items-center gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <div className="flex justify-around">
        <div>
          {JSONJSON.parse(localStorage.getItem(socketId))}
        </div>
        <CopyToClipboard ids={allUser} />
      </div>
    </div>
  );
};

export default App;
