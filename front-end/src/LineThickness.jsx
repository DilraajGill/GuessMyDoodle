import React from "react";

function LineThickness({thickness, setLineThickness}){
    return(
        <div>
            <label>Line Thickness:</label>
            <input type="range" min="1" value={thickness} onChange={(e) => setLineThickness(parseInt(e.target.value))}/>
        </div>
    )
}


export default LineThickness;