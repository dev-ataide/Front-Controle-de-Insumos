import Menu from "../../components/Menu/MenuinC"
import Top from "../../components/Menu/Top"
import Head from "next/head"
import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';
import { useState } from "react";
import CreateClient from "../../components/modals/client/createClient";
import CreateAppointment from "../../components/modals/appointment/createAppointment";
import { useEffect } from "react";
type ItemProps = {
  id: string;
  name: string;
  email: string;
};
type ClientProps = {
  id: string;
  photo: string
  name: string;
  email: string;
  contact: string;
  observer: string;
  cpf: string;
};



interface UserProps {
  listDetailUser: ItemProps;
  listClient: ClientProps[];
}

export default function Client({ listDetailUser, listClient }: UserProps) {
  const [userDetail, setUserDetail] = useState(listDetailUser);
  const [openModal, setOpenModal] = useState(false);

  const [itens, setItens] = useState([])
  const [itensPerPage, setItensPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = listClient.slice(startIndex, endIndex);

  const pages = Math.ceil(listClient.length / itensPerPage);

  const [filtro, setFiltro] = useState(''); // Estado para armazenar o valor selecionado no filtro



  // Função para lidar com a mudança no valor do filtro
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
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

  useEffect(() => {
    if (listClient.length === 0) {
      setOpenModal(true);
    }
  }, [listClient]);
  const handleDownload = () => {
    // Função para baixar os itens filtrados (exemplo usando CSV)
    const csvContent = 'data:text/csv;charset=utf-8,';

    listClient.forEach((client) => {


        csvContent += `${client.name},${client.contact},${client.email},${client.observer}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Clientes.csv');
    document.body.appendChild(link);
    link.click();
};
  return (
    <>
      <Head>
        <title>appointments</title>
      </Head>
      <div className='flex flex-row'>
        <div className='order-1'>
          {/* Menu */}
          <Menu userDetail={userDetail} />
        </div>
        <div className='order-3 flex flex-col w-full'>
          {/* Top */}
          <div>
            <CreateClient isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}></CreateClient>

          </div>
          <div className='flex-block  flex-col justify-center overflow-hidden bg-gray-50 t-0'>
                        <div className="flex items-center justify-between border-b bg-aftb_blue_active p-3">
                            <div className="flex items-center space-x-2 rounded  py-1 px-2 ">

                                <button onClick={() => setOpenModal(true)} type="submit" className='bg-white hover:bg-aftb_orange rounded-md p-2 text-aftb_blue_active hover:text-white'>Cadastrar</button>
                            </div>

                            <div className="container align-middle justify-center items-center z-50 flex w-4/4 h-auto h-full">
                                <div className="relative flex items-center w-full lg:w-64 h-full group">
                                    <div className="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                                        <svg fill="none" className="relative w-5 h-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                                            </path>
                                        </svg>
                                    </div>
                                    <svg className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                                        </path>
                                    </svg>
                                    <input type="text" className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-200 text-gray-500 aa-input" placeholder="Nome ou CPF" />
                                    <div className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block">
                                        +
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-5 text-white  cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 hover:text-aftb_orange">
                                    <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 hover:text-aftb_orange">
                                    <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clip-rule="evenodd" />
                                    <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 hover:text-aftb_orange" onClick={handleDownload}>
                                    <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd" />
                                    <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                                </svg>
                            </div>
                        </div>
                    </div>

          {listClient.length === 0 ? (
            <div className="flex flex-col items-center h-[80%] mt-[100px] text-red-500 font-semibold  align-middle justify-center">
              <div style={{ fontSize: "25px" }}>Por favor, recarregue a página para cadastrar um cliente.</div>
              <div>
                <img src="/error2.jpg" alt="Error" className='h-[600px]' />
              </div>
            </div>) : (

            <div>
              <div className='mt-10'>


                <section className="container px-4 mx-auto">
                  <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-aftb_blue_active md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-aftb_blue_active">
                              <tr>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                  Cliente
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                  CPF
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                  Número de contato
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                  Email
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                  Observações
                                </th>



                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {currentItens.map((client) => (
                                <tr key={client.id}>
                                  {/* <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      <div className="inline-flex items-center gap-x-3">
                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded" />

                        <span>#3066</span>
                      </div>
                    </td> */}

                                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                      <div className="flex items-center gap-x-2">
                                        <img src={`http://localhost:3333/files/${client.photo}`} alt="profil" className="object-cover rounded-full h-10 w-10 " />
                                        <div>
                                          <h2 className="text-sm font-medium text-gray-800 ">{client.name}</h2>

                                        </div>
                                      </div>
                                    </td>
                                  </td>



                                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    <span>{client.cpf}</span>
                                  </td>
                                  
                                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                      <div className='flex'>
                                        <a href={`https://api.whatsapp.com/send?1=pt_BR&phone=${encodeURIComponent(client.contact)}`} target="_blank" className="text-xs font-normal text-aftb_greenbuton ">{client.contact}</a>
                                        <svg width="15px" height="15px" viewBox="-2.73 0 1225.016 1225.016" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#E0E0E0" d="M1041.858 178.02C927.206 63.289 774.753.07 612.325 0 277.617 0 5.232 272.298 5.098 606.991c-.039 106.986 27.915 211.42 81.048 303.476L0 1225.016l321.898-84.406c88.689 48.368 188.547 73.855 290.166 73.896h.258.003c334.654 0 607.08-272.346 607.222-607.023.056-162.208-63.052-314.724-177.689-429.463zm-429.533 933.963h-.197c-90.578-.048-179.402-24.366-256.878-70.339l-18.438-10.93-191.021 50.083 51-186.176-12.013-19.087c-50.525-80.336-77.198-173.175-77.16-268.504.111-278.186 226.507-504.503 504.898-504.503 134.812.056 261.519 52.604 356.814 147.965 95.289 95.36 147.728 222.128 147.688 356.948-.118 278.195-226.522 504.543-504.693 504.543z"></path><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="609.77" y1="1190.114" x2="609.77" y2="21.084"><stop offset="0" stop-color="#20b038"></stop><stop offset="1" stop-color="#60d66a"></stop></linearGradient><path fill="url(#a)" d="M27.875 1190.114l82.211-300.18c-50.719-87.852-77.391-187.523-77.359-289.602.133-319.398 260.078-579.25 579.469-579.25 155.016.07 300.508 60.398 409.898 169.891 109.414 109.492 169.633 255.031 169.57 409.812-.133 319.406-260.094 579.281-579.445 579.281-.023 0 .016 0 0 0h-.258c-96.977-.031-192.266-24.375-276.898-70.5l-307.188 80.548z"></path><image overflow="visible" opacity=".08" width="682" height="639" transform="translate(270.984 291.372)"></image><path fill-rule="evenodd" clip-rule="evenodd" fill="#FFF" d="M462.273 349.294c-11.234-24.977-23.062-25.477-33.75-25.914-8.742-.375-18.75-.352-28.742-.352-10 0-26.25 3.758-39.992 18.766-13.75 15.008-52.5 51.289-52.5 125.078 0 73.797 53.75 145.102 61.242 155.117 7.5 10 103.758 166.266 256.203 226.383 126.695 49.961 152.477 40.023 179.977 37.523s88.734-36.273 101.234-71.297c12.5-35.016 12.5-65.031 8.75-71.305-3.75-6.25-13.75-10-28.75-17.5s-88.734-43.789-102.484-48.789-23.75-7.5-33.75 7.516c-10 15-38.727 48.773-47.477 58.773-8.75 10.023-17.5 11.273-32.5 3.773-15-7.523-63.305-23.344-120.609-74.438-44.586-39.75-74.688-88.844-83.438-103.859-8.75-15-.938-23.125 6.586-30.602 6.734-6.719 15-17.508 22.5-26.266 7.484-8.758 9.984-15.008 14.984-25.008 5-10.016 2.5-18.773-1.25-26.273s-32.898-81.67-46.234-111.326z"></path><path fill="#FFF" d="M1036.898 176.091C923.562 62.677 772.859.185 612.297.114 281.43.114 12.172 269.286 12.039 600.137 12 705.896 39.633 809.13 92.156 900.13L7 1211.067l318.203-83.438c87.672 47.812 186.383 73.008 286.836 73.047h.255.003c330.812 0 600.109-269.219 600.25-600.055.055-160.343-62.328-311.108-175.649-424.53zm-424.601 923.242h-.195c-89.539-.047-177.344-24.086-253.93-69.531l-18.227-10.805-188.828 49.508 50.414-184.039-11.875-18.867c-49.945-79.414-76.312-171.188-76.273-265.422.109-274.992 223.906-498.711 499.102-498.711 133.266.055 258.516 52 352.719 146.266 94.195 94.266 146.031 219.578 145.992 352.852-.118 274.999-223.923 498.749-498.899 498.749z"></path></g></svg>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    <span>{client.email}</span>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    <span>{client.observer}</span>
                                  </td>

                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {currentItens.map ? (
                    <div className="flex items-center justify-between mt-6">
                      <a onClick={goPrevPage} className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 border-aftb_blue_active hover:border-white  bg-white  hover:bg-aftb_orange hover:text-white text-aftb_blue_active border rounded-md gap-x-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span>
                          Anterior
                        </span>
                      </a>

                      <span className='8 bg-slate-200 rounded-md p-2'>
                        {currentPage + 1}/{pages}
                      </span>
                      <a onClick={goNextPage} className="flex items-center px-5 py-2 text-sm  capitalize transition-colors duration-200 border-aftb_blue_active hover:border-white  bg-white  hover:bg-aftb_orange hover:text-white text-aftb_blue_active border rounded-md gap-x-2 ">
                        <span>
                          Próxima
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </a>
                    </div>
                  ) : (
                    <h1>oi</h1>
                  )}

                </section>

              </div>
            </div>

          )}
        </div>
      </div>
    </>
  );
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiclient = setupAPIClient(ctx);

  try {
    const userResponse = await apiclient.get('/me');
    const clientResponse = await apiclient.get('/clientlist', {
      params: { userId: userResponse.data.id },
    });

    console.log(clientResponse)

    return {
      props: {
        listDetailUser: userResponse.data,
        listClient: clientResponse.data,
      },
    };
  } catch (error) {
    console.error('Erro durante a execução de getServerSideProps:', error);
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
});
