'use Client'
import Image from "next/image";
import {useState} from "react";

export function DynamicGeneratesInputFiles () {

    const [counterCountFiles, setCounterCountFiles] = useState(3);
    const [counterCountAdd, setCounterCountAdd] = useState(2);
    const [buttonInnerText, setButtonInnerText] = useState('2 Punkte');
    const [disableButton, setDisableButton] = useState(false);
    const [inputDataArray, setInputDataArray] = useState([...[]]);

    const handleButtonAdd = () => {
        setCounterCountAdd((click) => click + 1);
    };

    return {
        handleButtonAdd,
    }
}

export function CreateManuelInputFields () {

    const {counterCountAdd, handleButtonAdd} = DynamicGeneratesInputFiles();

    return (
        <div>
            <section id='vectors' className='mb-5'>
                Hier kommen die Inputs mit den Vektoren hin
            </section>
            <section id='addVectorButton' className='mb-5'>
                <button type="button"
                        className='plus-button'
                        value={counterCountAdd}
                        onClick={handleButtonAdd}
                >
                    <Image src="/plus-icon.svg" width={50} height={50} alt="Plus Icon" />
                </button>
            </section>
        </div>
    );
}

