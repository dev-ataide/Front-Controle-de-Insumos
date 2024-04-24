import { useContext, FormEvent, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { toast } from 'react-toastify'

import { AuthContext } from '../../contexts/AuthContext'

import Link from 'next/link';

import { canSSRGuest } from '../../utils/canSSRGuest'
import Nav from '../../components/landing_page/navbar/nav';
import Footer from '../../components/landing_page/footer/footer';

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.error("Preencha os campos")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false);
  }

  return (
    <>

      <Head>
        <title>AgendaMAX - Faça seu login</title>
      </Head>
      <div className={`${styles.flexStart} mx-[14%] my-[14%] m-10 z-[1]  overflow-hidden`}>
        <div className={`${styles.boxWidth}overflow-hidden`}>
          <main className='h-screen overflow-hidden'>
            <div className=" flex overflow-hidden">
              <div className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center overflow-hidden">
                <img
                  src="/teamwork.jpg "
                  alt="agendahub"
                />
                <div
                  className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
                >

                </div>
                <div className="w-full mx-auto px-20 flex-col items-center space-y-6 overflow-hidden">
                  <div className="flex justify-center lg:justify-start mt-6">
                    <a href="#" className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Get Started</a>
                  </div>
                </div>
              </div>
              <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
                <div className="w-full px-8 md:px-32 lg:px-24">
                  <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={handleLogin}>
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Seja bem-vindo!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-8">Efetue login para acessar a plataforma.</p>
                    <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <input id="email" className=" pl-2 w-full outline-none border-none" placeholder="Digite seu email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <input className="pl-2 w-full outline-none border-none" placeholder="Sua senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    </div>
                    <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-aftb_orange hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2" >Login</button>
                    <div className="flex justify-between mt-4">
                      <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Esqueceu sua senha ?</span>

                      <a href="#" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Você ainda não tem senha ?</a>
                    </div>

                  </form>
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {

  return {
    props: {}
  }
})
{/* <div classNameNameName={styles.containerCenter}>
<Image src={logoImg} alt="Logo Sujeito Pizzaria" />

<div classNameNameName={styles.login}>
  <form onSubmit={handleLogin}>

    <Button
      type="submit"
      loading={loading}
    >
      Acessar
    </Button>
  </form>

  <Link href="/signin">
     <a classNameNameName={styles.text}>Nao possui uma conta? Cadastre-se</a>
  </Link>

</div>
</div> */}