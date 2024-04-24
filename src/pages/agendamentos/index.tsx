
import Head from 'next/head';
import { canSSRAuth } from '../../utils/canSSRAuth';
import Menu from '../../components/Menu/MenuinC'
import Top from '../../components/Menu/Top'
import { useState, useContext, useEffect } from 'react'
import { setupAPIClient } from '../../services/api';
import { api } from '../../services/apiClient';
import { AuthContext } from '../../contexts/AuthContext';
import CreateAppointment from '../../components/modals/appointment/createAppointment';
import { format, isToday, isSameDay } from 'date-fns';
import DatePicker from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR'; // Importe o pacote de localização para Português Brasileiro
import erro from "../../public/error2.jpg"

type ItemProps = {
  id: string;
  name: string;
  email: string;
};

type AppointmentProps = {
  id: string;
  userId: string; // Adicione outros campos do appointment conforme necessário
  userName: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhoto: string;
  clientCpf: string;
  clientContact: string;
  serviceId: string;
  serviceName: string;
  servicePrice: string; // Novo campo adicionado
  createdAt: Date;
  date_appointment: string;
  confirmation: boolean;
  employee: string;
  employeeName: string;
};
type ServiceProps = {
  id: string;
  name: string;
  price: string;
  description: string;
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
  listDetailUser: ItemProps;
  listAppointments: AppointmentProps[];
  listService: ServiceProps[];
  listClient: ClientProps[];
  listEmployee: EmployeeProps[];
}


export default function Dashboard({ listDetailUser, listAppointments, listService, listClient, listEmployee }: UserProps) {
  console.log('Dados do usuário no componente:', listDetailUser);
  console.log('Dados do serviço no componente:', listService);
  const [userDetail, setUserDetail] = useState(listDetailUser);
  const [openModal, setOpenModal] = useState(false)

  const [itens, setItens] = useState([])
  const [itensPerPage, setItensPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredAppointments, setFilteredAppointments] = useState(listAppointments);

  const pages = Math.ceil(filteredAppointments.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentFilteredItens = filteredAppointments.slice(startIndex, endIndex);


  const currentItens = filteredAppointments.slice(startIndex, endIndex);

  const [filtro, setFiltro] = useState({ data: '', servico: '' });

  const [selectedDate, setSelectedDate] = useState(new Date());


  useEffect(() => {
    const appointmentsNaDataSelecionada = listAppointments.filter((appointment) =>
      isSameDay(new Date(appointment.date_appointment), selectedDate)
    );

    // Ordenar os agendamentos por horário
    appointmentsNaDataSelecionada.sort((a, b) => {
      const dateA = new Date(a.date_appointment);
      const dateB = new Date(b.date_appointment);
      return dateA - dateB;
    });

    setFilteredAppointments(appointmentsNaDataSelecionada);
  }, [listAppointments, selectedDate]);

  // Função para lidar com a mudança no valor do filtro
  const handleFiltroChange = (event) => {
    const { name, value } = event.target;
    setFiltro((prevFiltro) => ({ ...prevFiltro, [name]: value }));
  };

  // Filtrar os itens com base no valor do filtro
  const itensFiltrados = currentItens.filter((agendamento) => {
    const dataMatch = filtro.data === '' || isSameDay(new Date(agendamento.date_appointment), selectedDate);
    const servicoMatch = filtro.servico === '' || agendamento.serviceName.toLowerCase() === filtro.servico.toLowerCase();

    console.log('Data Match:', dataMatch);
    console.log('Serviço do Agendamento:', agendamento.serviceName);
    console.log('Serviço do Filtro:', filtro.servico);
    console.log('Serviço Match:', servicoMatch);

    return dataMatch && servicoMatch;
  });


  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pages - 1));
  };


  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
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
          <Top userDetail={userDetail} />

          <div>
            <CreateAppointment isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} listService={listService} listClient={listClient} listEmployee={listEmployee}></CreateAppointment>

            {listAppointments.map((agendamento) => {
              agendamento.userName
              { console.log(agendamento.date_appointment) }
            })}
            {listClient.length == 0 || listService.length === 0 || listEmployee.length === 0 ? (
              <div className="flex flex-col items-center h-[80%] mt-[100px] text-red-500 font-semibold  align-middle justify-center">
                <div style={{ fontSize: "25px" }}>Por favor, cadastre serviços, colaboradores e clientes antes de realizar agendamentos.</div>
                <div>
                  <img src="/error2.jpg" alt="Error" className='h-[600px]' />
                </div>
              </div>
            ) : (
              //Filtros e Tabela
              <div>
                <div className='flex justify-between'>
                  <label className="block mx-11 mt-3 text-sm font-medium text-gray-900 dark:text-gray-400">Filtre por Data</label>
                  <label className="block mx-11 mt-3 text-sm font-medium text-gray-900 dark:text-gray-400">Filtre por Serviço</label>

                </div>
                <div className="mx-11 mt-3 mb-10 flex justify-between">
                  <div className="w-[15%]">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:bg-white"
                      placeholderText="Selecione a data"
                      required
                      locale={ptBR}
                    />

                  </div>
                  <div className="h-10">
                    <select
                      name="servico"
                      className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-blue-600 text-white px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:text-blue-600 focus:border-blue-500 rounded-lg"
                      value={filtro.servico}
                      onChange={(e) => handleFiltroChange(e)}
                    >
                      <option value="" className="bg-white text-blue-500">Todos</option>
                      {listService &&
                        listService.map((servico) => (
                          <option
                            key={servico.id}
                            value={servico.name}
                            className="bg-white text-blue-500"
                          >
                            {servico.name}
                          </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center ml-4 px-2 text-gray-700 rounded-lg">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <div className="mx-8 px-4 overflow-x-hidden">
                      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Cliente
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Serviço agendado
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider flex">
                                Data e Horario

                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Colaborador resposavel
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Preço do Serviço
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Número de Contato
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Email
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Pagamento Recebido

                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Agendamento confirmado
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Detalhes
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {itensFiltrados.map((agendamento) => (
                              <tr key={agendamento.id}>
                                <td className="pl-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                  {agendamento.clientPhoto ? (
                                    <img src={`http://localhost:3333/files/${agendamento.clientPhoto}`} alt="Imagem do Cliente" width="60" height="" />
                                  ) : (
                                    <svg width="78" height="78" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M15.121 27.8037C17.1527 26.6554 19.4998 26 22 26C24.5002 26 26.8473 26.6554 28.879 27.8037M25 20C25 21.6569 23.6569 23 22 23C20.3431 23 19 21.6569 19 20C19 18.3431 20.3431 17 22 17C23.6569 17 25 18.3431 25 20ZM31 22C31 26.9706 26.9706 31 22 31C17.0294 31 13 26.9706 13 22C13 17.0294 17.0294 13 22 13C26.9706 13 31 17.0294 31 22Z" stroke="#6774BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                  )}
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{agendamento.clientName}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{agendamento.serviceName}</p>
                                </td>

                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <span style={{ display: 'inline-block', marginRight: '10px' }}>{format(new Date(agendamento.date_appointment), 'dd-MM-yyyy')}</span>
                                  <span style={{ display: 'inline-block', color: 'blue' }}>{format(new Date(agendamento.date_appointment), 'HH:mm')}</span>
                                </td>


                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{agendamento.employeeName}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">R$ {agendamento.servicePrice}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                  <a href={`https://api.whatsapp.com/send?1=pt_BR&phone=${encodeURIComponent(agendamento.clientContact)}`} target="_blank" className="flex items-center">
                                    <p className="text-gray-900 whitespace-no-wrap mr-8">{agendamento.clientContact}
                                    </p>
                                    <svg width="25px" height="25px" viewBox="-2.73 0 1225.016 1225.016" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#E0E0E0" d="M1041.858 178.02C927.206 63.289 774.753.07 612.325 0 277.617 0 5.232 272.298 5.098 606.991c-.039 106.986 27.915 211.42 81.048 303.476L0 1225.016l321.898-84.406c88.689 48.368 188.547 73.855 290.166 73.896h.258.003c334.654 0 607.08-272.346 607.222-607.023.056-162.208-63.052-314.724-177.689-429.463zm-429.533 933.963h-.197c-90.578-.048-179.402-24.366-256.878-70.339l-18.438-10.93-191.021 50.083 51-186.176-12.013-19.087c-50.525-80.336-77.198-173.175-77.16-268.504.111-278.186 226.507-504.503 504.898-504.503 134.812.056 261.519 52.604 356.814 147.965 95.289 95.36 147.728 222.128 147.688 356.948-.118 278.195-226.522 504.543-504.693 504.543z"></path><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="609.77" y1="1190.114" x2="609.77" y2="21.084"><stop offset="0" stop-color="#20b038"></stop><stop offset="1" stop-color="#60d66a"></stop></linearGradient><path fill="url(#a)" d="M27.875 1190.114l82.211-300.18c-50.719-87.852-77.391-187.523-77.359-289.602.133-319.398 260.078-579.25 579.469-579.25 155.016.07 300.508 60.398 409.898 169.891 109.414 109.492 169.633 255.031 169.57 409.812-.133 319.406-260.094 579.281-579.445 579.281-.023 0 .016 0 0 0h-.258c-96.977-.031-192.266-24.375-276.898-70.5l-307.188 80.548z"></path><image overflow="visible" opacity=".08" width="682" height="639" transform="translate(270.984 291.372)"></image><path fill-rule="evenodd" clip-rule="evenodd" fill="#FFF" d="M462.273 349.294c-11.234-24.977-23.062-25.477-33.75-25.914-8.742-.375-18.75-.352-28.742-.352-10 0-26.25 3.758-39.992 18.766-13.75 15.008-52.5 51.289-52.5 125.078 0 73.797 53.75 145.102 61.242 155.117 7.5 10 103.758 166.266 256.203 226.383 126.695 49.961 152.477 40.023 179.977 37.523s88.734-36.273 101.234-71.297c12.5-35.016 12.5-65.031 8.75-71.305-3.75-6.25-13.75-10-28.75-17.5s-88.734-43.789-102.484-48.789-23.75-7.5-33.75 7.516c-10 15-38.727 48.773-47.477 58.773-8.75 10.023-17.5 11.273-32.5 3.773-15-7.523-63.305-23.344-120.609-74.438-44.586-39.75-74.688-88.844-83.438-103.859-8.75-15-.938-23.125 6.586-30.602 6.734-6.719 15-17.508 22.5-26.266 7.484-8.758 9.984-15.008 14.984-25.008 5-10.016 2.5-18.773-1.25-26.273s-32.898-81.67-46.234-111.326z"></path><path fill="#FFF" d="M1036.898 176.091C923.562 62.677 772.859.185 612.297.114 281.43.114 12.172 269.286 12.039 600.137 12 705.896 39.633 809.13 92.156 900.13L7 1211.067l318.203-83.438c87.672 47.812 186.383 73.008 286.836 73.047h.255.003c330.812 0 600.109-269.219 600.25-600.055.055-160.343-62.328-311.108-175.649-424.53zm-424.601 923.242h-.195c-89.539-.047-177.344-24.086-253.93-69.531l-18.227-10.805-188.828 49.508 50.414-184.039-11.875-18.867c-49.945-79.414-76.312-171.188-76.273-265.422.109-274.992 223.906-498.711 499.102-498.711 133.266.055 258.516 52 352.719 146.266 94.195 94.266 146.031 219.578 145.992 352.852-.118 274.999-223.923 498.749-498.899 498.749z"></path></g></svg>
                                  </a>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{agendamento.clientEmail}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  {agendamento.confirmation ? (
                                    <h1 className="text-blue-600 whitespace-no-wrap">Realizado</h1>
                                  ) : (
                                    <h1 className="text-red-600 whitespace-no-wrap">Pendente</h1>
                                  )}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  {agendamento.confirmation ? (
                                    <h1 className="text-blue-600 whitespace-no-wrap">Realizado</h1>
                                  ) : (
                                    <h1 className="text-red-600 whitespace-no-wrap">Pendente</h1>
                                  )}
                                </td>
                                <td className="  px-5 py-5 border-b  bg-white text-sm justify-center justify-items-center">
                                  <svg width="18px" height="18px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M320 89.6h640v76.8H320V89.6z m0 768h640v76.8H320v-76.8z m-256-768h128v76.8H64V89.6z m256 384h640v76.8H320V473.6z m-256 0h128v76.8H64V473.6z m0 384h128v76.8H64v-76.8z" fill="#000000" /></svg>                            </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>

                    </div>
                  </div>
                  <div className='mt-10'>
                    <div className='absolute top-4/4 left-72'>
                      <div className="flex items-center justify-end">
                        <button onClick={() => setOpenModal(true)} type="submit" className='bg-blue-600 hover:bg-blue-700 rounded-md p-2 text-white'>Cadastrar</button>
                      </div>
                    </div>


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

          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiclient = setupAPIClient(ctx);

  try {
    // Requisição para obter informações do usuário
    const userResponse = await apiclient.get('/me');
    console.log('Dados do usuário:', userResponse.data);

    // Requisição para obter informações do serviço com base no userId
    const serviceResponse = await apiclient.get('/service', {
      params: { userId: userResponse.data.id },
    });
    console.log('Dados do serviço:', serviceResponse.data);

    // Requisição para obter informações dos appointments com base no userId
    const appointmentResponse = await apiclient.get('/appointmentlist', {
      params: { userId: userResponse.data.id },
    });
    console.log('Dados dos appointments:', appointmentResponse.data);

    const clientResponse = await apiclient.get('/clientlist', {
      params: { userId: userResponse.data.id },
    });
    console.log("cliente: " + clientResponse.data);

    const employeeResponse = await apiclient.get('/employeelist', {
      params: { userId: userResponse.data.id },
    });
    console.log("colaborador: " + employeeResponse.data);

    return {
      props: {
        listDetailUser: userResponse.data,
        listService: serviceResponse.data,
        listAppointments: appointmentResponse.data,
        listClient: clientResponse.data,
        listEmployee: employeeResponse.data,
      },
    };
  } catch (error) {
    console.error('Erro durante a execução de getServerSideProps:', error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
});