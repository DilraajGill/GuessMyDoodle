import React from "react";
import { SketchPicker } from "react-color";

function ColourChooser({toCanvas}){
    const [colour, setColour] = React.useState("#000");

    function changeColour(choice){
        setColour(choice.hex);
        toCanvas(choice.hex);
    }
    return(
        <div>
            <SketchPicker color = {colour} onChange={changeColour} />
        </div>
    )
}

export default ColourChooser;