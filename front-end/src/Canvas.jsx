import React, { useRef, useEffect, useState } from "react";

/**
 * Canvas component for drawing onto
 * @param {number} lineThickness - The thickness of the line
 * @param {string} colour - The colour of the line
 * @param {object} socket - The socket for real-time communication
 * @param {string} lobbyId - The ID of the lobby
 * @returns {object} Canvas element that updates to show other drawings and yours
 */
function Canvas({ type, lineThickness, colour, socket, lobbyId }) {
  // Reference canvas object
  /**
   * Reference to the canvas element
   */
  const canvasRef = useRef(null);
  // Reference 2D context
  /**
   * Reference to the canvas 2D Drawing context
   */
  const contextRef = useRef(null);
  // Define states to store drawing information
  /**
   * State to track if user is drawing
   */
  const [isDrawing, setIsDrawing] = useState(false);
  /**
   * State to track previous drawings made before user joined
   */
  const [drawings, setDrawings] = useState([]);

  // Emit if the user has started drawing
  /**
   * Establish that the user has began drawing
   * @param {MouseEvent} ev - Mouse event triggering it
   */
  function beginDrawing(ev) {
    console.log(`Drawing Began`);
    setIsDrawing(true);
    socket.emit("beginDrawing", { lobbyId });
  }
  // Send drawing information to the back-end server to begin checks
  /**
   * Handles transmission of user drawing to the back-end server
   * @param {MouseEvent} ev - Mouse event triggering it
   */
  function drawCanvas(ev) {
    const { offsetX, offsetY } = ev.nativeEvent;
    if (isDrawing) {
      console.log(`${type}`);
      socket.emit("drawing", {
        x: offsetX,
        y: offsetY,
        thickness: lineThickness,
        colour: type === "draw" ? colour : "#FFFF",
        type: "draw",
        lobbyId,
      });
    } else {
      console.log("Not Drawing");
    }
  }
  // Adjust the state to show user has stopped drawing
  /**
   * Handles the end of the drawing session (once mouse has gone up)
   */
  function endDrawing() {
    console.log("Drawing Ended");
    setIsDrawing(false);
    socket.emit("endDrawing", { lobbyId });
  }
  // Draw on the canvas for the information received
  /**
   * Draw canvas drawings onto the canvas according to received socket transmission
   * @param {object} data - The drawing data sent by server
   */
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
    socket.on("endDrawing", () => {
      contextRef.current.closePath();
    });
    // Define handler to receive the intial drawings
    socket.on("initial-drawings", (data) => {
      setDrawings(data);
    });
    socket.on("clear-canvas", () => {
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    });
  }, []);

  useEffect(() => {
    drawings.forEach((drawing) => {
      // If the state of drawings adjusts, draw this information onto the canvas
      if (drawing.type === "draw") {
        drawOntoCanvas(drawing);
      } else if (drawing.type === "move") {
        contextRef.current.beginPath();
      } else if (drawing.type === "end") {
        contextRef.current.closePath();
      }
    });
  }, [drawings]);

  function clearCanvas() {
    socket.emit("clear-canvas");
  }
  return (
    <div>
      <button type="button" onClick={clearCanvas}>
        Clear
      </button>
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
