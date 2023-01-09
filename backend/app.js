import express from "express";
import cors from "cors";
// import morgan from "morgan";
import fs from "fs";
const app = express();


app.use(express.json());
app.use(cors());
const PATH = "./data.json";
const PORT = "9999";



app.get("/api/seats", (req, res) => {
    fs.readFile(PATH, (err, data) => {
        res.json(JSON.parse(data));
    });
});

app.post("/api/seats", (req, res) => {
    const reservedSeats = req.body.ids;
    fs.readFile(PATH, (err, data) => {
        const readedData = JSON.parse(data);
        readedData.forEach(element => {
            if (reservedSeats.includes(element.platz)) {
                element.reserviert = true;
            }
        });
        fs.writeFile(PATH, JSON.stringify(readedData, null, 2), () => {
            if (err) console.log(err);
        });
        res.json(readedData);


    });
});

app.delete("/api/seats", (req, res) => {
    fs.readFile(PATH, (err, data) => {
        const readedData = JSON.parse(data);
        readedData.forEach(element => {
            element.reserviert = false;
        });
        fs.writeFile(PATH, JSON.stringify(readedData, null, 2), () => {
            if (err) console.log(err);
        });
        res.json(readedData);
    });
});

app.listen(PORT, () => { console.log("Der Lachs läuft"); });