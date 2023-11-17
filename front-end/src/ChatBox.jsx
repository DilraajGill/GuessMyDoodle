import React, {useState, useEffect} from "react";

function ChatBox({socket, username}){
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => { 
        socket.on("receive-message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data])
        });
    }, [socket]);

    function handleSend(){
        socket.emit("send-message", {username, text: newMessage});
        setNewMessage("");
    }
}

export default ChatBox;