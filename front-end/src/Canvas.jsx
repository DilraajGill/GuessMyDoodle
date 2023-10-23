import React, {useRef, useEffect, useState} from "react";

function Canvas(){
    // Reference canvas object
    const canvasRef = useRef(null);
    // Reference 2D context
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineThickness, setLineThickness] = useState(1);

    function beginDrawing(ev){
        const {offsetX, offsetY} = ev.nativeEvent;
        console.log(`Moving to ${offsetX} ${offsetY}`);
        setIsDrawing(true);
        contextRef.current.beginPath();
    }

    function drawCanvas(ev){
        const { offsetX, offsetY } = ev.nativeEvent;
        if (isDrawing){
           contextRef.current.lineTo(offsetX, offsetY);
         contextRef.current.stroke(); 
        }
    }

    function endDrawing(){
        setIsDrawing(false);
    }

    useEffect(() => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const context = canvasRef.current.getContext("2d");
        contextRef.current = context;
    }, [])

    return(
        <canvas ref={canvasRef}
            onMouseDown={beginDrawing}
            onMouseUp={endDrawing}
            onMouseMove={drawCanvas}
        />
    )
}

export default Canvas;