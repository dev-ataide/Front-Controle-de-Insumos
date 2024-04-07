import { useState, FormEvent, useContext } from 'react'

import Head from 'next/head'
import styles from '../../../styles/css'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

import Link from 'next/link';
import Nav from '../../components/landing_page/navbar/nav';
import Footer from '../../components/landing_page/footer/footer'

export default function Funcionalidades() {

 

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <Nav />

      <main>
        <div className={`${styles.flexStart} mx-[14%] mb-10 z-[1]`}>
          <div className={`${styles.boxWidth}`}>
            {/* Section 1 */}
            {/* <div className="flex-col items-center align-middle justify-center mt-3.5 bg-aftb_orange p-24 rounded-[55px]">
              <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }} className="text-6xl align-middle text-center font-semibold text-white leading-tight">
                Preços simples<br />  que impulsionam seu negócio
              </h1>
              <h2 className="text-xl align-middle text-center font-sans  text-gray-200 mt-9 leading-tight">Comece com uma interface de agendamento impressionante. <br /> Mantenha-se organizado sem prejudicar seu bolso.</h2>

            </div> */}
            {/* Section 2 */}
      <div>
        oi
      </div>
          </div>
        </div>
      </main >
      <Footer />
    </>
  )
}
