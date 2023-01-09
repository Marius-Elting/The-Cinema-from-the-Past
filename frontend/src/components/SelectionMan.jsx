import standman from "../img/standman.png";
import sitman from "../img/sitman.png";

function SelectionMan({ right, bottom }) {

    return (<div style={{
        position: "absolute",
        bottom: bottom,
        right: right,
        height: "100px",
        zIndex: 2,
        transition: ".1s linear"
    }}>
        <img id="SelectionMan" style={{
            height: "100%",
        }
        } src={standman} alt="standman" ></img>
    </div>);
}

export default SelectionMan;