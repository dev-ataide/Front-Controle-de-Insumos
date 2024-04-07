// Top.js
import React, { createContext, useState, useContext } from 'react';
import { signOut } from '../../contexts/AuthContext';

import { AuthContext } from '../../contexts/AuthContext'

import Link from 'next/link';

import { canSSRGuest } from '../../utils/canSSRGuest'

const UserProfileContext = createContext({
    profile: false,
    profileClick: () => { },
});

export default function Top({ userDetail }) {
    const { signOut } = useContext(AuthContext)

    const [profile, setProfile] = useState(false);

    const profileClick = () => {
        setProfile(!profile);
    };

    const [notify, setNotify] = useState(true);
    const handleButtonClick = () => {
        setNotify(!notify); // Altera o estado para o oposto do valor atual
    };

    console.log(profile)

async function sair(e) {
    await signOut()
}

    return (
        <div className='flex-col w-full'>
            <UserProfileContext.Provider value={{ profile, profileClick }}>
                <div className='flex justify-between w-full p-2 '>
                    {/* Aqui começa as opções da esquerda no top */}
{/* 
                    <div className='flex justify-end gap-2 ml-10 w-2/6'>
                        <div className="w-full mt-2.5 ">
                            <form className="flex  w-full">
                                <label className="sr-only">Procurar</label>
                                <div className="relative w-full">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                    </div>
                                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " placeholder="CPF ou Nome" required />
                                </div>
                                <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Search</button>
                            </form>
                        </div>
                    </div> */}

                    {/* Aqui começa as opções da Direita no top */}

                    <div className='ml-auto'>
                        <div className='flex gap-2' >
                            <a className="text-sm font-medium text-white py-2  hover:text-base rounded-md transition duration-150 ease-in-out cursor-pointer">
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.3246 14.3173C20.751 12.5609 23.249 12.5609 23.6754 14.3173C23.9508 15.4519 25.2507 15.9904 26.2478 15.3828C27.7913 14.4424 29.5576 16.2087 28.6172 17.7522C28.0096 18.7493 28.5481 20.0492 29.6827 20.3246C31.4391 20.751 31.4391 23.249 29.6827 23.6754C28.5481 23.9508 28.0096 25.2507 28.6172 26.2478C29.5576 27.7913 27.7913 29.5576 26.2478 28.6172C25.2507 28.0096 23.9508 28.5481 23.6754 29.6827C23.249 31.4391 20.751 31.4391 20.3246 29.6827C20.0492 28.5481 18.7493 28.0096 17.7522 28.6172C16.2087 29.5576 14.4424 27.7913 15.3829 26.2478C15.9904 25.2507 15.4519 23.9508 14.3173 23.6754C12.5609 23.249 12.5609 20.751 14.3173 20.3246C15.4519 20.0492 15.9904 18.7493 15.3828 17.7522C14.4424 16.2087 16.2087 14.4424 17.7522 15.3828C18.7493 15.9904 20.0492 15.4519 20.3246 14.3173Z" stroke="#6774BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M25 22C25 23.6569 23.6569 25 22 25C20.3431 25 19 23.6569 19 22C19 20.3431 20.3431 19 22 19C23.6569 19 25 20.3431 25 22Z" stroke="#6774BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                            <a onClick={handleButtonClick} className="text-sm font-medium text-white py-2  hover:text-base rounded-md transition duration-150 ease-in-out cursor-pointer">

                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25 27H30L28.5951 25.5951C28.2141 25.2141 28 24.6973 28 24.1585V21C28 18.3876 26.3304 16.1651 24 15.3414V15C24 13.8954 23.1046 13 22 13C20.8954 13 20 13.8954 20 15V15.3414C17.6696 16.1651 16 18.3876 16 21V24.1585C16 24.6973 15.7859 25.2141 15.4049 25.5951L14 27H19M25 27V28C25 29.6569 23.6569 31 22 31C20.3431 31 19 29.6569 19 28V27M25 27H19" stroke="#6774BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    {notify && (
                                        <circle cx="27" cy="17" r="3.5" fill="#C72549" stroke="white" />

                                    )}
                                </svg>
                            </a>

                            <div className='flex' onClick={profileClick}>
                                <a className="text-sm font-medium text-white py-2  hover:text-base rounded-md transition duration-150 ease-in-out cursor-pointer " >
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.121 27.8037C17.1527 26.6554 19.4998 26 22 26C24.5002 26 26.8473 26.6554 28.879 27.8037M25 20C25 21.6569 23.6569 23 22 23C20.3431 23 19 21.6569 19 20C19 18.3431 20.3431 17 22 17C23.6569 17 25 18.3431 25 20ZM31 22C31 26.9706 26.9706 31 22 31C17.0294 31 13 26.9706 13 22C13 17.0294 17.0294 13 22 13C26.9706 13 31 17.0294 31 22Z" stroke="#6774BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                              

                                {/* <h1 className='pt-5 hover:text-aftb_blue_active cursor-pointer'>{userDetail.name}</h1> */}
                            </div>

                            <div className='flex' onClick={sair}>
                                <a className="text-sm font-medium text-white py-2  hover:text-base rounded-md transition duration-150 ease-in-out cursor-pointer " >
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.121 27.8037C17.1527 26.6554 19.4998 26 22 26C24.5002 26 26.8473 26.6554 28.879 27.8037M25 20C25 21.6569 23.6569 23 22 23C20.3431 23 19 21.6569 19 20C19 18.3431 20.3431 17 22 17C23.6569 17 25 18.3431 25 20ZM31 22C31 26.9706 26.9706 31 22 31C17.0294 31 13 26.9706 13 22C13 17.0294 17.0294 13 22 13C26.9706 13 31 17.0294 31 22Z" stroke="#6774BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                              

                                {/* <h1 className='pt-5 hover:text-aftb_blue_active cursor-pointer'>{userDetail.name}</h1> */}
                            </div>


                        </div>

                    </div>

                </div>
                <div className='h-0.5 w-full bg-gray-200'></div>      </UserProfileContext.Provider>
        </div>
    );
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  
    return {
      props: {}
    }
  })
  