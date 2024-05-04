// Nativo do next
import Head from 'next/head';
import { useState, useEffect } from 'react';
import CriarEmployeer from '../../components/modals/employeer/createEmployeer';
import Menu from '../../components/Menu/MenuinC';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';
import { format, isToday, isSameDay } from 'date-fns';


type EmployeeProps = {
    id: string;
    photo: string
    name: string;
    email: string;
    contact: string;
    observer: string;
    cpf: string;
};


interface UserProps {
    listDetailUser: {
        id: string;
        name: string;
        email: string;
    };
    listEmployee: EmployeeProps[];
}

export default function ServicosDashboard({ listDetailUser, listEmployee }: UserProps) {
    const [openModal, setOpenModal] = useState(false);
    const [userDetail] = useState(listDetailUser);
    const [employeeList, setEmployeeList] = useState(listEmployee)
    const [currentPage, setCurrentPage] = useState(0);
    const itensPerPage = 4;

    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = employeeList.slice(startIndex, endIndex);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const pages = Math.ceil(listEmployee.length / itensPerPage);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
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
        if (listEmployee.length === 0) {
            setOpenModal(true);
        }
    }, [listEmployee]);

    const handleDownload = () => {
        // Função para baixar os itens filtrados (exemplo usando CSV)
        const csvContent = 'data:text/csv;charset=utf-8,';

        listEmployee.forEach((colaborador) => {


            csvContent += `${format(new Date(), 'dd/MM/yyyy HH:mm')},${colaborador.name},${colaborador.contact},${colaborador.email},${colaborador.observer}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'colaboradores.csv');
        document.body.appendChild(link);
        link.click();
    };

    async function handleRefresh() {
        try {
            const apiClient = setupAPIClient();
            const userResponse = await apiClient.get('/me');
            const employeeResponse = await apiClient.get('/employeelist', {
                params: { userId: userResponse.data.id },
            });
            
            // Atualize employeeList com os novos dados retornados pela API
            setEmployeeList(employeeResponse.data);
            console.log('lista de empregados' + employeeList)
            console.log('currentItens:', currentItens);

        } catch (error) {
            console.error('Erro durante a execução de handleRefresh:', error);
        }
    }

    return (
        <>
            <Head>
                <title>Colaboradores</title>
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



                    <div className="container mx-auto px-2 sm:px-8 ">
                        <div>
                            <CriarEmployeer isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}></CriarEmployeer>
                        </div>

                        {listEmployee.length === 0 ? (
                            <div className="flex flex-col items-center h-[80%] mt-[100px] text-red-500 font-semibold  align-middle justify-center">
                                <div style={{ fontSize: "25px" }}>Por favor, recarregue a página para cadastrar um colaborador.</div>
                                <div>
                                    <img src="/error2.jpg" alt="Error" className='h-[600px]' />
                                </div>
                            </div>
                        ) : (
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
                                                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white">

                                                                    </th>



                                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                                                                        <button className="flex items-center gap-x-2">
                                                                            Colaborador

                                                                            <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                                                <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                                                <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                                            </svg>
                                                                        </button>
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
                                                                        Detalhes
                                                                    </th>
                                                                    <th>
                                                                        <button className='pt-1' onClick={handleRefresh}>
                                                                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M21 12C21 16.9706 16.9706 21 12 21C9.69494 21 7.59227 20.1334 6 18.7083L3 16M3 12C3 7.02944 7.02944 3 12 3C14.3051 3 16.4077 3.86656 18 5.29168L21 8M3 21V16M3 16H8M21 3V8M21 8H16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                            </svg>
                                                                        </button>

                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {currentItens.map((colaborador) => (
                                                                    <tr key={colaborador.name}>
                                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                            <div className="flex items-center gap-x-2">
                                                                                <img src={`http://localhost:3333/files/${colaborador.photo}`} alt="profil" className="object-cover rounded-full h-10 w-10 " />

                                                                            </div>
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                            <span>{colaborador.name}</span>

                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                            <span>{colaborador.cpf}</span>
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                            <span>{colaborador.contact}</span>
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                            <span>{colaborador.email}</span>
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap align-middle justify-center items-center">
                                                                            <button>
                                                                                <svg fill="#344293" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z" /></svg>
                                                                            </button>
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
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiclient = setupAPIClient(ctx);

    try {
        const userResponse = await apiclient.get('/me');
        const employeeResponse = await apiclient.get('/employeelist', {
            params: { userId: userResponse.data.id },
        });
        console.log(employeeResponse)
        return {
            props: {
                listDetailUser: userResponse.data,
                listEmployee: employeeResponse.data,
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
