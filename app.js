const express = require("express");

const app = express();

const fs = require("fs");

require("dotenv").config();

const PORT = process.dotenv.PORT || 4000;

const handlebars = require("handlebars");

const nodemailer = require("nodemailer");

app.use(express.json());

app.post("/sendEmail", async (req, res) => {
  try {
    console.log(req.body);

    const addressesList = req.body.addressList;

    const messageString = req.body.messageString;

    console.log(addressesList);

    const filePath = "index.html";
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);

    const replacements = {
      tomail: messageString,
    };
    const htmlToSend = template(replacements);

    let transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "herculesproject7@outlook.com",
        pass: "hercules7@7",
      },
    });

    await transporter.sendMail(
      {
        from: "herculesproject7@outlook.com",
        to: addressesList,
        subject: "Booking Confirmation",
        html: htmlToSend, // html body
      },
      (err, inf) => {
        console.log(err);
        console.log(inf);
      }
    );

    res.json({
      message: "Your Bookings is Confirmed, Email is sent successfully.",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.json({ err: "Something Went Wrong ", status: 501 });
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Everything is fine over here</h1>");
});

app.listen(PORT, () => {
  console.log(`App is running on Port : ${PORT}`);
});
