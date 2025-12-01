import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // API Endpoint to save contacts to CSV
  app.post("/api/contact", (req, res) => {
    const { name, email, company, phone, type } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Nome e Email são obrigatórios" });
    }

    const csvFile = path.resolve(__dirname, "contatos.csv");
    const headers = "Nome,Email,Empresa,Telefone,Tipo,Data\n";
    const date = new Date().toISOString();
    const row = `"${name}","${email}","${company || ""}","${phone || ""}","${type || "General"}","${date}"\n`;

    // Check if file exists to add headers
    if (!fs.existsSync(csvFile)) {
      fs.writeFileSync(csvFile, headers);
    }

    // Append data to CSV
    fs.appendFile(csvFile, row, (err) => {
      if (err) {
        console.error("Error writing to CSV:", err);
        return res.status(500).json({ error: "Erro ao salvar contato" });
      }
      console.log(`Contact saved: ${email} (${type})`);
      res.status(200).json({ success: true, message: "Contato salvo com sucesso" });
    });
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
