import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors'; // Importa o middleware cors

const app = express();
const PORT = 3000;

// Usa o middleware cors
app.use(cors());

app.get('/server', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto('https://www.ines.gov.br/dicionario-de-libras/');

    // Simula a seleção de uma opção
    await page.select('#input-palavras', '3');

    // Extrai o conteúdo do elemento desejado
    const content = await page.$eval('#input-exemplo', el => el.textContent);
    
    await browser.close();
    
    // Retorna o conteúdo para o frontend
    res.json({ content });
  } catch (error) {
    console.error('Erro no scraping:', error);
    res.status(500).json({ error: 'Erro ao realizar o scraping.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
