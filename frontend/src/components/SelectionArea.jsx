import SelectionMan from "./SelectionMan";
import { useState, useEffect } from "react";
import Seat from "./Seat";
import { Link } from "react-router-dom";
function SelectionArea() {
    const [right, setRight] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [seats, setSeats] = useState([]);
    const [price, setPrice] = useState(0);
    useEffect(() => {
        window.addEventListener("keydown", checkKey);
        return () => {
            window.removeEventListener("keydown", checkKey);
        };
    }, [right, bottom]);

    function elementsOverlap(el1, el2) {
        const domRect1 = el1.getBoundingClientRect();
        const domRect2 = el2.getBoundingClientRect();

        return !(
            domRect1.top > domRect2.bottom ||
            domRect1.right < domRect2.left ||
            domRect1.bottom < domRect2.top ||
            domRect1.left > domRect2.right
        );
    };

    const checkKey = (e) => {
        if (e.key === "d" && right > 0) {
            setRight(prev => prev - 20);
        }
        if (e.key === "a" && right < 600) {
            setRight(prev => prev + 20);
        }
        if (e.key === "w" && bottom < 450) {
            setBottom(prev => prev + 20);
        }
        if (e.key === "s" && bottom > 0) {
            setBottom(prev => prev - 20);
        }
        const chair = Array.from(document.getElementsByClassName("seat"));
        const man = document.getElementById("SelectionMan");
        const selectedChair = chair.filter(element => elementsOverlap(man, element));
        chair.forEach((chair) => chair.classList.remove("hovering"));
        const classList = Array.from(selectedChair[0].classList);
        if (!classList.includes("reserved")) selectedChair[0].classList.add("hovering");
        if (e.key === " ") {
            if (classList.includes("selected") && !classList.includes("reserved")) {
                selectedChair[0].classList.remove("selected");
                const remVal = selectedChair[0].id <= 12 ? 12 : 8;
                setPrice(prev => prev - remVal);
            } else if (!classList.includes("selected") && !classList.includes("reserved")) {
                selectedChair[0].classList.add("selected");
                const addVal = selectedChair[0].id <= 12 ? 12 : 8;
                setPrice(prev => prev + addVal);
            }
        }
    };
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKENDURL}api/seats`)
            .then(res => res.json())
            .then(seats => {
                setSeats(seats);
            });
    }, []);

    const submitData = () => {
        const chair = Array.from(document.getElementsByClassName("seat"));
        const checkedSeats = chair.filter(element => Array.from(element.classList).includes("selected"));
        const checkedIds = [];
        setPrice(0);
        checkedSeats.forEach((elem) => checkedIds.push(Number(elem.id)));
        fetch(`${process.env.REACT_APP_BACKENDURL}api/seats`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: checkedIds })
            }).then(res => res.json())
            .then(data => setSeats(data));
    };

    return (<section style={{
        height: "650px",
        width: "650px",
        position: "relative",
        backgroundColor: "blueviolet",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 30
    }}>
        <SelectionMan right={right} bottom={bottom} />
        {seats.map((data) => {
            return (
                <Seat data={data} />
            );
        })
        }
        <a href="/admin">to Admin</a>
        <button style={{
            height: 50,
            width: 100,
            backgroundColor: "#2c2c2c",
            border: "none",
            borderRadius: 10,
            color: "white",
        }} onClick={submitData}>Bestellen</button>
        <p>Preis: {price}€</p>
    </section>);
}

export default SelectionArea;