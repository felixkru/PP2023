'use client'
import {useEffect, useState} from "react";
import {UseInputKPoints} from './input-k-points';

export function HandleCalculateButtonClick () {

    /*
    const {numberOfClusters} = UseInputKPoints();
    const HandleClick = () => {
        console.log("Hellooooo")
        console.log(numberOfClusters);
    }

    return HandleClick;
     */

}
export function CalculateButton() {

    //const {handleCalculateButtonClick} = HandleCalculateButtonClick();

    return (
        <button
            type="button"
            className='compute-btn button'
            //onClick={handleCalculateButtonClick}
        >
            Berechnen
        </button>
    );
}