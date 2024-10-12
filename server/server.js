require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const MongoStore = require("connect-mongo");

const app = express();

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL
      : [process.env.CLIENT_URL, "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGODB_URI,
//       collectionName: "sessions",
//       ttl: 24 * 60 * 60,
//       autoRemove: "native",
//       stringify: false,
//     }),
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       maxAge: 24 * 60 * 60 * 1000,
//       httpOnly: true,
//     },
//     name: "sessionId",
//   })
// );
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      ttl: 7 * 24 * 60 * 60, // 7 days
      stringify: true,
      autoRemove: "native",
    }),
    cookie: {
      secure: true, // Always use HTTPS
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
    },
    proxy: true, // trust the reverse proxy
    name: "sessionId",
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  console.log("Is Authenticated:", req.isAuthenticated());
  console.log("User:", req.user);
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  next();
});

app.use("/auth", authRoutes);

const templatePath = path.join(__dirname, "lets0.html");
let htmlTemplate;
try {
  htmlTemplate = fs.readFileSync(templatePath, "utf8");
} catch (error) {
  console.error("Error loading template:", error);
  process.exit(1);
}

app.post("/generate-image", async (req, res) => {
  let browser;
  console.log(req.body);
  try {
    const { formData, tasks } = req.body;
    const { date, day, productivity, hours, gratitude, suckedAt, username } =
      formData;

    console.log(tasks);

    let modifiedHtml = htmlTemplate;

    const taskHtml = tasks
      .map((task) => {
        return `
          <div class="quest-item ${task.completed ? "completed" : ""}">
            <div class="quest-checkbox ${task.completed ? "completed" : ""}">
              ${
                task.completed
                  ? '<i data-lucide="sparkles" class="lucide-icon timer"></i>'
                  : ""
              }
            </div>
            <span>${task.text}</span>
             ${
               task.completed
                 ? '<i data-lucide="check" class="lucide-icon check"></i>'
                 : ""
             }
          </div>
        `;
      })
      .join("");

    console.log(taskHtml);

    const replacements = {
      'id="date">date': `id="date">${date || "No date"}`,
      'id="day">day': `id="day">${day || "0"}`,
      'id="powerLevel">power': `id="powerLevel">${productivity || "0"}/10`,
      'id="hours">6': `id="hours">${hours || "0"}`,
      'id="gratitude">g': `id="gratitude">${gratitude || "No gratitude entry"}`,
      'id="challenges">challenges': `id="challenges">${
        suckedAt || "No challenges recorded"
      }`,
      'id="username">Adhikowshik': `id="username">${username || "Anonymous"}`,
      '<div class="space-y-4" id="questList"></div>': `<div class="space-y-4" id="questList">${taskHtml}</div>`,
    };

    for (const [find, replace] of Object.entries(replacements)) {
      modifiedHtml = modifiedHtml.replace(find, replace);
    }

    const puppeteerConfig = {
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--window-size=1080,1350",
        "--font-render-hinting=none",
        "--disable-web-security",
      ],
      headless: "new",
    };

    if (process.env.RENDER) {
      puppeteerConfig.executablePath =
        process.env.PUPPETEER_EXECUTABLE_PATH ||
        "/usr/bin/google-chrome-stable";
    }

    browser = await puppeteer.launch(puppeteerConfig);
    const page = await browser.newPage();

    await page.setContent(modifiedHtml, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 30000,
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    await page.setViewport({
      width: 1080,
      height: 1350,
      deviceScaleFactor: 2,
    });

    const imageBuffer = await page.screenshot({
      type: "png",
      fullPage: false,
      omitBackground: true,
      encoding: "binary",
    });

    res.set({
      "Content-Type": "image/png",
      "Content-Length": imageBuffer.length,
      "Content-Disposition": `attachment; filename=quest-log-${
        date || "untitled"
      }.png`,
      "Cache-Control": "no-cache",
    });

    var b64 = Buffer.from(imageBuffer).toString("base64");

    res.json({
      image: `data:image/png;base64,${b64}`,
    });

    console.log("Image sent.");
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({
      error: "Failed to generate image",
      details: error.message,
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.get("/test-image", async (req, res) => {
  let browser;
  try {
    const testHtml = `
      <!DOCTYPE html>
      <html>
        <body style="background: white; padding: 20px;">
          <h1>Test Image Generation</h1>
          <p>Generated at: ${new Date().toISOString()}</p>
        </body>
      </html>
    `;

    const puppeteerConfig = {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: "new",
    };

    if (process.env.RENDER) {
      puppeteerConfig.executablePath =
        process.env.PUPPETEER_EXECUTABLE_PATH ||
        "/usr/bin/google-chrome-stable";
    }

    browser = await puppeteer.launch(puppeteerConfig);

    const page = await browser.newPage();
    await page.setContent(testHtml);
    await page.setViewport({ width: 800, height: 600 });

    const imageBuffer = await page.screenshot({
      type: "png",
      fullPage: false,
    });

    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
    console.log("Test image sent.");
  } catch (error) {
    console.error("Test image error:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (browser) await browser.close();
  }
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
