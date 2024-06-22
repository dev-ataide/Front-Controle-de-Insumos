import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

function ModalInsumos({ insumoId, insumos, closeModal }) {
  const findInsumoById = (id) => {
    return insumos.find(insumo => insumo.id === id);
  };

  const insumo = findInsumoById(insumoId);
  if (!insumo) {
    return null; // Retorna null ou outro indicativo de que o insumo não foi encontrado
  }

  const percentual23 = insumo.Quantidade * 0.23;
  const quantidadeRestante = insumo.Quantidade - percentual23;
  const { id, nome, Quantidade, PrevdeConsumo, CustoUnit } = insumo;

  const calcularPrevisaoConsumo = (prevConsumo) => {
    if (!prevConsumo) {
      return { dataPrevConsumo: new Date(), consumoAtrasado: false };
    }

    const [mesPrev, anoPrev] = prevConsumo.split('-');
    const mesPrevNum = obterNumeroMes(mesPrev);
    const dataPrevConsumo = new Date(parseInt(anoPrev), mesPrevNum - 1, 1);

    const hoje = new Date();
    const consumoAtrasado = hoje > dataPrevConsumo;

    // Calculando dataPedidoConsumo
    const dataPedidoConsumo = new Date(dataPrevConsumo);
    dataPedidoConsumo.setDate(dataPedidoConsumo.getDate() - 7);

    return { dataPrevConsumo, dataPedidoConsumo, consumoAtrasado };
  };
  const obterNumeroMes = (nomeMes) => {
    const meses = {
      janeiro: 1, fevereiro: 2, março: 3, abril: 4,
      maio: 5, junho: 6, julho: 7, agosto: 8,
      setembro: 9, outubro: 10, novembro: 11, dezembro: 12
    };
    return meses[nomeMes.toLowerCase()] || 0;
  };

  const { dataPrevConsumo, consumoAtrasado } = calcularPrevisaoConsumo(PrevdeConsumo);

  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const currentDateFormatted = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Exemplo de inicialização de useState, mas parece estar incompleto ou fora de contexto
  const [currentDate, setCurrentDate] = useState('');

  // Exemplo de dados para gráficos e opções

  
  const options = {
    backgroundColor: 'transparent',
    legend: 'none',
    pieHole: 0.4,
  };

  const dataCombo = [
    [""],
    [""],
    [""],
    [""],
    [""],
    [""],
  ];

  const optionsCombo = {
    vAxis: { title: "Variação de preço" },
    backgroundColor: 'transparent',
    legend: 'none',
    hAxis: { title: "Meses" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };


  const dataCalendar = [
    [{ type: "date", id: "Date" }, { type: "number", id: "Won/Loss" }],
    [new Date(2024, 9, 30), 38447],
  ];

  const optionsCalendar = {
    title: "Próximo vencimento do lote do Insumo",

  };

  // Exportar tudo o que for necessário
  const quantidadeNumerica = Number(Quantidade);
  const custoUnitNumerico = insumo.CustoUnit;

  const custoTotalEstoque = quantidadeNumerica * custoUnitNumerico;
  const custoTotalFormatado = custoTotalEstoque.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const percentualFaturamento = 1 + (62 / 100); // Calcula o fator de aumento de 62%
  const previsaoFaturamento = custoTotalEstoque * percentualFaturamento;
  const previsaoFaturamentoFormatado = previsaoFaturamento.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  const percentualReposicaoMaterial = 10; // 10% do faturamento para reposição de material
  const percentualPagamentoFuncionarios = 30; // 30% do faturamento para pagamento de funcionários
  const percentualLucro = 20 // 20% do faturamento como lucro
  
  const valorReposicaoMaterial = previsaoFaturamento * (percentualReposicaoMaterial / 100);
  const valorPagamentoFuncionarios = previsaoFaturamento * (percentualPagamentoFuncionarios / 100);
  const valorLucro = previsaoFaturamento * (percentualLucro / 100);
  


  const data = [
    ["Faturamento", "Faturamento"],
    ["Colaboradores e Espaços", valorPagamentoFuncionarios],
    ["Reposição de Insumos", valorReposicaoMaterial],
    ["Lucro", valorLucro],

  ];
  const dataBarras = [
    ["Métrica", "Valor"],
    ["Quantidade em Estoque", quantidadeRestante],
    ["Custo Total do Estoque", custoTotalEstoque],
    ["Previsão de Faturamento", previsaoFaturamento] // 1 se dentro do prazo, 0 se atrasado
  ];
  return (
    <>
      <main className="w-full h-screen flex">
        <div className="w-[70%] h-full bg-white">
          <div className='py-10 pt-5 h-screen'>
            <div className='bg-white h-[100%] w-full'>
              <div className='pt-10 px-32'>
                <h1 className="text-2xl font-bold text-left text-black">{insumo.nome}</h1>
                <span className='text-sm text-gray-400 mt-80'>{currentDate}</span>
                <div className='mt-10'>
                  <Chart
                    chartType="Calendar"
                    width="100%"
                    height="200px"
                    data={dataCalendar}
                    options={optionsCalendar}
                  />

                </div>
                <div className='mt-2'>
                  <h1 className="text-2xl font-semibold text-left text-gray-600">Métricas</h1>
                  <div className='flex mt-6'>
                    <div className='p-2'>
                      <svg width="48" height="48" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="33.7811" cy="33.8934" r="33.4415" fill="#FF8700" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M31.5518 43.0898V36.4015H36.0106V43.0898H41.5842V34.1721H44.9284L33.7812 24.1396L22.634 34.1721H25.9782V43.0898H31.5518Z" fill="white" />
                      </svg>

                    </div>
                    <div className='flex-col p-2'>
                      <h1 className='font-semibold text-lg'>Disponível em estoque</h1>
                      <span>
                        Esta informação está{' '}
                        {insumo.STATUS === "DESATUALIZADO" ? (
                          <span className="text-red-500">desatualizada</span>
                        ) : (
                          <span className="text-green-500">atualizada</span>
                        )}
                      </span>
                    </div>
                    <div className='ml-auto'>
                      <span className='p-3'>{quantidadeRestante.toFixed(0)}</span>
                    </div>
                  </div>
                  <div className='flex mt-3'>
                    <div className='p-2'>
                      <svg width="48" height="48" viewBox="0 0 68 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="33.7811" cy="33.4576" r="33.4415" fill="#32A7E2" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M29.3223 40.1458C28.0961 40.1458 27.104 41.1491 27.104 42.3753C27.104 43.6014 28.0961 44.6047 29.3223 44.6047C30.5485 44.6047 31.5518 43.6014 31.5518 42.3753C31.5518 41.1491 30.5485 40.1458 29.3223 40.1458ZM22.634 22.3103V24.5398H24.8635L28.8764 33.0005L27.3716 35.7315C27.1932 36.0436 27.0929 36.4115 27.0929 36.8017C27.0929 38.0278 28.0961 39.0311 29.3223 39.0311H42.6989V36.8017H29.7905C29.6345 36.8017 29.5118 36.679 29.5118 36.523L29.5453 36.3892L30.5485 34.5722H38.8532C39.6892 34.5722 40.4249 34.1152 40.8039 33.4241L44.7946 26.1895C44.8838 26.0335 44.9284 25.844 44.9284 25.6545C44.9284 25.0414 44.4268 24.5398 43.8137 24.5398H27.327L26.2792 22.3103H22.634ZM40.4695 40.1458C39.2433 40.1458 38.2512 41.1491 38.2512 42.3753C38.2512 43.6014 39.2433 44.6047 40.4695 44.6047C41.6957 44.6047 42.6989 43.6014 42.6989 42.3753C42.6989 41.1491 41.6957 40.1458 40.4695 40.1458Z" fill="white" />
                      </svg>
                    </div>
                    <div className='flex-col p-2'>
                      <h1 className='font-semibold text-lg'>Disponível nos laborátorios</h1>
                      <span>
                        Esta informação está{' '}
                        {insumo.STATUS === "DESATUALIZADO" ? (
                          <span className="text-red-500">desatualizada</span>
                        ) : (
                          <span className="text-green-500">atualizada</span>
                        )}
                      </span>                    </div>
                    <div className='ml-auto'>
                      <span className='p-3'>{percentual23.toFixed(0)}</span>
                    </div>
                  </div>
                  <div className='flex mt-3'>
                    <div className='p-2'>
                      <svg width="48" height="48" viewBox="0 0 68 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="33.7811" cy="33.4576" r="33.4415" fill="#32A7E2" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M29.3223 40.1458C28.0961 40.1458 27.104 41.1491 27.104 42.3753C27.104 43.6014 28.0961 44.6047 29.3223 44.6047C30.5485 44.6047 31.5518 43.6014 31.5518 42.3753C31.5518 41.1491 30.5485 40.1458 29.3223 40.1458ZM22.634 22.3103V24.5398H24.8635L28.8764 33.0005L27.3716 35.7315C27.1932 36.0436 27.0929 36.4115 27.0929 36.8017C27.0929 38.0278 28.0961 39.0311 29.3223 39.0311H42.6989V36.8017H29.7905C29.6345 36.8017 29.5118 36.679 29.5118 36.523L29.5453 36.3892L30.5485 34.5722H38.8532C39.6892 34.5722 40.4249 34.1152 40.8039 33.4241L44.7946 26.1895C44.8838 26.0335 44.9284 25.844 44.9284 25.6545C44.9284 25.0414 44.4268 24.5398 43.8137 24.5398H27.327L26.2792 22.3103H22.634ZM40.4695 40.1458C39.2433 40.1458 38.2512 41.1491 38.2512 42.3753C38.2512 43.6014 39.2433 44.6047 40.4695 44.6047C41.6957 44.6047 42.6989 43.6014 42.6989 42.3753C42.6989 41.1491 41.6957 40.1458 40.4695 40.1458Z" fill="white" />
                      </svg>
                    </div>
                    <div className='flex-col p-2'>
                      <h1 className='font-semibold text-lg'>Previsão de consumo</h1>
                      <p><strong>Data de Previsão de Consumo:</strong> {insumo.PrevdeConsumo}</p>

                    </div>
                    <div className='ml-auto'>
                      <p className={consumoAtrasado ? 'text-red-500' : 'text-green-500'}>
                        {consumoAtrasado ? 'Consumo Atrasado' : 'Consumo Dentro do Prazo'}
                      </p>                    </div>
                  </div>
                  <div className='flex mt-3'>
                    <div className='p-2'>
                      <svg width="48" height="48" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="34.1739" cy="34.1739" r="33.587" fill="#DC3434" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4185 19.0598C20.5636 19.0598 19.0598 20.5636 19.0598 22.4185V45.9293C19.0598 47.7843 20.5636 49.288 22.4185 49.288H45.9294C47.7843 49.288 49.2881 47.7843 49.2881 45.9293V22.4185C49.2881 20.5636 47.7843 19.0598 45.9294 19.0598H22.4185ZM27.4566 35.8533C27.4566 34.9257 26.7047 34.1739 25.7772 34.1739C24.8497 34.1739 24.0979 34.9257 24.0979 35.8533V42.5707C24.0979 43.4982 24.8497 44.25 25.7772 44.25C26.7047 44.25 27.4566 43.4982 27.4566 42.5707V35.8533ZM34.1739 29.1359C35.1014 29.1359 35.8533 29.8877 35.8533 30.8152V42.5707C35.8533 43.4982 35.1014 44.25 34.1739 44.25C33.2465 44.25 32.4946 43.4982 32.4946 42.5707V30.8152C32.4946 29.8877 33.2465 29.1359 34.1739 29.1359ZM44.25 25.7772C44.25 24.8497 43.4982 24.0978 42.5707 24.0978C41.6432 24.0978 40.8913 24.8497 40.8913 25.7772V42.5707C40.8913 43.4982 41.6432 44.25 42.5707 44.25C43.4982 44.25 44.25 43.4982 44.25 42.5707V25.7772Z" fill="white" />
                      </svg>

                    </div>
                    <div className='flex-col p-2'>
                      <h1 className='font-semibold text-lg'>Custo total investido</h1>
                      <span>
                        Esta informação está{' '}
                        {insumo.STATUS === "DESATUALIZADO" ? (
                          <span className="text-red-500">desatualizada</span>
                        ) : (
                          <span className="text-green-500">atualizada</span>
                        )}
                      </span>
                    </div>
                    <div className='ml-auto'>
                      <p><strong>Custo Total:</strong> {custoTotalFormatado}</p>
                    </div>
                  </div>
                  <div className='flex mt-3'>
                    <div className='p-2'>
                      <svg width="48" height="48" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="34.1739" cy="34.1739" r="33.587" fill="#3CD856" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4185 19.0598C20.5636 19.0598 19.0598 20.5636 19.0598 22.4185V45.9293C19.0598 47.7843 20.5636 49.288 22.4185 49.288H45.9294C47.7843 49.288 49.2881 47.7843 49.2881 45.9293V22.4185C49.2881 20.5636 47.7843 19.0598 45.9294 19.0598H22.4185ZM27.4566 35.8533C27.4566 34.9257 26.7047 34.1739 25.7772 34.1739C24.8497 34.1739 24.0979 34.9257 24.0979 35.8533V42.5707C24.0979 43.4982 24.8497 44.25 25.7772 44.25C26.7047 44.25 27.4566 43.4982 27.4566 42.5707V35.8533ZM34.1739 29.1359C35.1014 29.1359 35.8533 29.8877 35.8533 30.8152V42.5707C35.8533 43.4982 35.1014 44.25 34.1739 44.25C33.2465 44.25 32.4946 43.4982 32.4946 42.5707V30.8152C32.4946 29.8877 33.2465 29.1359 34.1739 29.1359ZM44.25 25.7772C44.25 24.8497 43.4982 24.0978 42.5707 24.0978C41.6432 24.0978 40.8913 24.8497 40.8913 25.7772V42.5707C40.8913 43.4982 41.6432 44.25 42.5707 44.25C43.4982 44.25 44.25 43.4982 44.25 42.5707V25.7772Z" fill="white" />
                      </svg>


                    </div>
                    <div className='flex-col p-2'>
                      <h1 className='font-semibold text-lg'>Previsão de faturamento Total:</h1>
                      <span>Levando em consideração um valor de 62% do custo somado com ele mesmo.
                      </span>
                    </div>
                    <div className='ml-auto'>
                      <p><strong></strong> {previsaoFaturamentoFormatado}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[30%] h-full bg-[#ffffff] flex-col">
          <div className="h-[35px]  flex justify-end items-center mr-5">
            <button onClick={closeModal}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6 6L18 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

          </div>

          <div className=" p-5 ">
            <div className='flex flex-col justify-around w-full p-5 rounded-xl bg-white mb-5'>
              <span className="text-sm font-semibold text-center text-black">Destino de Faturamento</span>

              <div className='w-full flex justify-center'>
                <Chart
                  chartType="PieChart"
                  data={data}
                  options={options}
                  width={"90%"}
                  height={"100%"}
                />
              </div>
            </div>
            <div className='flex flex-col justify-around w-full p-5 rounded-xl bg-white mb-5'>
              <span className="text-sm font-semibold text-center text-black">Variação Preço Insumo</span>

              <div className='w-full flex justify-center'>
                <Chart
                  chartType="ComboChart"
                  data={dataCombo}
                  options={optionsCombo}
                  width={"90%"}
                  height={"100%"}
                />
              </div>
            </div>
            <div className='flex flex-col justify-around w-full p-5 rounded-xl bg-white mb-5'>
              <span className="text-sm font-semibold text-center text-black">Relação entre Estoque, Custo e Faturamento.</span>

              <div className='w-full flex justify-center'>
                <Chart
                  chartType="ColumnChart"
                  data={dataBarras}
                  width={"100%"}
                  height={"100%"}
                />
              </div>


            </div>
          </div>
        </div>
      </main>
    </>

  );
}

export default ModalInsumos;
