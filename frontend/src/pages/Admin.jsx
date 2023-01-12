import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Admin() {
    const [seats, setSeats] = useState([]);
    // window.reload();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKENDURL}api/seats`)
            .then(res => res.json())
            .then(data => setSeats(data));
    },);

    const ParkettUmsatz = (seats.filter(data => data.reserviert && data.art === "Parkett").length) * 8;
    const LogeUmsatz = (seats.filter(data => data.reserviert && data.art === "Loge").length) * 12;

    const resetAll = () => {
        fetch(`${process.env.REACT_APP_BACKENDURL}api/seats`,
            { method: "DELETE" }
        )
            .then(res => res.json())
            .then(data => setSeats(data));
    };
    return (<section className="AdminPageWrapper">
        <Link to="/">Back Home</Link>
        <article>
            <div>
                <p>Freie Plätze</p>
                <p>{seats.filter(data => !data.reserviert).length}</p>
            </div>

            <div>
                <p>Umsatz</p>
                <p>{ParkettUmsatz + LogeUmsatz} €</p>
            </div>
        </article>
        <div onClick={resetAll}>
            Reset
        </div>
    </section>
    );
}

export default Admin;