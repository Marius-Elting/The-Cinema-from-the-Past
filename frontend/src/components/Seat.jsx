function Seats({ data }) {
    const styles = {
        backgroundColor: data.art === "Loge" ? "green" : "blue",
        height: 50,
        width: 50,
        borderRadius: 100,
        position: 'absolute',
        bottom: data.platz <= 6 ? 75 : data.platz <= 12 ? 175 : data.platz <= 18 ? 275 : 375,
        right: data.position,
    };
    return (
        <div>
            <div id={data.platz} className={`Platz${data.platz} seat ${data.reserviert ? "reserved" : ""}`} style={styles}></div>
        </div>
    );
}

export default Seats;