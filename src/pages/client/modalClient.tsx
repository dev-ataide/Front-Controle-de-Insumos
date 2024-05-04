import Modal from 'react-modal';
import { History } from ".";
import { Head, Main } from 'next/document';
import { format, isToday, isSameDay } from 'date-fns';
interface ModalProps {
  isOpen: boolean;
  isClose: () => void;
  History: History[]
}

export default function modalClient({ isOpen, isClose, History }: ModalProps) {

  const styleModal = {
    content: {
      border: 'none', // Remover borda
      overflow: 'hidden', // Ocultar barra de rolagem
    }
  }
  const lastService = History.length[-1];
  let lastservice = ''
  History.forEach(last => {
    lastservice = last.service.name
  })

  const allAppointment = History.length;
  let totalGasto = 0;

  History.forEach(item => {
    totalGasto += parseFloat(item.service.price);
  });

  const startAppointment = History[0];

  return (
    <Modal isOpen={isOpen} isClose={isClose} style={styleModal} >

      <div className='shadow-2xl'>
        <div className="absolute w-[100%] top-0 right-0">
          <div className="container mx-auto py-10 flex justify-center h-screen">
            <div className="w-12/12 pl-4 h-full flex flex-col">

              {History.length > 0 ? (
                <div className="bg-white text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300">
                  <div className='flex-row-reverse'>
                    <button onClick={isClose} className='right-0'>
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="0" height="0" fill="white"></rect> <path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                    <div className="h-[100%] w-full bg-gray-50 flex justify-center items-center mb-10 pb-[10%]">

                      <div className="h-56 w-52 absolute flex justify-center items-center mb-40">
                        <img
                          className="object-cover h-20 w-20 rounded-full"
                          src={`http://localhost:3333/files/${History[0].client.photo}`} alt="profil" />
                      </div>

                      <div className="h-36 mx-4 w-5/6 bg-blue-400 rounded-3xl shadow-md sm:w-80 sm:mx-0"
                      >


                        <div className='bg-blue-400'>
                          <div className="bg-white h-[200px] w-full rounded-sm flex flex-col justify-around items-center mt-2">

                            <div className="w-full h-3/5 flex flex-col justify-center items-center">
                              <h1 className="text-gray-700 font-bold">{History[0].client.name}</h1>
                              <h1 className="text-gray-500 text-sm">{History[0].client.contact}</h1>
                              <h1 className="text-gray-500 text-sm">{History[0].client.email}</h1>

                            </div>
                            <div className="w-full h-2/5 flex flex-col justify-center items-start px-5">
                              <h1 className="text-gray-700 text-xs font-bold">Observação sobre o cliente.</h1>
                              <span>{History[0].client.observer}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300">
                  <div className='flex-row-reverse'>
                    <button onClick={isClose} className='right-0'>
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="0" height="0" fill="white"></rect> <path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                    <div className="h-[100%] w-full bg-gray-50 flex justify-center items-center mb-10 pb-[10%]">



                      <div className="w-full h-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-gray-700 font-bold">Realize algum agendamento</h1>
                        <h1 className="text-gray-500 text-sm">Com este cliente</h1>
                        <h1 className="text-gray-500 text-sm">Para obter detalhes</h1>

                      </div>

                    </div>
                  </div>
                </div>
              )}


              <div className="w-full h-full overflow-auto align-middle justify-center items-center shadow bg-white" id="scroll">
                {History.length > 0 ? (
                  <>
                    <div className="bg-white h-3/3 w-full rounded-3xl flex flex-col justify-around items-center p-5">
                      <div className="w-full h-2/2 flex justify-between items-center px-3 pt-2 ">
                        <div className="flex flex-col justify-center items-center gap-2">
                          <h1 className="text-gray-500 text-xs">Agendamentos Totais :</h1>
                          <h1 className="text-aftb_greenbuton text-sm">{allAppointment}</h1>
                          <h1 className="text-gray-500 text-xs">Primeiro agendamento :</h1>
                          <span style={{ display: 'inline-block', marginRight: '10px', color: 'blue' }}>{format(new Date(startAppointment.date), 'dd-MM-yyyy')}</span>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2">
                          <h1 className="text-gray-500 text-xs">Valor Gasto ao total :</h1>
                          <h1 className="text-aftb_greenbuton text-sm">R$ {totalGasto}</h1>
                          <h1 className="text-gray-500 text-xs">Último serviço :</h1>
                          <h1 className="text-gray-600 text-sm">{lastservice}</h1>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-600'>
                      <h3 className='text-white ml-5'>Historico :</h3>
                    </div>
                    <table className="w-full">
                      {/* Adicione aqui o restante do seu conteúdo */}
                    </table>
                  </>
                ) : (
                  <p></p>
                )}


                <table className="w-full relative">
                  {History.length > 0 ? (
                    <>
                      <tbody className="">
                        {History.map((history) =>
                          <tr className="relative transform scale-100 text-xs py-1 border-b-2 border-blue-100 cursor-default bg-blue-500 bg-opacity-25">
                            <td className="pl-5 pr-3 whitespace-no-wrap w-[1/5]">
                              <div className="text-gray-400">
                                <h1>Data :</h1>
                              </div>
                              <div>
                                <span style={{ display: 'inline-block', marginRight: '10px', color: 'blue' }}>{format(new Date(history.date), 'dd-MM-yyyy')}</span>
                                <span style={{ display: 'inline-block', color: 'blue' }}>{format(new Date(history.date), 'HH:mm')}</span>

                              </div>
                            </td>

                            <td className="px-2 py-2 whitespace-no-wrap w-[5/5]">
                              <div></div>
                              <div className="leading-5 text-gray-500 font-medium">{history.service.name} </div>
                              <span>R$ {history.service.price}</span>
                              <div className="leading-5 text-gray-900">  Agendamento :
                                <a className=" hover:underline">

                                  {history.payment ? (
                                    <h1 className=' text-green-500'>Confirmado</h1>
                                  ) : (
                                    <h2 className='text-red-600'>Pendente</h2>
                                  )}
                                </a></div>
                            </td>

                          </tr>
                        )}

                      </tbody>
                    </>
                  ) : (
                    <p >Nenhum histórico disponível</p>
                  )}



                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>

  );
}