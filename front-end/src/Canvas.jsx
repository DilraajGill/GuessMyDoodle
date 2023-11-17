import React, {useRef, useEffect, useState} from "react";
import LineThickness from "./LineThickness";
import socket from "./SocketManager";
import ColourChooser from "./ColourChooser";
import ChatBox from "./ChatBox";

function Canvas(){
    // Reference canvas object
    const canvasRef = useRef(null);
    // Reference 2D context
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineThickness, setLineThickness] = useState(1);
    const [drawings, setDrawings] = useState([]);
    const [colour, setColour] = useState("#000");

    function beginDrawing(ev){
        console.log(`Drawing Began`);
        setIsDrawing(true);
        socket.emit("beginDrawing");
    }

    function drawCanvas(ev){
        const { offsetX, offsetY } = ev.nativeEvent;
        if (isDrawing){
            console.log("Drawing");
            socket.emit("drawing", {
                x: offsetX,
                y: offsetY,
                thickness: lineThickness,
                colour: colour,
                type: "draw"
            });
        } else {
            console.log("Not Drawing");
        }
    }

    function endDrawing(){
        console.log("Drawing Ended");
        setIsDrawing(false);
    }

    function drawOntoCanvas(data){
        const {x, y, thickness, colour} = data;
        contextRef.current.lineWidth = thickness;
        contextRef.current.strokeStyle = colour;
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
    }

    useEffect(() => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const context = canvasRef.current.getContext("2d");
        contextRef.current = context;

        socket.on("drawing", (data) => {
            drawOntoCanvas(data);
        })

        socket.on("beginDrawing", ()=>{
            contextRef.current.beginPath();
        })
    }, [])

    return(
        <div>
            <LineThickness thickness={lineThickness} setLineThickness={setLineThickness}/>
            <ColourChooser toCanvas={setColour}/>
            <canvas ref={canvasRef}
                onMouseDown={beginDrawing}
                onMouseUp={endDrawing}
                onMouseMove={drawCanvas}
                role="canvas"
            />
            <ChatBox socket={socket} username="Test Name"/>
        </div>
        
    )
}

export default Canvas;