import { useState } from 'react';
import Link from 'next/link';

const Menu = () => {
  const [menu, setMenu] = useState(true);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      {menu ? (
        <div className="font-poppins antialiased bg-white bg-gradient-to-bl h-screen border-r-4 hidden sm:block relative">
          <div className='flex align-middle items-center justify-center py-5 gap-3'>
            <img
              src="/logolafepe.png"
              alt="agendahub"
            />
            <h1 className="text-1xl font-bold text-center text-black">LAFEPE</h1>
          </div>
          <div className='h-1 w-full bg-gray-200'></div>
          <div className='flex align-middle justify-end z-20' style={{ position: 'relative', right: '-22px', bottom: '-50' }}>
            <button onClick={handleMenu} className='flex bg-red-500 w-10 h-10 align-middle justify-center items-center rounded-3xl' >
              <svg fill="#ffffff" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path d="M8 10.18 2.39 4.52l-.89.87 5.59 5.71a1.18 1.18 0 0 0 .86.39 1.13 1.13 0 0 0 .85-.39l5.7-5.7-.88-.89z" />
                </g>
              </svg>
            </button>
          </div>

          <nav className="mt-0">
            <div>
              <Link href="/">
                <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center px-4 pb-4 mb-2 transition-colors duration-200 justify-start hover:text-aftb_orange border-r-4 dark:border-transparent dark:from-gray-700 dark:to-gray-800 hover:border-aftb_orange">
                  <span className="text-left">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 16H6.66667V28H4V16ZM25.3333 10.6667H28V28H25.3333V10.6667ZM14.6667 2.66666H17.3333V28H14.6667V2.66666Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">
                    Dashboard
                  </span>
                </a>
              </Link>

              <Link href="/csv">
                <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-aftb_orange border-r-4 dark:border-transparent dark:from-gray-700 dark:to-gray-800 hover:border-aftb_orange">
                  <span className="text-left">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">
                    CSV
                  </span>
                </a>
              </Link>
              
              {/* Adicione outros links aqui usando o componente Link */}
              
            </div>
          </nav>
        </div>
      ) : (
        <div className="font-poppins antialiased bg-white bg-gradient-to-bl h-screen border-r-4 hidden sm:block relative">
          <div className='flex align-middle items-center justify-center py-5' >
            <img className='w-10 h-10'
              src="/logolafepe.png"
              alt="agendahub"
            />
          </div>
          <div className='h-1 w-full bg-gray-200'></div>
          <div className='flex align-middle justify-end z-20' style={{ position: 'relative', right: '-22px' }}>
            <button onClick={handleMenu} className='flex bg-red-500 w-10 h-10 align-middle justify-center items-center rounded-3xl' >
              <svg fill="#ffffff" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" transform="rotate(270)" stroke="#ffffff">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <path d="M8 10.18 2.39 4.52l-.89.87 5.59 5.71a1.18 1.18 0 0 0 .86.39 1.13 1.13 0 0 0 .85-.39l5.7-5.7-.88-.89z" />
                </g>
              </svg>
            </button>
          </div>

          <nav className="mt-0">
            <div>
              <Link href="/">
                <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center px-4 pb-4 mb-2 transition-colors duration-200 justify-start hover:text-aftb_orange border-r-4 dark:border-transparent dark:from-gray-700 dark:to-gray-800 hover:border-aftb_orange">
                  <span className="text-left">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 16H6.66667V28H4V16ZM25.3333 10.6667H28V28H25.3333V10.6667ZM14.6667 2.66666H17.3333V28H14.6667V2.66666Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </a>
              </Link>

              <Link href="/csv">
                <a className="w-full font-thin uppercase text-gray-500 dark:text-aftb_blue_active flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-aftb_orange border-r-4 dark:border-transparent dark:from-gray-700 dark:to-gray-800 hover:border-aftb_orange">
                  <span className="text-left">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </a>
              </Link>
              
              {/* Adicione outros links aqui usando o componente Link */}
              
            </div>
          </nav>
        </div>
      )}

    </>

  );
};

export default Menu;
