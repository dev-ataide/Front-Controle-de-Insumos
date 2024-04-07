import React, { useState, useContext } from "react";
import { FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../../services/api";
import { AuthContext } from "../../../contexts/AuthContext";


export default function CriarServico({ isOpen, setModalOpen }) {

    const { user } = useContext(AuthContext);
    console.log(user)


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('');

    const handlePriceChange = (e) => {
      // Aceita tanto números como strings e converte para string
      setPrice(e.target.value.toString());
    };
    

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
            toast.success('Serviço cadastrado');
            setName('');
            setPrice('');
            setDescription('');
        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar o serviço');
        }
    };


    if (isOpen) {

        return (
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-80 z-50">
                <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]  rounded-md w-300 h-300 relative min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                        <button className="flex justify-end items-end w-full text-gray-900  rounded-md focus:outline-none" onClick={setModalOpen}>
                            <svg className="w-6 h-6 -mr-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <div className="text-center">
                            <h2 className="mt-5 text-3xl font-bold text-gray-900">
                                Cadastre um novo serviço!
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">Cadastrando um novo serviço ele estará disponível para clientes no site.</p>
                        </div>
                        <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wide">Nome do Serviço</label>
                                <input
                                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    type="text"
                                    name="nomeServico"
                                    placeholder="EX: Armonização Facial"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wide">Descrição do Serviço</label>
                                <textarea
                                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    name="descricao"
                                    placeholder="Descrição do Serviço"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 space-y-2 pb-12">
                                <label className="text-sm font-bold text-gray-500 tracking-wide">Preço do Serviço</label>
                                <input
                                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    type="text"
                                    name="preco"
                                    placeholder="EX: R$150,50"
                                    value={price}
                                    onChange={handlePriceChange}
                                />

                            </div>
                            <button
                                type="submit"
                                className="my-5 w-full flex bg-blue-700 hover:bg-blue-800 justify-center bg-cfit_purple text-white p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-cfit_purpledark shadow-lg cursor-pointer transition ease-in duration-300"
                            >
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

{


}