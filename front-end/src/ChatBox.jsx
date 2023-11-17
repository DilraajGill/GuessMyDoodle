import React, {useState, useEffect} from "react";
export function receiveMessage(data, setMessages){
    console.log("Received message");
    setMessages((prevMessages) => [...prevMessages, data])
}

function ChatBox({socket, username}){
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => { 
        socket.on("receive-message", (data) => {
            receiveMessage(data, setMessages);
        })
    }, [socket]);

    function handleSend(){
        socket.emit("send-message", {username, text: newMessage});
        setNewMessage("");
    };

    return(
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key = {index}>
                        <strong>{message.username}: </strong>{message.text}
                    </div>
                ))}
            </div>
            <input type="text" value={newMessage} onChange={(e) => { setNewMessage(e.target.value)}} role="textbox"></input>
            <button onClick={handleSend}>Send</button>
        </div>
    )
}

export default ChatBox;