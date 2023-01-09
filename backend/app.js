import express from "express";
import cors from "cors";
// import morgan from "morgan";
import fs from "fs";
import nodemailer from "nodemailer";
import "./config.js";

// import dotenv from "dotenv";
const app = express();
const PATH = "./data.json";
const PORT = process.env.PORT;


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        // user: process.env.NODEMAILER_USER,
        // pass: process.env.NODEMAILER_PASS
        user: "5755612693b2b2",
        pass: "9f99bae9410ab6"
    }
});

app.use(express.json());
app.use(cors());




app.get("/api/seats", (req, res) => {
    fs.readFile(PATH, (err, data) => {
        res.json(JSON.parse(data));
    });
});

const sendMail = (seats) => {
    return new Promise((resolve, reject) => {
        const message = {
            to: "WerDasLießtStinkt@Kacke.com",
            from: "WerDasLießtStinkt@Kacke.com",
            subject: `Es wurden ${seats} reserviert`,
            text: `Es wurden ${seats} gebucht!`,
            html: `<p style="color: purple;">Es wurden ${seats} gebucht!</p>`,
        };
        transport.sendMail(message, (err, info) => {
            // console.log(info);
            // console.log(err);
            console.log("mail gesendet");
            // if (err) return res.status(500).json({ message: err });
            // return res.status(200).json({
            //     status: "success",
            //     message: "Mail senden",
            // });
            resolve("Mail gesendet");
        });
    }
    );

};

app.post("/api/seats", (req, res) => {
    const reservedSeats = req.body.ids;
    const seats = reservedSeats.length;
    sendMail(seats)
        .then(data => {
            console.log({ data });
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

app.listen(PORT, () => { console.log("Der Lachs läuft", PORT); });