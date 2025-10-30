// server.js
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

app.use(cors({
  origin: '*'
}))

app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));

/* 3) Multer (file uploads) */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

/* 4) Health check */
app.get("/api/health", (_req, res) => res.json({ ok: true,  message: "Hello From Root Folder" }));

/* 5) Checkout form (with file) */
app.post("/api/send", upload.any(), async (req, res) => {
  try {
    const { name, email, phone, paymentMethod } = req.body || {};

    if (!name || !email || !paymentMethod) {
      return res
        .status(400)
        .json({ ok: false, success: false, message: "Missing required fields" });
    }

    const file =
      Array.isArray(req.files) && req.files.length ? req.files[0] : null;

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,                    // e.g. smtp.gmail.com
      port: Number(process.env.MAIL_PORT || 587),     // usually 587
      secure: false,                                   // TLS with 587
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });

    const html = `
      <h2>New TikTok Ads Checkout</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "-"}</p>
      <p><b>Payment Method:</b> ${paymentMethod}</p>
    `;

    await transporter.sendMail({
      from: `"78 Marketing Agency" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
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
    });

    return res.json({ ok: true, success: true });
  } catch (err) {
    console.error("MAIL ERROR (/api/send):", err);
    return res
      .status(500)
      .json({ ok: false, success: false, message: "Email failed" });
  }
});

/* 6) Contact form (JSON only) */
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body || {};

    if (!firstName || !email || !message) {
      return res
        .status(400)
        .json({ ok: false, success: false, message: "Missing required fields" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 587),
      secure: false,
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });

    const html = `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${firstName} ${lastName || ""}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "-"}</p>
      <p><b>Message:</b></p>
      <p>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: `"78 Marketing Agency" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      replyTo: email,
      subject: "New Contact Form Submission",
      html,
    });

    return res.json({ ok: true, success: true });
  } catch (err) {
    console.error("MAIL ERROR (/api/contact):", err);
    return res
      .status(500)
      .json({ ok: false, success: false, message: "Email failed" });
  }
});

/* 7) Export for Vercel / Listen for local dev */
if (!process.env.VERCEL) {
  app.listen(PORT, () =>
    console.log(`✅ Backend running on http://localhost:${PORT}`)
  );
}

export default app;
