import React from "react";
import { Button } from "react-bootstrap";
import "../../styles/Lobby.css";

function CanvasToolbar({
  drawingTool,
  setDrawingTool,
  ownedTools,
  undoMove,
  clearCanvas,
}) {
  return (
    <div className="toolbar-group right-side">
      <ToolbarButton
        icon="bi bi-brush"
        tool="draw"
        currentTool={drawingTool}
        setTool={setDrawingTool}
        keybind="B"
      />
      <ToolbarButton
        icon="bi bi-eraser-fill"
        tool="eraser"
        currentTool={drawingTool}
        setTool={setDrawingTool}
        keybind="E"
      />
      {ownedTools.includes("fill") && (
        <ToolbarButton
          icon="bi bi-paint-bucket"
          tool="fill"
          currentTool={drawingTool}
          setTool={setDrawingTool}
          keybind="F"
        />
      )}
      <Button type="button" onClick={undoMove} className="tool-button">
        <i className="bi bi-arrow-counterclockwise"></i>
        <span className="tool-label">U</span>
      </Button>
      <Button
        type="button"
        onClick={clearCanvas}
        className="tool-button"
        data-testid="clear"
      >
        <i className="bi bi-trash-fill"></i>
      </Button>
    </div>
  );
}

function ToolbarButton({ icon, tool, currentTool, setTool, keybind }) {
  return (
    <>
      <Button
        onClick={() => setTool(tool)}
        className={`tool-button ${currentTool === tool ? "active-tool" : ""}`}
      >
        <i className={icon}></i>
        {currentTool !== tool && <span className="tool-label">{keybind}</span>}
      </Button>
    </>
  );
}

export default CanvasToolbar;
