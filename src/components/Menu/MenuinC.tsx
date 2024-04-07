// MenuLayout.js
import { useContext } from 'react';
import Image from 'next/image';
// import Img from '../../../public/avatarfigma.png';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'

const Menu = ({ userDetail }) => {

  var profile = true
  return (
    <body className="font-poppins antialiased">
      <div
        id="view"
        className="h-full w-auto flex "
      >
        <div
          id="Menu"
          className="bg-aftb_blue_dark h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
        >
          <div className="space-y-6 md:space-y-5 mt-10">
            {/* {profile && (
              
              <div className='flex bg-aftb_blue_dark rounded-lg'>
                <div className="">
                  <img className="w-24 mx-auto rounded-full border-8 border-aftb_blue_active" src="https://avatars.githubusercontent.com/u/67946056?v=4" alt="" />
                  <div className="text-white mt-4 text-center font-normal text-lg">{userDetail.name}</div>
                  <div className="p-4 text-white text-center mt-2 font-light text-sm">
                    <p>
                      {userDetail.email}
                    </p>
                  </div>
                  <div className="flex p-4">
                    <div className="w-1/2 text-white text-center">
                      <span className="font-bold"> {userDetail.email} </span>
                    </div>
                    <div className="w-0 border border-gray-300">

                    </div>
                    <div className="w-1/2 text-white text-center">
                      <span className="font-bold">   teste</span>    teste
                    </div>
                  </div>
                </div>
              </div>
            )} */}
            {userDetail.photo ? (
              <div>
                <img src={`http://localhost:3333/files/${userDetail.photo}`} alt="Imagem do Cliente" width="78" height="78" />
                <div className="text-white mt-4 text-center font-normal text-lg">{userDetail.name}</div>
                <div className="p-4 text-white text-center mt-2 font-light text-sm">
                  <p className='text-white text-center mt-2 font-light text-sm'>
                    {userDetail.email}
                  </p>
                </div>
              </div>

            ) : (
              <div>
                <img className="w-24 mx-auto rounded-full border-8 border-aftb_blue_active" src="https://tse1.mm.bing.net/th?id=OIP.dSOt8qT9LW3AIACmEpbJDAHaFj&pid=Api&P=0&h=180" alt="" />
                <button>
                  <div className='absolute top-[105px] left-32 cursor-pointer'>
                    <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="18" cy="18" r="16" stroke="#6774BD" fill='#6774BD' stroke-width="1.5" />
                    </svg>
                  </div>
                  <div className='absolute top-[113px] left-[137px] cursor-pointer'>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 11C8.10457 11 9 10.1046 9 9C9 7.89543 8.10457 7 7 7C5.89543 7 5 7.89543 5 9C5 10.1046 5.89543 11 7 11Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5.56055 21C11.1305 11.1 15.7605 9.35991 21.0005 15.7899" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M14.35 3H5C3.93913 3 2.92172 3.42136 2.17157 4.17151C1.42142 4.92165 1 5.93913 1 7V17C1 18.0609 1.42142 19.0782 2.17157 19.8284C2.92172 20.5785 3.93913 21 5 21H17C18.0609 21 19.0783 20.5785 19.8284 19.8284C20.5786 19.0782 21 18.0609 21 17V9" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M22.3098 3.16996L17.2098 8.26005C16.7098 8.77005 15.2098 8.99996 14.8698 8.66996C14.5298 8.33996 14.7598 6.82999 15.2698 6.31999L20.3599 1.23002C20.6171 0.964804 20.9692 0.812673 21.3386 0.807047C21.7081 0.80142 22.0646 0.942731 22.3298 1.19999C22.5951 1.45725 22.7472 1.8093 22.7529 2.17875C22.7585 2.5482 22.6171 2.90475 22.3599 3.16996H22.3098Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>

                </button>

                <div className="text-white mt-1 text-center font-normal text-lg">{userDetail.name}</div>
                <p className='text-white text-center mt-2 font-light text-sm'>
                  {userDetail.email}
                </p>
              </div>

            )}


            <div className='h-0.5 w-full bg-gray-200'></div>
            <div id="menu" className="flex flex-col space-y-8">
              {/* menu */}
              <Link href="/dashboard">
                <a className="text-sm font-medium text-white py-2 px-2 hover:bg-cfit_purple hover:bg-sky-600 hover:text-base rounded-md transition duration-150 ease-in-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current inline-block" viewBox="0 0 512 512"><rect fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" x="48" y="80" width="416" height="384" rx="48" /><circle cx="296" cy="232" r="24" /><circle cx="376" cy="232" r="24" /><circle cx="296" cy="312" r="24" /><circle cx="376" cy="312" r="24" /><circle cx="136" cy="312" r="24" /><circle cx="216" cy="312" r="24" /><circle cx="136" cy="392" r="24" /><circle cx="216" cy="392" r="24" /><circle cx="296" cy="392" r="24" /><path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" d="M128 48v32M384 48v32" /><path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" d="M464 160H48" /></svg>
                  <span className="ml-3">Agendamentos</span>
                </a>
              </Link>
              {/* <Link href="/#">
                <a className="text-sm font-medium text-white py-2 px-2 hover:bg-cfit_purple hover:text-white hover:bg-sky-600 hover:text-base rounded-md transition duration-150 ease-in-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current inline-block" viewBox="0 0 512 512"><rect x="48" y="80" width="416" height="384" rx="48" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M128 48v32M384 48v32M464 160H48M304 260l43.42-32H352v168M191.87 306.63c9.11 0 25.79-4.28 36.72-15.47a37.9 37.9 0 0011.13-27.26c0-26.12-22.59-39.9-47.89-39.9-21.4 0-33.52 11.61-37.85 18.93M149 374.16c4.88 8.27 19.71 25.84 43.88 25.84 28.59 0 52.12-15.94 52.12-43.82 0-12.62-3.66-24-11.58-32.07-12.36-12.64-31.25-17.48-41.55-17.48" /></svg>

                  <span className="ml-3">Calendario</span>
                </a>
              </Link> */}
              <Link href="/servico">
                <a className="text-sm font-medium text-white py-2 px-2 hover:bg-cfit_purple hover:text-white hover:bg-sky-600 hover:text-base rounded-md transition duration-150 ease-in-out">

                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current inline-block" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M364.13 125.25L87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zM420.69 68.69l-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 16 0 00-22.62 0z" /></svg>
                  <span className="ml-3">Gerenciar Serviços</span>
                </a>
              </Link>

              <Link href="/client">
                <a className="text-sm font-medium text-white py-2 px-2 hover:bg-cfit_purple hover:text-white hover:bg-sky-600 hover:text-base rounded-md transition duration-150 ease-in-out">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current inline-block" viewBox="0 0 512 512"><path d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><path d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" /><path d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><path d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" /></svg>
                  <span className="ml-3">Clientes</span>
                </a>
              </Link>
              <Link href="/employeer">
                <a className="text-sm font-medium text-white py-2 px-2 hover:bg-cfit_purple hover:text-white hover:bg-sky-600 hover:text-base rounded-md transition duration-150 ease-in-out flex">
                  <svg  viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" className="si-glyph si-glyph-person-man w-6 h-6">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g transform="translate(1.000000, 1.000000)" fill="#fff">
                        <path d="M8.918,12.338 L7.975,13.958 L7.033,12.338 L7.521,9.042 L8.429,9.042 L8.918,12.338 Z" className="si-glyph-fill">

                        </path>
                        <path d="M5.534,14 C3.833,11.746 4.378,8.224 4.21,8 C0.123,7.999 0,14 0,14 L5.534,14 Z" className="si-glyph-fill">

                        </path>
                        <path d="M10.5819092,14 L16,14 C15.999,14 16,7.96850586 12.319458,7.96850586 C12.156458,8.18850586 12.2849092,11.728 10.5819092,14 Z" className="si-glyph-fill">

                        </path>
                        <path d="M8.00799561,7.94122333 C6.38999561,7.94122333 5,4.732 5,3.064 C5,1.394 6.38899561,0.0581054693 8.00799561,0.0581054693 C9.62799561,0.0581054693 11.0015869,1.39500007 11.0015869,3.06400007 C11.0015869,4.73200007 9.62799561,7.94122333 8.00799561,7.94122333 Z" className="si-glyph-fill">

                        </path>
                      </g>
                    </g>
                  </svg>
                  <span className="ml-3">Colaboradores</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};


export default Menu;
