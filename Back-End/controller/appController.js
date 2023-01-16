const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../env.js");
const Mailgen = require("mailgen");

/**  Send mail from testing account*/
const signup = async (req, res) => {
  // Testing account
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let message = {
    from: '"VireakRoth 😂" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "You Have Open the Camera", // plain text body
    html: "<b>You Have Open the Camera</b>", // html body}
    // send mail with defined transport object
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "You should recieve an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  //   res.status(201).json("Signup Successfully...");
};

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
  signup,
  getbill,
};
