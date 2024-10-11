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

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" })); // Increased payload limit
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use("/auth", authRoutes);

// Template loading - added error handling
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

    // Create a copy of the template
    let modifiedHtml = htmlTemplate;

    // Generate dynamic task list HTML
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
      .join(""); // Join the array of HTML strings into a single string
    console.log(taskHtml);
    // Replace the values in the template
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
      '<div class="space-y-4" id="questList"></div>': `<div class="space-y-4" id="questList">${taskHtml}</div>`, // Inject the dynamic task HTML here
    };

    // Apply all replacements
    for (const [find, replace] of Object.entries(replacements)) {
      modifiedHtml = modifiedHtml.replace(find, replace);
    }

    // Launch puppeteer for rendering the HTML as an image
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1080,1350",
      ],
    });

    const page = await browser.newPage();

    // Set content and wait for the page to load fully
    await page.setContent(modifiedHtml, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 30000,
    });

    // Wait for fonts and external resources
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Set viewport and take the screenshot
    await page.setViewport({
      width: 1080,
      height: 1350,
      deviceScaleFactor: 2,
    });

    // Capture the screenshot as PNG
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

    // Send buffer
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
    // Simple HTML for testing
    const testHtml = `
      <!DOCTYPE html>
      <html>
        <body style="background: white; padding: 20px;">
          <h1>Test Image Generation</h1>
          <p>Generated at: ${new Date().toISOString()}</p>
        </body>
      </html>
    `;

    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(testHtml);
    await page.setViewport({ width: 800, height: 600 });

    const imageBuffer = await page.screenshot({
      type: "png",
      fullPage: false,
    });

    // Save the image buffer to a file
    fs.writeFileSync("test-image.png", imageBuffer);

    // Send the image as a response
    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
    console.log("Image saved as test-image.png");
  } catch (error) {
    console.error("Test image error:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (browser) await browser.close();
  }
});

// Error handling middleware
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
