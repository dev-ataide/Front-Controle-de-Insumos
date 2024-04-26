import Head from 'next/head';
import { useState, useEffect , useContext } from 'react';
import CriarServico from '../../components/modals/servicos/servico';
import Menu from '../../components/Menu/MenuinC';
import Top from '../../components/Menu/Top';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';
import { AuthContext } from "../../contexts/AuthContext";
import axios from 'axios';

type ServiceProps = {
  id: string;
  name: string;
  price: string;
  description: string;
};

interface UserProps {
  listDetailUser: {
    id: string;
    name: string;
    email: string;
  };
  listService: ServiceProps[];
}

export default function ServicosDashboard({ listDetailUser, listService }: UserProps) {
  const [openModal, setOpenModal] = useState(false);
  const [userDetail] = useState(listDetailUser);
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);
  const itensPerPage = 4;

  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = listService.slice(startIndex, endIndex);

  const pages = Math.ceil(listService.length / itensPerPage);

  const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});

  
  const toggleEditState = (id: string) => {
    setEditStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleChange = (id: string, field: string, value: string) => {
    // Atualiza o estado com o novo valor do campo
    setNewValues((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: value,
      },
    }));
  };

  const [newValues, setNewValues] = useState<{ [key: string]: { name: string; description: string; price: string } }>(
    {}
  );

  const handleUpdateService = async (id: string, newName: string, newDescription: string, newPrice: string) => {
    try {
      const apiClient = setupAPIClient();

      const response = await apiClient.put(`/service/${id}`, { // Usando o método put do cliente da API
        id: id,
        name: newName,
        description: newDescription,
        price: newPrice,
      });
      if (response.status) {
        console.log('Serviço atualizado com sucesso!');
        window.location.reload();
      } else {
        console.error('Erro ao atualizar o serviço:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer a solicitação de atualização:', error);
    }
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
    if (listService.length === 0) {
      setOpenModal(true);
    }
    // Inicializa os estados de edição para cada card de serviço como false
    const initialEditStates = {};
    listService.forEach((servico) => {
      initialEditStates[servico.id] = false;
    });
    setEditStates(initialEditStates);
  }, [listService]);
  const handleDownload = () => {
    // Função para baixar os itens filtrados (exemplo usando CSV)
    const csvContent = 'data:text/csv;charset=utf-8,';

    listService.forEach((servico) => {


        csvContent += `${servico.name},${servico.price},${servico.description}`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'servicos.csv');
    document.body.appendChild(link);
    link.click();
};
  return (
    <>
      <Head>
        <title>Serviços - Clinica Cfit</title>
      </Head>
      <div className='flex flex-row'>
        <div className='order-1'>
          {/* Menu */}
          <Menu userDetail={userDetail} />
        </div>
        <div className='order-3 flex flex-col w-full'>
          {/* Top */}
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
                                    <input type="text" className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-200 text-gray-500 aa-input" placeholder="Nome do serviço" />
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
          <div className="container mx-auto px-2 sm:px-8 ">
            <div>
              <CriarServico isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} />
            </div>
          
            {listService.length === 0 ? (
              <div className="flex flex-col items-center h-[80%] mt-[100px] text-red-500 font-semibold  align-middle justify-center">
                <div style={{ fontSize: "25px" }}>Por favor, recarregue a página para cadastrar um serviço.</div>
                <div>
                  <img src="/error2.jpg" alt="Error" className='h-[600px]' />
                </div>
              </div>
            ) : (
              <div>
                <div className="px-10 py-20 grid gap-10 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2">
                  {currentItens.map((servico) => (
                    <div key={servico.id} className="max-w-xs relative rounded-md overflow-hidden shadow-lg transition duration-500 cursor-pointer">
                      <div className="relative">
                        <div className='bg-cover'>
                          <img className='w-full h-full' src="https://tse2.mm.bing.net/th?id=OIP.opw0yyddkARDeIClVsmBWgHaE8&pid=Api&P=0&h=180" alt="" />
                        </div>
                        <button className="absolute top-0 right-0 m-2 hover:scale-105 " onClick={() => toggleEditState(servico.id)}>
                          <svg width="30px" height="30px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.101 3.291-2.392-2.392507.3984-.398487c.6606-.660775 1.7319-.660775 2.3925 0 .6604.660574.6604 1.731414 0 2.391984z" fill="#fff" />
                            <path d="m15.6108 1.99445 2.392 2.39251-6.5028 6.50324-3.16846.7766.77644-3.16915z" fill="#fff" />
                            <path d="m3 3v11h3.5c.77479 0 1.38768.6623 1.92584 1.2439.00864.0093.01729.0186.02593.028.02846.0307.05688.0614.0848.0913.36511.3918.88566.6368 1.46343.6368.5778 0 1.0983-.245 1.4634-.6368.0336-.036.0675-.0726.1017-.1096l.0088-.0095c.5381-.5814 1.1515-1.2441 1.9261-1.2441h3.5v-3c0-.5523.4477-1.00001 1-1.00001s1 .44771 1 1.00001v6.5c0 .8284-.6716 1.5-1.5 1.5h-15c-.82843 0-1.5-.6716-1.5-1.5v-15c0-.82843.67157-1.5 1.5-1.5h6.5c.55229 0 1 .44772 1 1s-.44772 1-1 1z" fill="#fff" />
                          </svg>
                        </button>
                        {editStates[servico.id] ? (
                          <div className="py-4 px-4 bg-white flex-col">
                            <label htmlFor="name" className="block text-md font-semibold text-gray-600">Nome:</label>
                            <input
                              type="text"
                              id="name"
                              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              defaultValue={servico.name}
                              onChange={(e) => handleChange(servico.id, 'name', e.target.value)}
                            />
                            <br />
                            <label htmlFor="description" className="block text-md font-semibold text-gray-600 mt-4">Descrição:</label>
                            <textarea
                              id="description"
                              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              defaultValue={servico.description}
                              onChange={(e) => handleChange(servico.id, 'description', e.target.value)}
                            ></textarea>
                            <br />
                            <label htmlFor="price" className="block text-md font-semibold text-gray-600 mt-4">Preço:</label>
                            <input
                              type="text"
                              id="price"
                              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              defaultValue={servico.price}
                              onChange={(e) => handleChange(servico.id, 'price', e.target.value)}
                            />
                            <button className="absolute mt-7 bottom-2 right-2 bg-blue-600 hover:bg-blue-700 rounded-md p-2 text-white"
                              onClick={() => handleUpdateService(servico.id, newValues[servico.id]?.name, newValues[servico.id]?.description, newValues[servico.id]?.price)}>
                              Atualizar
                            </button>
                          </div>
                        ) : (
                          <div className="py-4 px-4 bg-white">
                            <h3 className="text-md font-semibold text-gray-600">{servico.name}</h3>
                            <br />
                            <p>{servico.description}</p>
                            <p className="mt-4 text-lg font-thin">{`R$ ${servico.price}`}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
             
              </div>
            )}
              <div className='mt-10'>


<section className="container px-4 mx-auto">
  
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
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiclient = setupAPIClient(ctx);

  try {
    const userResponse = await apiclient.get('/me');
    const serviceResponse = await apiclient.get('/service', {
      params: { userId: userResponse.data.id },
    });
    console.log(serviceResponse);
    return {
      props: {
        listDetailUser: userResponse.data,
        listService: serviceResponse.data,
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
