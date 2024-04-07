import { useState, FormEvent, useContext } from 'react'

import Head from 'next/head'
import styles from '../../../styles/css'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

import Link from 'next/link';
import Nav from '../../components/landing_page/navbar/nav';
import Footer from '../../components/landing_page/footer/footer'

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false);

  const [btnRadio, setBtnRadio] = useState(12)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast.error("Preencha todos os campos")
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false);

  }

  const typeBtnRadio1 = () => {
    console.log("Botão Anualmente clicado");
    if (btnRadio !== 1) {
      setBtnRadio(1);
    }
  };

  const typeBtnRadio12 = () => {
    console.log("Botão Mensalmente clicado");
    if (btnRadio !== 12) {
      setBtnRadio(12);
    }
  };


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
              <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  {/* <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-400">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-blue-500 sm:text-5xl">Pricing plans for teams of all sizes</p>
                  </div>
                  <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-cyan-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p>
                 */}
                  <div className="mt-16 flex justify-center">
                    {btnRadio == 12 ? (
                      <fieldset className="bg-black flex gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset">
                        <legend className="sr-only">Payment frequency</legend>
                        <label className="cursor-pointer rounded-full px-2.5 py-1 bg-aftb_orange">
                          <input type="radio" name="frequency" value="monthly" className="sr-only" />
                          <button onClick={typeBtnRadio12} className='text-white'>Mensalmente</button>
                        </label>
                        <label className="cursor-pointer rounded-full px-2.5 py-1">
                          <input type="radio" name="frequency" value="annually" className="sr-only" />
                          <button onClick={typeBtnRadio1} className='text-white'>Anualmente</button>
                        </label>
                      </fieldset>
                    ) : (
                      <fieldset className="bg-black flex gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset">
                        <legend className="sr-only">Payment frequency</legend>
                        <label className="cursor-pointer rounded-full px-2.5 py-1 bg-black">
                          <input type="radio" name="frequency" value="monthly" className="sr-only" />
                          <button onClick={typeBtnRadio12} className='text-white'>Mensalmente</button>
                        </label>
                        <label className="cursor-pointer rounded-full px-2.5 py-1 bg-aftb_orange">
                          <input type="radio" name="frequency" value="annually" className="sr-only" />
                          <button onClick={typeBtnRadio1} className='text-white'>Anualmente</button>
                        </label>
                      </fieldset>
                    )}

                    {/* cards de pagamento */}

                  </div>
                  {btnRadio == 12 ? (
                    //Mensal selecionado
                    <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
                      <div className="rounded-3xl p-8 ring-1 xl:p-10 ring-gray-400">
                        <h3 id="tier-freelancer" className="text-lg font-semibold leading-8 text-black">Teste o plano Básico</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-500">Use gratuitamente por 15 dias. <br /> Após este periodo você deve escolher um plano.</p>
                        <p className="mt-6 flex items-baseline gap-x-1">
                          <span className="text-4xl font-bold tracking-tight text-black">R$29,90</span>
                          <span className="text-sm font-semibold leading-6 text-gray-500">/Mês</span>
                        </p>
                        <a href="#" aria-describedby="tier-freelancer" className="mt-6 block rounded-2xl py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline text-black focus-visible:outline-2 focus-visible:outline-offset-2 bg-white hover:text-white shadow-sm border-aftb_orange hover:bg-red-500 border-col focus-visible:outline-orange-600 ring-1 ring-aftb_orange hover:ring-none">Começar gratuitamente</a>
                        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-black">
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Clientes
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Serviços
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Colaboradores
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Realize os agendamentos
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>
                            Acompanhe o faturamento e os serviços mais prestados
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>
                            Processo de confirmação automatizado diretamente com o cliente via e-mail.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>

                            Processo de confirmação automatizado diretamente com o cliente via WhatsApp.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>

                            WebSite da sua empresa para auto agendamento por parte dos clientes.

                          </li>
                        </ul>
                      </div>
                      <div className="rounded-3xl p-8 ring-1 xl:p-10 ring-gray-400">
                        <h3 id="tier-freelancer" className="text-lg font-semibold leading-8 text-black">Intermediario</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-500">Plano perfeito para <br />pequenas e médias empresas.</p>
                        <p className="mt-6 flex items-baseline gap-x-1">
                          <span className="text-4xl font-bold tracking-tight text-black">R$69,90</span>
                          <span className="text-sm font-semibold leading-6 text-gray-500">/Mês</span>
                        </p>
                        <a href="#" aria-describedby="tier-freelancer" className="mt-6 block rounded-2xl py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline text-black focus-visible:outline-2 focus-visible:outline-offset-2 bg-white hover:text-white shadow-sm border-aftb_orange hover:bg-red-500 border-col focus-visible:outline-orange-600 ring-1 ring-aftb_orange hover:ring-none">
                          Assinar o plano Intermediario
                        </a>
                        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-black">
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Clientes
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Serviços
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Colaboradores
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Realize os agendamentos
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Acompanhe o faturamento e os serviços mais prestados
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Processo de confirmação automatizado diretamente com o cliente via e-mail.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>

                            Processo de confirmação automatizado diretamente com o cliente via WhatsApp.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>

                            WebSite da sua empresa para auto agendamento por parte dos clientes.

                          </li>
                        </ul>
                      </div>
                      <div className="rounded-3xl p-8 ring-1 xl:p-10 bg-gray-900 ring-gray-900">
                        <h3 id="tier-enterprise" className="text-lg font-semibold leading-8 text-white">Avançado</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-300">Além de acesso completo às funcionalidades, você também terá suporte especializado <br /> 24 horas por dia, 7 dias por semana.</p>
                        <p className="mt-6 flex items-baseline gap-x-1">
                          <span className="text-4xl font-bold tracking-tight text-white">R$149,90</span>
                          <span className="text-sm font-semibold leading-6 text-white">/Mês</span>
                        </p>
                        <a href="#" aria-describedby="tier-enterprise" className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white">Assinar o plano Avançado</a>
                        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-white">
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Clientes
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Serviços
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Colaboradores
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Realize os agendamentos
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Acompanhe o faturamento e os serviços mais prestados
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Processo de confirmação automatizado diretamente com o cliente via e-mail.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>

                            Processo de confirmação automatizado diretamente com o cliente via WhatsApp.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>

                            WebSite da sua empresa para auto agendamento por parte dos clientes.

                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    //Anualmente selecionado
                    <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                      <div className="rounded-3xl p-8 ring-1 xl:p-10 ring-gray-400">
                        <h3 id="tier-freelancer" className="text-lg font-semibold leading-8 text-black">Básico</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-500">Use gratuitamente por 15 dias. <br /> Após este periodo você deve escolher outro plano.</p>
                        <p className="mt-6 flex items-baseline gap-x-1">
                          <span className="text-4xl font-bold tracking-tight text-black">R$19,90</span>
                          <span className="text-sm font-semibold leading-6 text-gray-500">/Mês</span>
                        </p>
                        <span className="text-sm font-semibold leading-6 text-blue-300">Economize R$120 ao ano. </span>

                        <a href="#" aria-describedby="tier-freelancer" className="mt-6 block rounded-2xl py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline text-black focus-visible:outline-2 focus-visible:outline-offset-2 bg-white hover:text-white shadow-sm border-aftb_orange hover:bg-red-500 border-col focus-visible:outline-orange-600 ring-1 ring-aftb_orange hover:ring-none">Começar gratuitamente</a>
                        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-black">
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Clientes
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Serviços
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Colaboradores
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Realize os agendamentos
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>
                            Acompanhe o faturamento e os serviços mais prestados
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>
                            Processo de confirmação automatizado diretamente com o cliente via e-mail.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>

                            Processo de confirmação automatizado diretamente com o cliente via WhatsApp.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>

                            WebSite da sua empresa para auto agendamento por parte dos clientes.

                          </li>
                        </ul>
                      </div>
                      <div className="rounded-3xl p-8 ring-1 xl:p-10 ring-gray-400">
                        <h3 id="tier-freelancer" className="text-lg font-semibold leading-8 text-black">Intermediario</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-500">Use gratuitamente por 15 dias. <br /> Após este periodo você deve escolher outro plano.</p>
                        <p className="mt-6 flex items-baseline gap-x-1">
                          <span className="text-4xl font-bold tracking-tight text-black">R$49,90</span>
                          <span className="text-sm font-semibold leading-6 text-gray-500">/Mês</span>

                        </p>
                        <span className="text-sm font-semibold leading-6 text-blue-300">Economize R$240 ao ano. </span>

                        <a href="#" aria-describedby="tier-freelancer" className="mt-6 block rounded-2xl py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline text-black focus-visible:outline-2 focus-visible:outline-offset-2 bg-white hover:text-white shadow-sm border-aftb_orange hover:bg-red-500 border-col focus-visible:outline-orange-600 ring-1 ring-aftb_orange hover:ring-none">
                          Assinar o plano Intermediario
                        </a>
                        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-black">
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Clientes
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Serviços
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Colaboradores
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Realize os agendamentos
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Acompanhe o faturamento e os serviços mais prestados
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Processo de confirmação automatizado diretamente com o cliente via e-mail.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>

                            Processo de confirmação automatizado diretamente com o cliente via WhatsApp.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <g id="Menu / Close_SM">
                                <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#ff0000" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                              </g>
                            </svg>

                            WebSite da sua empresa para auto agendamento por parte dos clientes.

                          </li>
                        </ul>
                      </div>
                      <div className="rounded-3xl p-8 ring-1 xl:p-10 bg-gray-900 ring-gray-900">
                        <h3 id="tier-enterprise" className="text-lg font-semibold leading-8 text-white">Avançado</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-300">Além de acesso completo às funcionalidades, você também terá suporte especializado <br /> 24 horas por dia, 7 dias por semana.</p>
                        <p className="mt-6 flex items-baseline gap-x-1">
                          <span className="text-4xl font-bold tracking-tight text-white">R$99,90</span>
                          <span className="text-sm font-semibold leading-6 text-white">/Mês</span>
                        </p>
                        <span className="text-sm font-semibold leading-6 text-blue-300">Economize R$600 ao ano. </span>

                        <a href="#" aria-describedby="tier-enterprise" className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white">Assinar o plano Avançado</a>
                        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-white">
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Clientes
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Serviços
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Registre Colaboradores
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Realize os agendamentos
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Acompanhe o faturamento e os serviços mais prestados
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            Processo de confirmação automatizado diretamente com o cliente via e-mail.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>

                            Processo de confirmação automatizado diretamente com o cliente via WhatsApp.
                          </li>
                          <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>

                            WebSite da sua empresa para auto agendamento por parte dos clientes.

                          </li>
                        </ul>
                      </div>
                    </div>)}



                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
      <Footer />
    </>
  )
}

{/* <form onSubmit={handleSignUp}>
<Input
  placeholder="Digite seu nome"
  type="text"
  value={name}
  onChange={ (e) => setName(e.target.value) }
/>

<Input
  placeholder="Digite seu email"
  type="text"
  value={email}
  onChange={ (e) => setEmail(e.target.value) }
/>

<Input
  placeholder="Sua senha"
  type="password"
  value={password}
  onChange={ (e) => setPassword(e.target.value) }
/>

<Button
  type="submit"
  loading={loading}
>
  Cadastrar
</Button>
</form> */}
