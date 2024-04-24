import React, { useState, useContext, useEffect, useRef } from "react";
import { FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../../services/api";
import { AuthContext } from "../../../contexts/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import { parseISO, format } from 'date-fns';
import InputMask from 'react-input-mask';
import ptBR from 'date-fns/locale/pt-BR'; // Importe o pacote de localização para Português Brasileiro


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
interface CreateAppointmentProps {
    isOpen: boolean;
    setModalOpen: () => void;
    listService: ServiceProps[];
    listClient: ClientProps[];
    listEmployee: EmployeeProps[];
}

export default function CreateAppointment({ isOpen, setModalOpen, listService, listClient, listEmployee }: CreateAppointmentProps) {

    const { user } = useContext(AuthContext);

    console.log("-----------------------------------------------------")
    useEffect(() => {
        // Verificar se a lista de clientes está vazia quando o componente for montado
        if (listClient.length === 0) {
            toast.error('Cadastre um serviço');
        }
    }, [listClient]);

    // const [serviceSelected, setServiceSeletected] = useState(listService || [])
    const [serviceSelected, setServiceSelected] = useState({ id: '', price: '' });
    const [clientSelected, setClientSeletected] = useState(null)
    const [togglePayment, setTogglePayment] = useState(false)
    const [toggleAppointment, setToggleAppointment] = useState(false)
    const [employee, setEmployee] = useState('')

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredClients, setFilteredClients] = useState(listClient);
    const [clienteID, setClienteID] = useState(null);

    const [search, setSearch] = useState(false);


    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('12:00');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(time); // Substitua isso pelo seu horário específico

    const [employeeList, setEmployeeList] = useState([]); // Adicione o estado para os colaboradores
    const [filteredEmployees, setFilteredEmployees] = useState([]); // Adicione o estado para os colaboradores filtrados
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {
        setEmployeeList(listEmployee);
    }, [listEmployee]);



    // ...


    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const handleTimeChange = (newTime) => {
        setSelectedTime(newTime);
    };


    function handleChangeService(e) {
        const selectedIndex = e.target.value;
        const selectedService = listService[selectedIndex];

        // Armazene o objeto do serviço selecionado (id e price)
        setServiceSelected({ id: selectedService.id, price: selectedService.price });
    }

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        // Lógica de filtragem apenas pelo CPF
        const filtered = listClient.filter(
            (client) => client.cpf.includes(searchTerm)
        );

        if (filtered.length === 1) {
            // Se houver exatamente um cliente encontrado, defina o nome e o ID
            setClientSeletected(filtered[0].name);
            setClienteID(filtered[0].id);
        } else {
            setClientSeletected(null);
            setClienteID(null);
        }

        setFilteredClients(filtered);
        setSearch(true);
        // console.log(clientSelected+ ' ---------- '+clienteID)
    };






    // const dateString = date
    // const parsedDate = parse(dateString, "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX (zzzz)", new Date());
    // const cleanedDate = format(parsedDate, "yyyy-MM-dd HH:mm:ss");

    // console.log("Data limpa" + cleanedDate);


    // console.log("TESTE DEFINITIVO1111 - Data: " + selectedDate.toISOString().split('T')[0] + " Horário: " + selectedTime);
    // console.log("TESTE DEFINITIVO 2222- Data: " + format(selectedDate, "yyyy-MM-dd") + " Horário: " + selectedTime);

    // Combine data e hora em uma string
    // let appointmentDate = selectedDate.toISOString() + selectedTime;

    // Converta a string combinada para um objeto Date
    // const combinedDateTime = parseISO(appointmentDate);

    // Formate a data e a hora combinadas para o formato ISO 8601
    // const iso8601DateTime = format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    console.log(employee)


    const handleEmployeeChange = (e) => {
        const value = e.target.value.toLowerCase();
        setInputValue(value);

        const filtered = listEmployee.filter((employee) =>
            employee.name.toLowerCase().includes(value)
        );

        setFilteredEmployees(filtered);
    };




    const handleSelectEmployee = (selectedEmployee) => {
        setEmployee(selectedEmployee.id);
        setSelectedEmployee(selectedEmployee);
        setFilteredEmployees([]);
        setInputValue(selectedEmployee.name); // Definir o valor do input para o nome do colaborador selecionado
        inputRef.current.focus();
    };

    const handleClearSelection = () => {
        setEmployee('');
        setSelectedEmployee(null);
        setFilteredEmployees([]);
        setInputValue('');
        inputRef.current.focus();
    };
    const inputRef = useRef(null);
    async function handleRegisterAppointment(event: FormEvent) {
        const combinedDateTime = new Date(`${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}:00`);
        // const iso8601DateTime = combinedDateTime.toISOString();
        event.preventDefault();
        console.log("UserID do usuario logado:", user.id);
        console.log("ID do Cliente:", clienteID);
        console.log("ID do Serviço:", serviceSelected?.id);
        console.log("Data: " + format(selectedDate, "yyyy-MM-dd") + " Horário: " + selectedTime);
        console.log("Confirmação de Pagamento:", togglePayment);
        console.log("Confirmação de Agendamento:", toggleAppointment);

        console.log("Preço do Serviço:", serviceSelected?.price);
        console.log("Colaborador:", employee);


        try {
            if (clientSelected === '' || toggleAppointment === null || togglePayment === null || employee === '' || !selectedDate || serviceSelected === null) {
                toast.error("Preencha todos os dados")
                return
            }

            const apiAppointment = setupAPIClient();

            await apiAppointment.post('/appointment', {
                data: format(selectedDate, "yyyy-MM-dd") + " " + selectedTime,
                userId: user.id,
                clientId: clienteID,
                serviceId: serviceSelected.id,
                confirmation: toggleAppointment,
                price: serviceSelected.price,
                employeeId: employee,
                payment: togglePayment,
            });

            setToggleAppointment(false)
            setTogglePayment(false)
            setTimeout(() => {
                setModalOpen();
            }, 2000);
            window.location.reload();
            toast.success('Agendamento realizado com Sucesso')

        } catch (error) {
          
            setToggleAppointment(false)
            setTogglePayment(false)
            setTimeout(() => {
                setModalOpen();
            }, 2000);
            window.location.reload();
            toast.success('Agendamento realizado com Sucesso')
        }
    }

    if (isOpen) {

        return (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-80 z-50 ">
                <div className="top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]  rounded-md w-300 h-300 relative min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                        <button className="flex justify-end items-end w-full text-gray-900  rounded-md focus:outline-none -mt-5" onClick={() => { setModalOpen(); setTogglePayment(false); setToggleAppointment(false) }} >
                            <svg className="w-6 h-6 -mr-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <div>

                            <div className="flex justify-end gap-2 w-full">
                                <div className="w-full mt-2.5">
                                    <form className="flex w-full" onSubmit={handleSearch}>
                                        <div className="relative w-full">
                                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <InputMask
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                                                placeholder="Digite o CPF"
                                                required
                                                value={searchTerm}
                                                mask="999.999.999-99"
                                                maskPlaceholder="123.456.789-10"
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            <svg
                                                className="mr-2 -ml-1 w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                ></path>
                                            </svg>
                                            Procurar
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <form onSubmit={handleRegisterAppointment} >
                                <div className="my-6">
                                    <label className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nome Completo :</label>
                                    <h1 id="fullname" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Cliente selecionado">
                                        {clientSelected !== null ? listClient.find(client => client.name === clientSelected)?.name : "Cliente não encontrado"}
                                        {console.log(clientSelected, clienteID)}
                                    </h1>
                                </div>

                                <label className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400">Selecione o serviço que será prestado :</label>

                                {listService.length === 0 ? (
                                    <div className="text-red-500 font-semibold my-2">
                                        Por favor, cadastre um serviço na página de serviços.
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <select
                                            onChange={handleChangeService}
                                            placeholder="Escolha um serviço"
                                            className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-blue-600 text-white py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:text-blue-600 focus:border-blue-500 rounded-lg"

                                        >
                                            {listService.map((servico, index) => (
                                                <option key={servico.id} value={index} className="bg-white text-blue-500 m-5">
                                                    {servico.name}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center ml-4 px-2 text-white focus:text-blue-500 rounded-lg">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="#"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                                {/* <div className="my-6">
                                <label className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400">Valor extra? </label>
                                <input value={valorExtra}  id="fullname" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Colaborador" />
                            </div> */}

                                <div className="my-6">
                                    <label className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400">Valor a ser cobrado :</label>
                                    <h1 id="fullname" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Cliente selecionado">
                                        {serviceSelected.price !== '' ? `R$: ${serviceSelected.price}` : 'Selecione um serviço'}
                                    </h1>
                                </div>
                                <div className="my-6 relative">
                                    <label className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                        Colaborador responsável pelo atendimento no dia :
                                    </label>
                                    <input
                                        ref={inputRef}
                                        onChange={handleEmployeeChange}
                                        id="employee"
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Colaborador"
                                        value={inputValue}
                                    />

                                    {selectedEmployee && (
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 m-2 px-3 py-1 bg-red-500 text-white rounded"
                                            onClick={handleClearSelection}
                                        >
                                            Limpar
                                        </button>
                                    )}
                                    {filteredEmployees.length > 0 && (
                                        <div className="absolute z-10 mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full">
                                            {filteredEmployees.map((employee) => (
                                                <div
                                                    key={employee.id}
                                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleSelectEmployee(employee)}
                                                >
                                                    {employee.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="max-w-2xl mx-auto bg-white">
                                    <div className="grid gap-6  lg:grid-cols-2 mt-3">
                                        <div>
                                            <label className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400">Data</label>
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
                                            <label className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400">Horário</label>

                                            <input
                                                type="time"
                                                value={selectedTime}
                                                onChange={(e) => handleTimeChange(e.target.value)}
                                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:bg-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-2xl mx-auto">
                                    <div className="grid gap-6 mb-6 lg:grid-cols-2 mt-2">
                                        <div className="my-2 w-full">
                                            <label className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400">Valor foi pago?</label>
                                            <div className="relative inline-block w-20 mr-2 align-middle select-none transition duration-200 ease-in">
                                                <input
                                                    onClick={() => setTogglePayment(!togglePayment)}
                                                    type="checkbox"
                                                    name="togglePayment"
                                                    id="togglePayment"
                                                    className="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                />
                                                <label className={`toggle-label block overflow-hidden h-7 rounded-full ${togglePayment ? 'bg-green-500' : 'bg-red-500'} cursor-pointer`}>
                                                    <h1 className={`ml-${togglePayment ? '5' : '6'} pl-7 pt-1 text-white`}>{togglePayment ? 'Sim' : 'Não'}</h1>
                                                    {console.log(togglePayment)}
                                                </label>
                                            </div>
                                        </div>

                                        <div className="my-2 w-full">
                                            <label className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400">Agendamento confirmado?</label>
                                            <div className="relative inline-block w-20 mr-2 align-middle select-none transition duration-200 ease-in">
                                                <input
                                                    onClick={() => setToggleAppointment(!toggleAppointment)}
                                                    type="checkbox"
                                                    name="toggleAppointment"
                                                    id="toggleAppointment"
                                                    className="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                />
                                                <label className={`toggle-label block overflow-hidden h-7 rounded-full ${toggleAppointment ? 'bg-green-500' : 'bg-red-500'} cursor-pointer`}>
                                                    <h1 className={`ml-${toggleAppointment ? '5' : '6'} pl-7 pt-1 text-white`}>{toggleAppointment ? 'Sim' : 'Não'}</h1>
                                                    {console.log(toggleAppointment)}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex items-center my-6">
                                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">Após o agendamento <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">Recarregue a pagina</a>.</label>
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Cadastrar Agendamento
                                </button>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        );
    }

    return null;
}

{

}