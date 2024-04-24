import Image from "next/image";
import Nav from "../components/landing_page/navbar/nav";
import React from "react";
import styles from "../../styles/css";
import Footer from "../components/landing_page/footer/footer"
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>AgendaHub!</title>
        <main >

          <Nav />
          {/* 1 Section */}
          <div className={`${styles.flexStart} mx-[14%] z-[1]`}>

            <div className={`${styles.boxWidth}`}>
              <div className="flex items-center align-middle justify-center mt-32">
                <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }} className="text-7xl align-middle text-center font-semibold">
                  Crie, gerencie e automatize seu negócio. <br /> Soluções de gerenciamento de forma simplificada
                </h1>
              </div>
              <div className="flex flex-col items-center justify-between mt-10">
                <h2>Comece com uma interface de agendamento impressionante. Mantenha-se organizado sem prejudicar seu bolso.</h2>
                <button className="rounded-3xl bg-aftb_orange p-3 text-white mt-10">
                  Teste gratuitamente
                </button>
              </div>
            </div>
          </div>
          {/* 2 Section Empresas parceiras */}

          <div className="flex items-center align-middle justify-center px-16 mt-28">
            <div>
              <img src="/logos_parcerias_ficticias.png" alt="Logos de Parcerias Fictícias" />
            </div>
          </div>
          {/* 3 Section */}
          <div className={`${styles.flexStart} mt-32  z-[1]`}>
            <div className={`${styles.boxWidth} justify-around`} >
              <div className="flex justify-around ">
                <div className="flex-col w-[50%]  " style={{ marginLeft: '20px' }}>
                  <div className="gap-20 space-y-5">
                    <button className="px-4 py-1 bg-aftb_orange text-white rounded-2xl">
                      share
                    </button>
                    <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }} className="pb-4 text-5xl font-bold text-gray-900">
                      Controle sua empresa de forma eficiente
                    </h1>
                    <span style={{ fontFamily: 'Inter, sans-serif', }} className="pb-7 pr-10 text-base">
                      Nossa automação simplifica lembretes e confirmações, economizando tempo e reduzindo erros. Isso libera recursos para que as empresas foquem em áreas essenciais de seu negócio.
                    </span>

                    <div className="flex gap-20 " >
                      <div className="flex">
                        <img
                          src="/check.png"
                          width="30px"
                        />
                        <span className="pl-1 pt-1 text-black">100% Fácil de usar</span>

                      </div>
                      <div className="flex">
                        <img
                          src="/check.png"
                          width="30px"
                        />
                        <span className="pl-1 pt-1 text-black" >100% Seguro</span>
                      </div>

                    </div>
                    <div className="flex ">
                      <button className="flex">
                        <img
                          src="/play.png"
                          width="30px"
                        />
                        <span className="pl-1 pt-1 text-black">Assista um vídeo introdutorio</span>

                      </button>

                    </div>

                  </div>
                </div>
                <div className="flex w-[50%] justify-center items-center">
                  <img src="/print1.png" className="align-middle" />
                </div>

                <div>

                </div>
              </div>
            </div>
          </div>
          {/* 4 Section */}
          <div className={`${styles.flexStart} my-24  z-[1]`}>
            <div className={`${styles.boxWidth} justify-around`} >
              <div className="flex justify-around">
                <div className="flex w-[50%] justify-center items-center">
                  <img src="/print1.png" className="align-middle" />
                </div>
                <div className="flex-col w-[50%] " style={{ marginLeft: '20px' }}>
                  <div className="gap-20 space-y-5">
                    <button className="px-4 py-1 bg-aftb_orange text-white rounded-2xl">
                      share
                    </button>
                    <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }} className="pb-4 text-5xl font-bold text-gray-900">
                      Controle sua empresa de forma eficiente
                    </h1>
                    <span style={{ fontFamily: 'Inter, sans-serif', }} className="pb-7 pr-10 text-base">
                      Nossa automação avançada simplifica processos como lembretes de compromissos e confirmações, economizando tempo e minimizando erros. <br /> Com recursos como esses, o sistema não apenas melhora a eficiência operacional, mas também permite que as empresas se concentrem em outras áreas essenciais de seu negócio.
                    </span>
                    <div className="flex gap-20 " >
                      <div className="flex">
                        <img
                          src="/check.png"
                          width="30px"
                        />
                        <span className="pl-1 pt-1 text-black">100% Fácil de usar</span>
                      </div>
                      <div className="flex">
                        <img
                          src="/check.png"
                          width="30px"
                        />
                        <span className="pl-1 pt-1 text-black" >100% Seguro</span>
                      </div>
                    </div>
                    <div className="flex ">
                      <button className="flex">
                        <img
                          src="/play.png"
                          width="30px"
                        />
                        <span className="pl-1 pt-1 text-black">Assista um vídeo introdutorio</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          {/* 5 Section */}
          <div className="bg-aftb_orange p-10">
            <div className={`${styles.flexStart} my-5  z-[1]`}>
              <div className={`${styles.boxWidth} justify-around`} >
                <div className="text-white align-middle justify-center text-center" >
                  <h3 style={{ fontFamily: 'Inter, sans-serif', }} className="text-xl mb-5" >Monitoramento 24H</h3>
                  <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }} className="text-5xl">Veja as confirmações em tempo real!</h1>
                </div>
                <div className="mt-14">
                  <img
                    src="/notify.png"

                  />
                </div>
                <div className="flex align-middle justify-center mt-5 gap-5">
                  <div className="rounded-3xl bg-black w-full h-auto">
                    <div className="p-5" >
                      <svg width="32" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.33301 16.0002C6.33301 10.6614 10.6609 6.3335 15.9997 6.3335C21.3385 6.3335 25.6663 10.6614 25.6663 16.0002C25.6663 21.339 21.3385 25.6668 15.9997 25.6668C10.6609 25.6668 6.33301 21.339 6.33301 16.0002Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 16.1271L14.4828 18.6668L20 13.3335" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                      <h4 className="text-white text-lg">
                        Fácil confirmação dos agendamentos
                      </h4>
                      <span style={{ fontFamily: 'Inter, sans-serif', }} className="pb-7 pr-10 text-base text-gray-400">
                        Visualize quais clientes confirmaram <br /> em tempo real, pelo WhatsApp e <br /> no AgendaHub.
                      </span>
                    </div>

                  </div>
                  <div className="rounded-3xl bg-black w-full h-auto">
                    <div className="p-5" >
                      <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.667 11.3335C10.667 12.4381 9.77155 13.3335 8.66699 13.3335C7.56243 13.3335 6.66699 12.4381 6.66699 11.3335C6.66699 10.2289 7.56243 9.3335 8.66699 9.3335C9.77155 9.3335 10.667 10.2289 10.667 11.3335Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.667 20.6665C10.667 21.7709 9.77155 22.6665 8.66699 22.6665C7.56243 22.6665 6.66699 21.7709 6.66699 20.6665C6.66699 19.5621 7.56243 18.6665 8.66699 18.6665C9.77155 18.6665 10.667 19.5621 10.667 20.6665Z" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.333 11.3335H25.6663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.333 20.6665H25.6663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <h4 className="text-white  text-lg">
                        Fácil visualização dos agendamentos

                      </h4>
                      <span style={{ fontFamily: 'Inter, sans-serif', }} className="pb-7 pr-10 text-base text-gray-400">
                        Visualize todos os detalhes dos <br /> agendamentos, clientes e colaboradores <br /> responsáveis.
                      </span>
                    </div>

                  </div>
                  <div className="rounded-3xl bg-black w-full h-auto">
                    <div className="p-5" >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.9997 25.4168C22.9912 25.4168 25.4163 22.9917 25.4163 20.0002C25.4163 17.0086 22.9912 14.5835 19.9997 14.5835C17.0081 14.5835 14.583 17.0086 14.583 20.0002C14.583 22.9917 17.0081 25.4168 19.9997 25.4168Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M20.0003 32.0832C13.3269 32.0832 7.91699 26.6733 7.91699 19.9998C7.91699 13.3264 13.3269 7.9165 20.0003 7.9165C31.3545 7.9165 32.0837 15.2082 32.0837 19.9998V22.0832C32.0837 23.9242 30.5913 25.4165 28.7503 25.4165C26.9093 25.4165 25.417 23.9242 25.417 22.0832V14.5832" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                      <h4 className="text-white  text-lg">
                        Fácil comunicação com clientes
                      </h4>
                      <span style={{ fontFamily: 'Inter, sans-serif', }} className="pb-7 pr-10 text-base text-gray-400">
                        Além da comunicação automatizada, <br /> você terá acesso a uma comunicação direta <br /> e fácil com seus clientes.
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* 6 Section */}
          <div className={`${styles.flexStart} mt-24 mb-4  z-[1]`}>
            <div className={`${styles.boxWidth} justify-around`} >
              <div className="text-black align-middle justify-center text-center mb-10" >
                <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }} className="text-5xl ">
                  Acompanhe as métricas do <span className="text-aftb_orange"> seu negócio em tempo real.</span>
                </h1>
              </div>
              <div className="flex justify-around">
                <div className="flex-col w-[50%]  bg-bg_img rounded-xl" >
                  <div className="align-middle justify-center text-center pt-10">
                    <h3 className="font-semibold text-2xl text-aftb_orange">
                      Faturamento

                    </h3>
                    <h4>
                      Veja, Compare e Expanda
                    </h4>

                  </div>
                  <img src="/print1.png" className="align-middle" />
                </div>
                <div className="flex-col w-[50%]  bg-bg_img rounded-xl pt-10" style={{ marginLeft: '20px' }}>
                  <div className="align-middle justify-center text-center">
                    <h3 className="font-semibold text-2xl text-aftb_orange">
                      Engajamento dos Clientes
                    </h3>
                    <h4>
                      Conecte, Retenha e Cresça
                    </h4>


                  </div>
                  <img src="/print1.png" className="align-middle" />
                </div>
              </div>

            </div>
          </div>
          {/* 7 Section */}
          <div className={`${styles.flexStart} my-4  z-[1]`}>
            <div className={`${styles.boxWidth} justify-around`} >
              <div className="flex items-center bg-bg_img p-4 text-gray-800">
                <div className="p-4 w-full">
                  <div className="grid grid-cols-12 gap-28">
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                      <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                          <div className="text-sm text-gray-500">Parceiros</div>
                          <div className="font-bold text-lg">1259</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                      <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                          <div className="text-sm text-gray-500">Agendamentos</div>
                          <div className="font-bold text-lg">230 Mil</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                      <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                          <div className="text-sm text-gray-500">Métricas</div>
                          <div className="font-bold text-lg">19</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 md:col-span-3">
                      <div className="flex flex-row bg-white shadow-sm rounded p-4">
                        <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                          <div className="text-sm text-gray-500">alguma coisa</div>
                          <div className="font-bold text-lg">te amo</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 8 Section */}
          <div className="bg-aftb_orange p-10">
            <div className={`${styles.flexStart} my-5  z-[1]`}>
              <div className={`${styles.boxWidth} justify-around`} >
                <div className="text-white align-middle justify-center text-center" >

                  <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }} className="text-6xl">
                    Dashboard Intuitivo!
                  </h1>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', }} className="text-xl mt-5" >
                    Algum textinho clean <br />
                    porem direto e acertivo
                  </h3>
                </div>
                <div className="mt-8">
                  <img
                    src="/dashboard.png"

                  />
                </div>

              </div>
            </div>

          </div>
          {/* 9 Section */}
          <div className="bg-bg_img p-10">
            <div className={`${styles.flexStart} my-5 z-[1]`}>
              <div className={`${styles.boxWidth} justify-around`}>
                <div className="p-24">
                  <div className="text-black align-middle justify-center text-center flex items-center"> {/* Adicionado: flex justify-center items-center */}
                    <img
                      className="align-middle justify-center text-center"
                      src="/logofake.png"
                      alt="Logo"
                    />
                  </div>
                  <div className="text-black align-middle justify-center text-center mt-5">
                    <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }} className="text-4xl">
                      Invista apenas R$49,90
                    </h1>
                    <h3 style={{ fontFamily: 'Inter, sans-serif' }} className="text-xl mt-5">
                      E faça o seu négocio decolar!
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </Head></>

  );
}
