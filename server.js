import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/* 1) App */
const app = express();
const PORT = process.env.PORT || 5000;

/* 2) Middlewares */
// const origins =
//   (process.env.CLIENT_ORIGIN && process.env.CLIENT_ORIGIN.split(",")) || "*";

// app.use(
//   cors({
//     origin: origins,       // e.g. "https://your-frontend.vercel.app,https://78marketingagency.com"
//     credentials: false,    // no cookies in this API; set true only if needed
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// Handle CORS preflight quickly
// app.options("*", cors());

/* 2) Middlewares */
app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));

/* 3) Multer (file uploads) */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

/* 4) Health check */
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, message: "Hello From Root Folder" })
);

/* 5) Checkout form (with file) */
app.post("/api/send", upload.any(), async (req, res) => {
  try {
    const { name, email, phone, paymentMethod } = req.body || {};

    if (!name || !email || !paymentMethod) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "Missing required fields",
      });
    }

    const file =
      Array.isArray(req.files) && req.files.length ? req.files[0] : null;

    // console.log(" [SEND] Starting email process...");
    // console.log(" [SEND] Mail Host:", process.env.MAIL_HOST);
    // console.log(" [SEND] Mail Port:", process.env.MAIL_PORT);
    // console.log(" [SEND] Mail User:", process.env.MAIL_USER);
    // console.log(" [SEND] Mail To:", email);
    // console.log(" [SEND] Mail Pass Length:", process.env.MAIL_PASS?.length);

    // Enhanced email transporter with better configuration
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 587),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      debug: true,
      logger: true,
    });

    // console.log(" [SEND] Transporter created, verifying...");

    // Verify transporter configuration
    await transporter.verify();
    // console.log("[SEND] Transporter verified successfully!");

    const html = `
      <h2>New TikTok Ads Checkout</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "-"}</p>
      <p><b>Payment Method:</b> ${paymentMethod}</p>
    `;

    const mailOptions = {
      from: `"78 Marketing Agency" <${process.env.MAIL_USER}>`,
      to: email || process.env.MAIL_USER,
      subject: "New Payment Submission – TikTok Ads Account",
      html,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
              contentType: file.mimetype,
            },
          ]
        : [],
    };

    // console.log(" [SEND] Sending email...");
    const emailResult = await transporter.sendMail(mailOptions);
    // console.log("[SEND] Email sent successfully!", emailResult.messageId);

    return res.json({ ok: true, success: true });
  } catch (err) {
    console.error(" [SEND] MAIL ERROR:", err);
    return res.status(500).json({
      ok: false,
      success: false,
      message: "Email failed",
      error: process.env.NODE_ENV === "production" ? undefined : err.message,
    });
  }
});

/* 6) Contact form (JSON only) */
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body || {};
    // console.log(" [CONTACT] Form data received:", {
    //   firstName,
    //   lastName,
    //   email,
    //   phone,
    //   message,
    // });

    if (!firstName || !email || !message) {
      return res.status(400).json({
        ok: false,
        success: false,
        message: "Missing required fields",
      });
    }

    // console.log(" [CONTACT] Starting email process...");
    // console.log(" [CONTACT] Mail Host:", process.env.MAIL_HOST);
    // console.log(" [CONTACT] Mail Port:", process.env.MAIL_PORT);
    // console.log(" [CONTACT] Mail User:", process.env.MAIL_USER);
    // console.log(" [CONTACT] Mail To:", email);
    // console.log(
    //   " [CONTACT] Mail Pass Length:",
    //   process.env.MAIL_PASS?.length
    // );
    // console.log(" [CONTACT] NODE_ENV:", process.env.NODE_ENV);

    // Enhanced email transporter with better configuration
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 587),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      debug: true,
      logger: true,
    });

    // console.log(" [CONTACT] Transporter created, verifying...");

    // Verify transporter configuration
    await transporter.verify();
    // console.log("[CONTACT] Transporter verified successfully!");

    const html = `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${firstName} ${lastName || ""}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "-"}</p>
      <p><b>Message:</b></p>
      <p>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    const mailOptions = {
      from: `"78 Marketing Agency" <${process.env.MAIL_USER}>`,
      to: email || process.env.MAIL_USER,
      replyTo: email,
      subject: "New Contact Form Submission",
      html,
    };

    console.log(" [CONTACT] Sending email...");
    const emailResult = await transporter.sendMail(mailOptions);
    // console.log("[CONTACT] Email sent successfully!", emailResult.messageId);
    // console.log("[CONTACT] Email response:", emailResult);

    return res.json({ ok: true, success: true });
  } catch (err) {
    console.error(" [CONTACT] MAIL ERROR:", err);
    console.error(" [CONTACT] Error details:", {
      message: err.message,
      code: err.code,
      command: err.command,
    });

    return res.status(500).json({
      ok: false,
      success: false,
      message: "Email failed - check server logs",
      error: process.env.NODE_ENV === "production" ? undefined : err.message,
    });
  }
});

/* 7) Export for Vercel / Listen for local dev */
if (!process.env.VERCEL) {
  app.listen(PORT, () =>
    console.log(`Backend running on http://localhost:${PORT}`)
  );
}

export default app;
