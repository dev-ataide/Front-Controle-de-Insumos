// src/pages/csv.tsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Head from 'next/head';
import Menu from '../components/Menu/MenuinC';
import Top from '../components/Menu/Top';

const csv = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target?.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convertendo a planilha para array de objetos
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Removendo o cabeçalho do array de dados
      const headers = data.shift();

      // Construindo o array de objetos com os dados formatados corretamente
      const formattedData = data.map((row) =>
        headers.reduce((obj, header, index) => {
          obj[header] = row[index];
          return obj;
        }, {})
      );

      setJsonData(formattedData);
      setSelectedFileName(file.name);
    };
    reader.readAsBinaryString(file);
  };

  const cancelExcel = () => {
    setJsonData([]);
    setSelectedFileName('');
  };

  const mergeAndUpdateJson = async () => {
    try {
      const response = await axios.post('/api/updateJson', jsonData);
      console.log(response.data.message);
      // Limpar estado após atualização
      setJsonData([]);
      setSelectedFileName('');
    } catch (error) {
      console.error('Erro ao atualizar o arquivo JSON:', error);
    }
  };

  return (
    <>
      <Head>
        <title>LAFEPE</title>
      </Head>
      <div className='flex flex-row'>
        <div className='order-1'>
          <Menu />
        </div>
        <div className='order-3 flex flex-col w-full'>
          <Top />
          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
              <form className="py-6 px-9">
                <div className="mb-6 pt-4 cursor-pointer">
                  <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                    Selecione um arquivo CSV
                  </label>
                  <div className="mb-8 cursor-pointer">
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                      className="sr-only cursor-pointer"
                    />
                    <label
                      className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                    >
                      <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                  {selectedFileName && (
                    <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                      <div className="flex items-center justify-between">
                        <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                          <p>Arquivo selecionado: {selectedFileName}</p>
                        </span>
                        <button className="text-[#07074D]" onClick={cancelExcel}>
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                              fill="currentColor"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={mergeAndUpdateJson}
                    disabled={jsonData.length === 0}
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none cursor-pointer"
                  >
                    Enviar arquivo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default csv;
