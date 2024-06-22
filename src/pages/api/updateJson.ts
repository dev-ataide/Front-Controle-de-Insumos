// src/pages/api/updateJson.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve("./public/teste.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const newData = req.body;

      // Carregar o JSON existente
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Erro ao ler o arquivo JSON:', err);
          res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
          return;
        }

        // Converter o conteúdo do arquivo em objeto JavaScript
        let existingData = JSON.parse(data);

        // Mesclar os novos dados com os dados existentes
        const updatedData = [...existingData, ...newData];

        // Escrever os dados mesclados de volta no arquivo JSON
        fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
          if (err) {
            console.error('Erro ao escrever no arquivo JSON:', err);
            res.status(500).json({ error: 'Erro ao escrever no arquivo JSON' });
            return;
          }
          res.status(200).json({ message: 'Arquivo JSON atualizado com sucesso!' });
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar os dados' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
