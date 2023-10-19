import React, {useRef, useEffect} from "react";

function Canvas(){
    // Reference canvas object
    const canvasRef = useRef(null);
    // Reference 2D context
    const contextRef = useRef(null);

    function beginDrawing(ev){
        const {offsetX, offsetY} = ev.nativeEvent;
        console.log(`Moving to ${offsetX} ${offsetY}`);
        contextRef.current.beginPath();
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
        />
    )
}

export default Canvas;