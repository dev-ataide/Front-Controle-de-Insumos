import Head from 'next/head';
import { Chart } from "react-google-charts";

import { canSSRAuth } from '../../utils/canSSRAuth';
import Menu from '../../components/Menu/MenuinC'
import Top from '../../components/Menu/Top'
import { useState, useContext, useEffect } from 'react'
import { setupAPIClient } from '../../services/api';
import { api } from '../../services/apiClient';
import { AuthContext } from '../../contexts/AuthContext';
import CreateAppointment from '../../components/modals/appointment/createAppointment';
import { format, isToday, isSameDay, isSameMonth } from 'date-fns';
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

// ...

export default function Dashboard({ listDetailUser, listAppointments, listService, listClient, listEmployee }: UserProps) {
    // Console.log para exibir dados do usuário e serviço recebidos como propriedades
    console.log('Dados do usuário no componente:', listDetailUser);
    console.log('Dados do serviço no componente:', listService);

    // Estado para armazenar detalhes do usuário e controle de modal
    const [userDetail, setUserDetail] = useState(listDetailUser);
    const [openModal, setOpenModal] = useState(false);

    // Estado para controle da paginação
    const [itens, setItens] = useState([]);
    const [itensPerPage, setItensPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredAppointments, setFilteredAppointments] = useState(listAppointments);

    // Cálculos para paginação
    const pages = Math.ceil(filteredAppointments.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentFilteredItens = filteredAppointments.slice(startIndex, endIndex);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const currentItens = filteredAppointments.slice(startIndex, endIndex);

    // Obter o mês atual para estatísticas
    const currentMonth = selectedDate.getMonth() + 1;

    // Contagem de serviços por mês
    const serviceCounts: { [key: string]: number } = {};

    listAppointments.forEach((appointment: AppointmentProps) => {
        const appointmentDate = new Date(appointment.date_appointment);
        if (appointmentDate.getMonth() + 1 === currentMonth) {
            if (serviceCounts[appointment.serviceName]) {
                serviceCounts[appointment.serviceName]++;
            } else {
                serviceCounts[appointment.serviceName] = 1;
            }
        }
    });

    // Estado para filtro de dados
    const [filtro, setFiltro] = useState({ data: '', servico: '' });

    // Dados para o gráfico de serviços por mês
    const chartData = [['Service', 'Total']];
    Object.keys(serviceCounts).forEach((serviceName: string) => {
        chartData.push([String(serviceName), serviceCounts[serviceName]]);
    });

    // Efeito para filtrar agendamentos com base na data selecionada
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

    // Funções para controle de paginação
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goPrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const goNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, pages - 1));
    };

    // Função para lidar com a mudança de data
    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    // Contagem de agendamentos por dia
    const appointmentsPerDay: { [key: string]: number } = {};

    listAppointments.forEach((appointment: AppointmentProps) => {
        const appointmentDate = new Date(appointment.date_appointment);
        const formattedDate = appointmentDate.toDateString();

        // Incrementa a contagem de agendamentos para o dia correspondente
        if (appointmentsPerDay[formattedDate]) {
            appointmentsPerDay[formattedDate]++;
        } else {
            appointmentsPerDay[formattedDate] = 1;
        }
    });

    // Dados para o gráfico de agendamentos por dia
    const chartDataPerDay = [['Data', 'Total de Agendamentos']];
    Object.keys(appointmentsPerDay).forEach((date: string) => {
        chartDataPerDay.push([new Date(date), appointmentsPerDay[date]]);
    });



    const options = {
        chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
    };
    // Obter o mês atual para estatísticas

    // Calcular o valor total de entrada (total de todos os serviços prestados)
    const entradaTotal = listService.reduce((total, service) => {
        // Encontrar todos os agendamentos desse serviço
        const appointmentsForService = listAppointments.filter(appointment => appointment.serviceId === service.id);
        // Calcular o total de agendamentos desse serviço
        const totalAppointmentsForService = appointmentsForService.length;
        // Calcular o valor total para esse serviço (preço do serviço * total de agendamentos)
        const totalForService = parseFloat(service.price) * totalAppointmentsForService;
        // Somar ao total geral
        return total + totalForService;
    }, 0);

    // Dados para o gráfico de entrada
    // Contagem de entrada por mês e tipo de serviço
    const entradaPorMes: { [key: string]: { [key: string]: number } } = {};

    listAppointments.forEach((appointment: AppointmentProps) => {
        const appointmentDate = new Date(appointment.date_appointment);
        // Verifica se a data do agendamento está no mesmo mês que a data selecionada
        if (isSameMonth(appointmentDate, selectedDate)) {
            const monthKey = `${appointmentDate.getFullYear()}-${appointmentDate.getMonth() + 1}`;
            if (!entradaPorMes[monthKey]) {
                entradaPorMes[monthKey] = {};
            }

            if (entradaPorMes[monthKey][appointment.serviceName]) {
                entradaPorMes[monthKey][appointment.serviceName]++;
            } else {
                entradaPorMes[monthKey][appointment.serviceName] = 1;
            }
        }
    });

    // Dados para o gráfico de entrada
    const chartDataEntrada = [['Mês', ...listService.map(service => service.name)]];

    Object.keys(entradaPorMes).forEach(monthKey => {
        const row = [monthKey];
        listService.forEach(service => {
            const count = entradaPorMes[monthKey][service.name] || 0;
            row.push(count);
        });
        chartDataEntrada.push(row);
    });

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
                    <div>

                        <Chart chartType="BarChart"
                            width="100%"
                            height="400px"
                            data={chartData}
                            options={{
                                title: 'Quantidade de Serviços por mês',
                                chartArea: { width: '20%' },
                                hAxis: {
                                    title: 'Total',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Tipo de Serviço',
                                },
                            }}
                        />
                           <Chart
                        chartType="Calendar"
                        width="100%"
                        height="400px"
                        data={chartDataPerDay}
                        options={{
                            title: 'Total de Agendamentos por Dia',
                            chartArea: { width: '50%' },
                            hAxis: {
                                title: 'Data',
                            },
                            vAxis: {
                                title: 'Total de Agendamentos',
                            },
                        }}
                    />

                    <Chart chartType="Bar"
                        width="70%"
                        height="400px"
                        data={chartDataEntrada}
                        options={{
                            chart: {
                                title: "Acompanhamento mensal da Receita",
                                subtitle: "Valores mensais",
                            },
                            title: 'Entrada Total por Tipo de Serviço',
                            chartArea: { width: '100%' },
                            hAxis: {
                                title: 'Tipo de Serviço',
                            },
                            vAxis: {
                                title: 'Valor',
                            },
                        }}

                    />
                    </div>
                 

                </div>
            </div>
        </>
    );
}

// ...

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
