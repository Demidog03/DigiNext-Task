import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
import cl from "./Chart.module.css"
import {useNavigate} from "react-router-dom";

function Chart() {
    /** I tried to draw canvas by Canvas but could not :(*/
    /** So below I used the CanvasJS API*/
    // const canvasRef = useRef(null)
    // const entities = useSelector(state => state.entities.entities)
    //
    // useEffect(() => {
    //     console.log(entities)
    //     if(entities.length!==0){
    //         drawCanvas()
    //     }
    //
    // }, [entities, entities.coordinate])


    // function drawCanvas(){
    //     const canvas = canvasRef.current;
    //     // const ctx = canvas.getContext("2d")
    //
    //
    //     // Notice I changed The X values
    //     let data = { values: entities};
    //
    //     // Returns the max Y value in our data list
    //     function getMaxY() {
    //         let max = 0;
    //
    //         for(let i = 0; i < data.values.length; i ++) {
    //             if(data.values[i].coordinate.y > max) {
    //                 max = data.values[i].coordinate.y;
    //             }
    //         }
    //
    //         max += 10 - max % 10;
    //         return max;
    //     }
    //
    //     function getMinY() {
    //         let min = 0;
    //
    //         for(let i = 0; i < data.values.length; i ++) {
    //             if(data.values[i].coordinate.y < min) {
    //                 min = data.values[i].coordinate.y;
    //             }
    //         }
    //
    //         min -= 10 + min % 10;
    //         return min;
    //     }
    //
    //     // Returns the max X value in our data list
    //     function getMaxX() {
    //         let max = 0;
    //
    //         for(let i = 0; i < data.values.length; i ++) {
    //             if(data.values[i].coordinate.x > max) {
    //                 max = data.values[i].coordinate.x;
    //             }
    //         }
    //
    //         max += 10 - max % 10;
    //         return max;
    //     }
    //
    //     function getMinX(){
    //         let min = 0;
    //
    //         for(let i = 0; i < data.values.length; i ++) {
    //             if(data.values[i].coordinate.x < min) {
    //                 min = data.values[i].coordinate.x;
    //             }
    //         }
    //
    //         min -= 10 + min % 10;
    //
    //         return min;
    //     }
    //
    //     console.log(getMinX())
    //
    //     let xPadding = 100 - getMinX();
    //     let yPadding = 200 - getMaxY();
    //
    //     // Return the x pixel for a canvas point
    //     function getXPixel(val) {
    //         return ((canvas.width - getMinX()) / getMaxX()) * val + (xPadding * 1.5);
    //     }
    //
    //     // Return the y pixel for a canvas point
    //     function getYPixel(val) {
    //         return canvas.height - (((canvas.height - yPadding) / getMaxY()) * val) - yPadding;
    //     }
    //
    //     let c = canvas.getContext('2d');
    //
    //     c.lineWidth = 2;
    //     c.strokeStyle = '#333';
    //     c.font = 'italic 8pt sans-serif';
    //     c.textAlign = "center";
    //
    //     // Draw the axises
    //     c.beginPath();
    //     c.moveTo(xPadding, 0);
    //     c.lineTo(xPadding, canvas.height - yPadding);
    //
    //     c.lineTo( getMinX(), canvas.height - yPadding );
    //     c.lineTo( canvas.width, canvas.height - yPadding);
    //
    //     c.stroke();
    //
    //     // Draw the X value texts
    //     for(let i = 0; i < data.values.length; i ++) {
    //         // uses data.values[i].coordinate.x
    //         c.fillText(data.values[i].coordinate.x, getXPixel(data.values[i].coordinate.x), canvas.height - yPadding + 20);
    //     }
    //
    //     // Draw the Y value texts
    //     c.textAlign = "right"
    //     c.textBaseline = "middle";
    //
    //     for(let i = 0; i < getMaxY(); i += 10) {
    //         c.fillText(i, xPadding - 10, getYPixel(i));
    //     }
    //
    //     c.strokeStyle = '#f00';
    //
    //
    //     // Draw the dots
    //     c.fillStyle = '#333';
    //
    //     for(let i = 0; i < data.values.length; i ++) {
    //         c.beginPath();
    //         c.arc(getXPixel(data.values[i].coordinate.x), getYPixel(data.values[i].coordinate.y), 4, 0, Math.PI * 2, true);
    //         c.fill();
    //     }
    // }

    const entities = useSelector(state => state.entities.entities)
    const [options, setOptions] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        if(entities.length!==0){
            setOptions ({
                theme: "light",
                animationEnabled: true,
                zoomEnabled: true,
                title:{
                    text: "Entities"
                },
                axisX: {
                    title:"X axis",
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true
                    }
                },
                axisY:{
                    title: "Y axis",
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true
                    }
                },
                data: [{
                    type: "scatter",
                    markerSize: 15,
                    toolTipContent: "X: {x}, Y: {y}",
                    dataPoints: entities.map(entity => entity.coordinate)
                }]
            })
        }
    }, [entities, entities.coordinate])

    return (
        <div className={cl.chartWrapper}>
            <CanvasJSChart options={options} style={{height: '80vh'}} />
            <button onClick={() => navigate("/entities")}>Go to main</button>
        </div>

    );
}

export default Chart;
