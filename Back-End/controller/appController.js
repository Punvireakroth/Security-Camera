const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../env.js");
const Mailgen = require("mailgen");
const Datastore = require("nedb");

// new instance of NeDB and its file location
const db = new Datastore({ filename: "./db.json", autoload: true });

// function handle when button is click create a new docs with current time then insert to NeDB database
let currentTime = new Date();
db.insert({ time: currentTime }, (err, newDoc) => {
  if (err) console.error(err);
  console.log("Time inserted:", newDoc.time);
});

/** send mail from real gmail account */
const getbill = (req, res) => {
  const { userEmail } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Rasberry Pi Camera",
      link: "https://mailgen.js",
    },
  });

  let response = {
    body: {
      name: "User",
      intro: "Your Camera has been open",
      table: {
        data: [
          {
            item: "The link ",
            description: "http://172.16.2.84:8000",
          },
        ],
      },
      outro: "Looking forward to see you again",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Camera Security",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  getbill,
};
