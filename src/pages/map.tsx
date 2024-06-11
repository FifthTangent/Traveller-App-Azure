import { useRef, useEffect } from 'react';


function TravellerMap() {
    var canvas = document.getElementById("myCanvas");
    console.log(canvas)
    return (
        <div className="h-full w-full flex items-center justify-center bg-slate-800">
            <canvas id="myCanvas" width="200" height="100" className="">
            </canvas> 
        
        
        
        </div>
    );
}

export default TravellerMap;
