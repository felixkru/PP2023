import Script from 'next/script';
import { useKMeans } from './kmeans';
import bootstrap 

export default function SiteKMeans () {

    const custumDataSet = function () {
        document.addEventListener('DOMContentLoaded', () => {

        });
    }
    const basicSet = [
        [1,5,7],
        [-1,-5,8],
        [15,8,9],
        [12,7,8],
        [0,2,6],
        [8,4,9],
        [10,2,4],
        [9,1,-5],
    ];


    const hereWeGo = useKMeans(basicSet, "World");

    return(
        <div>
            
        </div>
    )
}