import Image from "next/image";
import Nav from "../components/landing_page/navbar/nav";
import React from "react";
import styles from "../../styles/css";
import Footer from "../components/landing_page/footer/footer"
import Head from "next/head";
import Menu from "../components/Menu/MenuinC";
import { useState, useContext, useEffect } from 'react'
import { format, isToday, isSameDay } from 'date-fns';
import lista_Produtos from "../../public/teste.json"
import { Chart } from "react-google-charts";
import Top from "../components/Menu/Top";
import ModalInsumos from "../components/modals/dashboard/modalInsumos";







export default function Home() {


  const [itens, setItens] = useState([])
  const [itensPerPage, setItensPerPage] = useState(4)
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredAppointments, setFilteredAppointments] = useState(lista_Produtos);
  const [page, setPage] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [insumoId, setInsumoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const alternarComponentes = () => {
    setPage(!page);
    setModalVisible(!modalVisible);
  };
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pages - 1));
  };

  const pages = Math.ceil(filteredAppointments.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = filteredAppointments.slice(startIndex, endIndex);
  // Função para contar itens por status
  const countItemsByStatus = (data, status) => {
    return data.filter(item => item.STATUS === status).length;
  };

  // Contagem de produtos atualizados e desatualizados
  const atualizados = countItemsByStatus(filteredAppointments, "ATUALIZADO");
  const desatualizados = countItemsByStatus(filteredAppointments, "DESATUALIZADO");
  // Dados formatados para o gráfico
  const chartData = [
    ["Status", "Quantidade"],
    ["Atualizados", atualizados],
    ["Desatualizados", desatualizados]
  ];

  // Opções do gráfico
  const options = {
    title: "Status dos Produtos",

  };


  const formatarDados = (dados) => {
    const dadosFormatados = [
      ["Validade", "Quantidade de Produtos que Vão Vencer"],
    ];

    dados.forEach((item) => {
      dadosFormatados.push([item.Validade, item.Quantidade]);
    });

    return dadosFormatados;
  };

  const optionsSecond = {
    hAxis: {
      title: "Validade",
    },
    vAxis: {
      title: "Quantidade de Produtos que Vão Vencer",
      minValue: 0,
    },
    legend: { position: "none" },
  };
  function handleCloseModal() {
    setModalVisible(false)
  }


  const handleOpenModal = (id) => {
    setInsumoId(id);
    setModalVisible(true);
    setPage(false)
  };

  useEffect(() => {
    // Filtra os insumos baseado no termo de busca (searchTerm)
    if (searchTerm.trim() === '') {
      setFilteredAppointments(lista_Produtos); // Mostra todos se a busca estiver vazia
    } else {
      const filtered = lista_Produtos.filter(item =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAppointments(filtered);
    }
  }, [searchTerm, lista_Produtos]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Head>
        <title>LAFEPE</title>
      </Head>
      <div className='flex flex-row'>
        <div className='order-1'>
          {/* Menu */}
          <Menu />
        </div>
        <div className='order-3 flex flex-col w-full'>
          {/* Top */}
          <Top />

          <form className="flex items-center px-96">
                    <label className="sr-only"></label>
                    <div className="relative w-full">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                      </div>
                      <input type="text"
                        placeholder="Buscar por nome do insumo"
                        value={searchTerm}
                        onChange={handleSearchChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pesquise pelo nome dos insumos" required />
                      <button type="button" className="flex absolute inset-y-0 right-0 items-center pr-3">
                        <svg className="w-4 h-4 text-gray-500 dark:white hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path></svg>
                      </button>
                    </div>
                    <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Pesquisar</button>
                  </form>

          {/* <ModalInsumos></ModalInsumos> */}
          {modalVisible && <ModalInsumos insumoId={insumoId} insumos={filteredAppointments}
            closeModal={() => {
              setModalVisible(false);
              setPage(true);
            }}
          />}
          {page && <div>

            {filteredAppointments.map((agendamento) => {
              agendamento.UND
            })}
            {filteredAppointments.length == 0 ? (
              <div className="flex flex-col items-center h-[80%] mt-[100px] text-red-500 font-semibold  align-middle justify-center">
                <div style={{ fontSize: "25px" }}>Por favor, import um CSV, nenhum insumo correspondente foi encontrado na base.</div>
                <div>
                  <img src="/error2.jpg" alt="Error" className='h-[600px]' />
                </div>
              </div>
            ) : (
              //Filtros e Tabela
              <div>

                <div className="max-w-2xl mx-auto mb-5">

               

                </div>
                <div>
                  <div>
                    <div className="mx-8 px-4 overflow-x-hidden">
                      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr>

                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Insumo
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                CódigoMP
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider flex">
                                UND

                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                LOTE
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Quantidade                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Validade                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Prev_de_Consumo
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Custo_Unit
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Detalhes
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItens.map((insumo) => (
                              <tr key={insumo.id}>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{insumo.nome}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{insumo.CódigoMP}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{insumo.UND}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-blue-400 whitespace-no-wrap">{insumo.Lote}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{insumo.Quantidade}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{insumo.Validade}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{insumo["PrevdeConsumo"]}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">R$ {insumo["CustoUnit"]}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className={`whitespace-no-wrap ${insumo.STATUS === 'ATUALIZADO' ? 'text-green-400' : 'text-red-600'}`}>
                                    {insumo.STATUS}
                                  </p>
                                </td>



                                <td className="  px-5 p-5 border-b  bg-white text-sm justify-center justify-items-center align-middle items-center">
                                  <button onClick={() => handleOpenModal(insumo.id)}>
                                    <svg width="24" height="24" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="34.2608" cy="34.2609" r="34.1304" fill="#FF947A" />
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6086 24.0217C20.6086 20.2518 23.6648 17.1956 27.4347 17.1956H37.6739V24.0217C37.6739 27.7917 40.73 30.8478 44.4999 30.8478H47.913V44.5C47.913 48.2699 44.8568 51.3261 41.0869 51.3261H27.4347C23.6648 51.3261 20.6086 48.2699 20.6086 44.5V24.0217ZM27.4347 32.5543C26.4922 32.5543 25.7282 33.3184 25.7282 34.2609C25.7282 35.2034 26.4922 35.9674 27.4347 35.9674H30.8478C31.7903 35.9674 32.5543 35.2034 32.5543 34.2609C32.5543 33.3184 31.7903 32.5543 30.8478 32.5543H27.4347ZM27.4347 39.3804C26.4922 39.3804 25.7282 40.1445 25.7282 41.087C25.7282 42.0294 26.4922 42.7935 27.4347 42.7935H34.2608C35.2033 42.7935 35.9673 42.0294 35.9673 41.087C35.9673 40.1445 35.2033 39.3804 34.2608 39.3804H27.4347ZM42.2504 20.9479L42.0269 24.2997C41.9583 25.3299 42.813 26.1846 43.8432 26.1159L47.195 25.8925C48.6579 25.795 49.3249 24.0198 48.2881 22.9831L45.1598 19.8548C44.1231 18.818 42.3479 19.485 42.2504 20.9479Z" fill="white" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>

                    </div>
                  </div>
                  <div className="flex gap-1 align-middle items-center justify-between -mt-0">
                    <div className="w-full h-full">
                      <Chart
                        chartType="PieChart"
                        data={chartData}
                        options={options}
                        width={"100%"}
                        height={"300px"}
                      /></div>

                    <Chart
                      chartType="ColumnChart"
                      width="100%"
                      height="300px"
                      data={formatarDados(filteredAppointments)}
                      options={optionsSecond}
                    />
                  </div>


                  <div className='mt-10'>
                    {/* <div className='absolute top-4/4 left-72'>
<div className="flex items-center justify-end">
<button onClick={() => setOpenModal(true)} type="submit" className='bg-blue-600 hover:bg-blue-700 rounded-md p-2 text-white'>Cadastrar</button>
</div>
</div> */}


                    {currentItens.map ? (
                      <div className='absolute top-4/4 right-12'>
                        <div className="flex items-center justify-end">
                          <button onClick={goPrevPage} className='bg-blue-600 hover:bg-blue-700 rounded-md p-2 text-white'>Página Anterior</button>
                          {Array.from(Array(pages), (index) => (
                            <button key={index} onClick={() => goToPage(index)} ></button>
                          ))}
                          <span className='m-3 bg-slate-200 rounded-md p-2'>
                            {currentPage + 1}/{pages}
                          </span>
                          <button onClick={goNextPage} className='bg-blue-600 hover:bg-blue-700 rounded-md p-2 text-white'>Próxima Página</button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-black">oi</div>
                    )
                    }






                  </div>
                </div>
              </div>
            )}

          </div>}

        </div>
      </div>
    </>

  );
}
