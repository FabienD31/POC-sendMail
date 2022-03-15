import express from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';


dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// smtp
const hostname = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const user = process.env.MAIL_USER;
const password = process.env.MAIL_PASS;

let transporter = nodemailer.createTransport({
    host: hostname,
    port: port,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: user,
        pass: password
    }
});
async function sendTestMail(data){
    return await transporter.sendMail(data, (erro, info) => {
        if (erro) {
            console.log("sendMailTest: " + erro.toString());
            return erro.toString;
        }
        return console.log("sendMailTest: " + info.response);
    });
};
const mailTestLog = [
{    id: 12345,
    datetime: "2020/01/01",
    event: "delete",
    name: "Fabien"
},   
]
let mailTest = `<p style="font-size: 20px;">Log journalier</p>
            <br />
            <br />
            <ul style="font-size: 14px;">
                <li>id du log : ${mailTestLog["id"]}</li>
                <li>date du log: ${mailTestLog["datetime"]}</li>
                <li>evenement du log: ${mailTestLog["event"]}</li>
                <li>Nom de l'utilisateur: ${mailTestLog["name"]}</li>
            </ul>
            <br />
            <br />
            <p style="font-size: 14px;">Bonne journée :-)</p>            
        `;
 await sendTestMail({
        from:"Fabien <fabien.desnoues31@gmail.com>",
        to: "Fabien <fabien.desnoues31@gmail.com>",
        subject: "test",
        html: mailTest
 });
    cron.schedule('1 * * * *', () => {
        console.log("cron");
        sendTestMail();

    });

app.listen(port, () => { console.log(`Listening on port ${port}`) })