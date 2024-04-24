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
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isDashboard = currentPath === '/dashboard';
  const isEmployeer = currentPath === '/employeer';
  var profile = true
  return (
<div className="font-poppins antialiased bg-white bg-gradient-to-bl h-screen border-r-4 hidden sm:block">
      <div className='flex align-middle items-center justify-center py-5' >
        <img
          src="/logofake.png "
          alt="agendahub"
        />
      </div>
      <div className='h-1 w-full bg-gray-200'></div>

      <nav className="mt-6">
        <div>
          <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-aftb_orange border-r-4 dark:border-transparent dark:from-gray-700 dark:to-gray-800 hover:border-aftb_orange" href="/home">
            <span className="text-left">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </span>
            <span className="mx-4 text-sm font-normal">
              Agendamentos
            </span>
          </a>

          <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-aftb_orange border-r-4 dark:border-transparent dark:from-gray-700 dark:to-gray-800 hover:border-aftb_orange" href="/employeer">
            <span className="text-left">
              <svg width="20" height="20" fill="currentColor" className="m-auto" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z">
                </path>
              </svg>
            </span>
            <span className="mx-4 text-sm font-normal">
              Colaboradores
            </span>
          </a>
          {/* <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-aftb_orange" href="#">
            <span className="text-left">
              <svg width="20" height="20" fill="currentColor" className="m-auto" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z">
                </path>
              </svg>
            </span>
            <span className="mx-4 text-sm font-normal">
              proxima att
            </span>
          </a> */}
          <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-aftb_orange border-r-4 dark:border-transparent dark:from-gray-700 dark:to-gray-800 hover:border-aftb_orange" href="/agendamentos">
            <span className="text-left">
              <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">

                <g id="SVGRepo_bgCarrier" stroke-width="1" />

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width="0.8">

                  <path d="M12.32 8a3 3 0 0 0-2-.7H5.63A1.59 1.59 0 0 1 4 5.69a2 2 0 0 1 0-.25 1.59 1.59 0 0 1 1.63-1.33h4.62a1.59 1.59 0 0 1 1.57 1.33h1.5a3.08 3.08 0 0 0-3.07-2.83H8.67V.31H7.42v2.3H5.63a3.08 3.08 0 0 0-3.07 2.83 2.09 2.09 0 0 0 0 .25 3.07 3.07 0 0 0 3.07 3.07h4.74A1.59 1.59 0 0 1 12 10.35a1.86 1.86 0 0 1 0 .34 1.59 1.59 0 0 1-1.55 1.24h-4.7a1.59 1.59 0 0 1-1.55-1.24H2.69a3.08 3.08 0 0 0 3.06 2.73h1.67v2.27h1.25v-2.27h1.7a3.08 3.08 0 0 0 3.06-2.73v-.34A3.06 3.06 0 0 0 12.32 8z" />

                </g>

                <g id="SVGRepo_iconCarrier">

                  <path d="M12.32 8a3 3 0 0 0-2-.7H5.63A1.59 1.59 0 0 1 4 5.69a2 2 0 0 1 0-.25 1.59 1.59 0 0 1 1.63-1.33h4.62a1.59 1.59 0 0 1 1.57 1.33h1.5a3.08 3.08 0 0 0-3.07-2.83H8.67V.31H7.42v2.3H5.63a3.08 3.08 0 0 0-3.07 2.83 2.09 2.09 0 0 0 0 .25 3.07 3.07 0 0 0 3.07 3.07h4.74A1.59 1.59 0 0 1 12 10.35a1.86 1.86 0 0 1 0 .34 1.59 1.59 0 0 1-1.55 1.24h-4.7a1.59 1.59 0 0 1-1.55-1.24H2.69a3.08 3.08 0 0 0 3.06 2.73h1.67v2.27h1.25v-2.27h1.7a3.08 3.08 0 0 0 3.06-2.73v-.34A3.06 3.06 0 0 0 12.32 8z" />

                </g>

              </svg>
            </span>
            <span className="mx-4 text-sm font-normal">
              Calendario
            </span>
          </a>
          <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-aftb_orange border-r-4 dark:border-transparent dark:from-gray-700 dark:to-gray-800 hover:border-aftb_orange" href="/client">
            <span className="text-left">
              <svg width="20" height="20" fill="currentColor" className="m-auto" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z">
                </path>
              </svg>
            </span>
            <span className="mx-4 text-sm font-normal">
              Clientes
            </span>
          </a>
          <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-aftb_orange border-r-4 dark:border-transparent dark:from-gray-700 dark:to-gray-800 hover:border-aftb_orange" href="/dashboards">
            <span className="text-left">
              <svg width="20" height="20" className="m-auto" fill="currentColor" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                </path>
              </svg>
            </span>
            <span className="mx-4 text-sm font-normal">
              Gráficos
            </span>
          </a>
          <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-aftb_orange border-r-4 dark:border-transparent dark:from-gray-700 dark:to-gray-800 hover:border-aftb_orange" href="#">
            <span className="text-left">
              <svg width="20" fill="currentColor" height="20" className="h-5 w-5" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z">
                </path>
              </svg>
            </span>
            <span className="mx-4 text-sm font-normal">
              Configurações
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
};


export default Menu;
