import React, { useRef, useEffect, useState } from "react";

function Canvas({ lineThickness, colour, socket, lobbyId }) {
  // Reference canvas object
  const canvasRef = useRef(null);
  // Reference 2D context
  const contextRef = useRef(null);
  // Define states to store drawing information
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawings, setDrawings] = useState([]);

  // Emit if the user has started drawing
  function beginDrawing(ev) {
    console.log(`Drawing Began`);
    setIsDrawing(true);
    socket.emit("beginDrawing", { lobbyId });
  }
  // Send drawing information to the back-end server to begin checks
  function drawCanvas(ev) {
    const { offsetX, offsetY } = ev.nativeEvent;
    if (isDrawing) {
      console.log("Drawing");
      socket.emit("drawing", {
        x: offsetX,
        y: offsetY,
        thickness: lineThickness,
        colour: colour,
        type: "draw",
        lobbyId,
      });
    } else {
      console.log("Not Drawing");
    }
  }
  // Adjust the state to show user has stopped drawing
  function endDrawing() {
    console.log("Drawing Ended");
    setIsDrawing(false);
  }
  // Draw on the canvas for the information received
  function drawOntoCanvas(data) {
    const { x, y, thickness, colour } = data;
    contextRef.current.lineWidth = thickness;
    contextRef.current.strokeStyle = colour;
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  }
  useEffect(() => {
    // Set canvas to match the size of the window
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    const context = canvasRef.current.getContext("2d");
    contextRef.current = context;
    // Request intial drawings from the server if arriving late
    socket.emit("initialise-drawings");
    // Define handler for drawing information received
    socket.on("drawing", (data) => {
      drawOntoCanvas(data);
    });
    // Define handler for when user has began drawing
    socket.on("beginDrawing", () => {
      console.log("Began Path");
      contextRef.current.beginPath();
    });
    // Define handler to receive the intial drawings
    socket.on("initial-drawings", (data) => {
      setDrawings(data);
    });
  }, []);

  useEffect(() => {
    drawings.forEach((drawing) => {
      // If the state of drawings adjusts, draw this information onto the canvas
      if (drawing.type === "draw") {
        drawOntoCanvas(drawing);
      } else if (drawing.type === "move") {
        contextRef.current.beginPath();
      }
    });
  }, [drawings]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={beginDrawing}
        onMouseUp={endDrawing}
        onMouseMove={drawCanvas}
        role="canvas"
      />
    </div>
  );
}

export default Canvas;
