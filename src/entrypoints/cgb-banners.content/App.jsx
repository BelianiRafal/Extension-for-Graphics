import { useEffect, useState } from "react";
import Buttons from "./Buttons";

export default function App() {
    const [imageData, setImageData] = useState([]);

    let findImage = document.querySelectorAll('tr[id^="trcheckrow"] video[name="media"]');

    if (findImage.length === 0) {
    findImage = document.querySelectorAll('tr[id^="trcheckrow"] img');
    }


    return (
        <Buttons data = {findImage}/>
    )
}

