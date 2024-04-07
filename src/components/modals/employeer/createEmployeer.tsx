import React, { useState, useContext } from "react";
import { FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../../services/api";
import { AuthContext } from "../../../contexts/AuthContext";


export default function CriarServico({ isOpen, setModalOpen }) {

    
    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)
    const [employeerName, setClientName] = useState('')
    const [cpf, setCpf] = useState('')
    const [contato, setContato] = useState('')
    const [email, setEmail] = useState('')
    const [obs, setObs] = useState('')






    const { user } = useContext(AuthContext);
    console.log(user)


    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')





    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const data = new FormData();
            if (name === '' || price === '' || description === '') {
                toast.error('Preencha todos os campos');
                return;
            }
            const apiClient = setupAPIClient();
            await apiClient.post('/service', {
                name: name,
                description: description,
                price: price,
                userId: user.id
            });
            console.log(user.id)
            window.location.reload();

            setName('');
            setPrice('');
            setDescription('');
            toast.error('Colaborador cadastrado com sucesso');
            window.location.reload();

        } catch (error) {
            console.log(error);
            toast.error('Falha ao cadastrar colaborador');
        }
    };

    const setImg = () => {
        setAvatarUrl('');
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {

        console.log(e.target.files)
        if (!e.target.files) {
            return
        }
        const image = e.target.files[0]

        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }

    }

    async function handleRegisterColaborador(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();
            if (employeerName === '' || cpf === '' || email === '' || contato === '' || obs === '' || imageAvatar === null) {
                toast.error("Preencha todos os dados")
                return
            }

            data.append('file', imageAvatar);
            data.append('name', employeerName)
            data.append('email', email)
            data.append('contact', contato)
            data.append('observer', obs)
            data.append('cpf', cpf)
            data.append('userId', user.id)

            const apiClient = setupAPIClient();

            await apiClient.post('/employee', data)
            toast.success('Colaborador cadastrado com Sucesso')

            setTimeout(() => {
                setModalOpen();
            }, 2000);
       

        } catch (error) {
            console.log(error)
            toast.error("erro ao cadastrar Colaborador")
        }
    }


    if (isOpen) {

        return (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-80 z-50 ">
                <div className="top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]  rounded-md w-300 h-300 relative min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                        <button className="flex justify-end items-end w-full text-gray-900  rounded-md focus:outline-none -mt-5" onClick={setModalOpen} >
                            <svg className="w-6 h-6 -mr-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <main className="flex items-center justify-center mt-5 bg-gray-100 font-sans">
                            <label className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center">
                                {avatarUrl ? (
                                    <div><button className="flex justify-end items-end w-full text-gray-900  rounded-md focus:outline-none -mt-5" onClickCapture={setImg}>
                                        <svg className="w-6 h-6 -mr-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>

                                        <img src={avatarUrl} className="w-full h-56" alt="Avatar"
                                        />
                                        <input id="dropzone-file" type="file" className="hidden " accept="image/png, image/jpeg" onChange={handleFile} />


                                    </div>


                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-blue-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />

                                    </svg>

                                )}

                                {!avatarUrl && (
                                    <div>
                                        <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Foto do seu Colaborador</h2>
                                        <p className="mt-2 text-gray-500 tracking-wide">Upload da foto nos seguintes formatos PNG, JPG, ou JPEG. </p>
                                        <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFile} />
                                    </div>
                                )}
                            </label>
                        </main>
                        <div className="max-w-2xl mx-auto bg-white">

                            <form onSubmit={handleRegisterColaborador} >
                                <div className="my-6">
                                    <label className="block m-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nome Completo</label>
                                    <input value={employeerName} onChange={(e) => setClientName(e.target.value)} type="fullname" id="fullname" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nome completo do Colaborador" required />
                                </div>
                                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">CPF</label>
                                        <input value={cpf} onChange={(e) => setCpf(e.target.value)} type="text" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:bg-white" placeholder="123.456.789-10" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Número para contato</label>
                                        <input value={contato} onChange={(e) => setContato(e.target.value)} type="tel" id="phone" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="(00)999999999" required />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Endereço de Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="emaildoColaborador@exemplo.com" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Observações sobre o Colaborador</label>
                                    <input value={obs} onChange={(e) => setObs(e.target.value)} type="text" id="company" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Informações adicionais" required />
                                </div>


                                <div className="flex items-start my-6">
                                    <div className="flex items-center h-5">
                                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">Faça o Upload de uma <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">foto em boa qualidade do seu Colaborador</a>.</label>
                                </div>
                                <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Cadastrar Colaborador
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
