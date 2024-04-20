'use client'
import Link from "next/link"
import { useContext } from "react"
import { RiUserShared2Line } from "react-icons/ri"
import { BiLogOutCircle } from "react-icons/bi"
import { ClienteContext } from "../context/ClienteContext"
import Swal from "sweetalert2"
import { FaUserCircle } from "react-icons/fa"

function Cabecario() {

    const { idClienteLogado, nomeClienteLogado, mudaLogin } = useContext(ClienteContext)

    function logout() {
        Swal.fire({
        title: "Confirma saída do sistema?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        }).then((result: { isConfirmed: any }) => {
        if (result.isConfirmed) {
            mudaLogin({ id: null, nome: ""})
        }
        });
    }

    return (
        <nav className="border-orange-200 bg-orange-500 dark:bg-orange-800 dark:border-orange-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="./logo.png" className="h-12" alt=" Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
            </Link>
            <div className="block rounded-lg  md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                <li>
                    <button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="text-white block focus:ring-4 focus:outline-none font-medium rounded-lg text-4xl px-5 py-2.5 text-center items-center" type="button">
                        <FaUserCircle />
                    </button>

                    <div id="dropdownDelay" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                            <li>
                            {idClienteLogado ?
                                    <div className="text-center">
                                    {nomeClienteLogado}
                                    </div>
                                    :
                                     <Link href="./login" className="text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Entrar</Link>
                                }
                            </li>
                                <li>
                                {idClienteLogado ?
                                    <div className="text-center">
                                    <span className="text-red-600 " onClick={logout} 
                                            style={{cursor: 'pointer'}}> sair</span>  
                                    </div>
                                    :
                                    <Link href="./cadastro" className="text-center block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cadastro</Link>
                                }
                                </li>
                        </ul>
                    </div>

                </li>
            </ul>
            </div>
        </div>
        </nav>

    )
}
export default Cabecario