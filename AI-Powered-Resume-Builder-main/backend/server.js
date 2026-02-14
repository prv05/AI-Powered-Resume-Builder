const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const Template = require("./models/Template");


const authRoutes = require("./routes/authRoutes");
dotenv.config();

const app = express();

// Environment + Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error: ", err));

// Routes
app.use("/api/auth", authRoutes);
// app.use("/", resumeRoutes); ← if you separate routes into a file

let latestResumeHTML = "";

// Home route
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.get('/index', (req, res) => {
    const dummyUser = {
      username: "NoothanKT",
      email: "noothan@example.com",
      password: "secure123" // 👀 only for testing, never expose this!
    };
  
    res.render('index', { user: dummyUser });
  });
  app.get('/saved', (req, res) => {
    res.render('saved_prototype');
  });

// Resume editor page (EJS)
app.get("/edit", (req, res) => {
  res.render("edit", { resume_text: "" });
});

// LinkedIn login placeholder
app.get("/auth/linkedin", (req, res) => {
  res.send("LinkedIn auth placeholder");
});

// Generate resume from AI
app.post("/generate-resume", async (req, res) => {
  try {
    const { userInput, template } = req.body;

    const cssPath = path.join(__dirname, "public", `${template}.css`);
    const cssStyles = fs.readFileSync(cssPath, "utf-8");

    const prompt = `
Convert the following raw resume information into a well-structured, ATS-friendly HTML resume:

User Input:
${userInput}

Requirements:
1. Structure the resume in proper HTML format with these sections:
   - Header (name, contact info)
   - Professional Summary
   - Work Experience (with bullet points)
   - Skills
   - Education
   - Projects (if applicable)

2. Apply this CSS styling to make it professional:
${cssStyles}

3. Output ONLY the HTML code (no markdown or explanations) that:
   - Includes the CSS in a <style> tag
   - Has proper semantic HTML structure like starting with <html> <head> like that 
   - Is ready to be rendered directly in a browser
   - Maintains ATS compatibility (no complex layouts)
`;

    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const htmlResume = response.data.choices[0].message.content;
    latestResumeHTML = htmlResume;
    res.send({ html: htmlResume });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate resume");
  }
});

// Save generated template
app.post('/save-as-template', async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      templateId,
      templateCode,
    } = req.body;

    if (!username || !email || !password || !templateId || !templateCode) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Determine the CSS file based on templateId
    let cssFileName = '';

    // Normalize input to match expected format
    const normalizedId = templateId.toLowerCase().replace(/\s/g, '');
    
    switch (normalizedId) {
      case 'template1':
        cssFileName = 'resume1.css';
        break;
      case 'template2':
        cssFileName = 'resume2.css';
        break;
      case 'template3':
        cssFileName = 'resume3.css';
        break;
      default:
        return res.status(400).json({ message: 'Invalid template ID' });
    }
    


    const cssPath = path.join(__dirname, 'public', cssFileName);
    const resumeCSS = fs.readFileSync(cssPath, 'utf8');

    const fullHTML = `
      <html>
        <head><style>${resumeCSS}</style></head>
        <body><div class="output-box">${templateCode}</div></body>
      </html>
    `;

    const newTemplate = new Template({
      username,
      email,
      password,
      templateId,
      templateCode,
      fullHTML,
      createdAt: new Date(),
    });

    await newTemplate.save();

    res.status(201).json({ message: 'Template saved successfully', template: newTemplate });
  } catch (error) {
    console.error('Error saving template:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Download resume as PDF
app.post("/download-pdf", async (req, res) => {
  try {
    const { html } = req.body;

    const cssPath = path.join(__dirname, "public", "resume1.css");
    const resumeCSS = fs.readFileSync(cssPath, "utf8");

    const fullHTML = `
      <html>
        <head><style>${resumeCSS}</style></head>
        <body><div class="output-box">${templateCode}</div></body>
      </html>
    `;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(fullHTML, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=\"resume.pdf\"",
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation failed:", error);
    res.status(500).send("Failed to generate PDF");
  }
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.stack);
  res.status(500).send("Something broke on the server!");
});


app.get('/get-templates', async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ error: "Missing 'username' in query params" });
  }

  try {
    const templates = await Template.find({ username }).sort({ createdAt: -1 });
    res.json({ templates });
  } catch (err) {
    console.error("Error fetching templates:", err);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

app.delete('/delete-template/:id', async (req, res) => {
  try {
    const deleted = await Template.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
