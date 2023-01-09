import { useEffect, useState } from "react";

function Admin() {
    const [seats, setSeats] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9999/api/seats")
            .then(res => res.json())
            .then(data => setSeats(data));
    }, []);
    console.log();
    const ParkettUmsatz = (seats.filter(data => data.reserviert && data.art === "Parkett").length) * 8;
    const LogeUmsatz = (seats.filter(data => data.reserviert && data.art === "Loge").length) * 12;

    const resetAll = () => {
        fetch("http://localhost:9999/api/seats",
            { method: "DELETE" }
        )
            .then(res => res.json())
            .then(data => setSeats(data));
    };
    return (<section>
        <div>
            <p>Freie Plätze</p>
            <p>{seats.filter(data => !data.reserviert).length}</p>
        </div>
        <div>
            <p>Umsatz</p>
            <p>{ParkettUmsatz + LogeUmsatz} €</p>
        </div>
        <div onClick={resetAll}>
            Reset
        </div>
    </section >
    );
}

export default Admin;