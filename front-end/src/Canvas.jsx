import React, {useRef, useEffect, useState} from "react";
import LineThickness from "./LineThickness";

function Canvas(){
    // Reference canvas object
    const canvasRef = useRef(null);
    // Reference 2D context
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineThickness, setLineThickness] = useState(1);

    function beginDrawing(ev){
        const {offsetX, offsetY} = ev.nativeEvent;
        console.log(`Drawing Began`);
        setIsDrawing(true);
        contextRef.current.beginPath();
    }

    function drawCanvas(ev){
        const { offsetX, offsetY } = ev.nativeEvent;
        if (isDrawing){
            console.log("Drawing");
            contextRef.current.lineWidth = lineThickness;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke(); 
        } else {
            console.log("Not Drawing");
        }
    }

    function endDrawing(){
        console.log("Drawing Ended");
        setIsDrawing(false);
    }

    useEffect(() => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const context = canvasRef.current.getContext("2d");
        contextRef.current = context;
    }, [])

    return(
        <div>
            <LineThickness thickness={lineThickness} setLineThickness={setLineThickness}/>
            <canvas ref={canvasRef}
                onMouseDown={beginDrawing}
                onMouseUp={endDrawing}
                onMouseMove={drawCanvas}
                role="canvas"
            />
        </div>
        
    )
}

export default Canvas;