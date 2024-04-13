'use client'
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Toaster, toast } from 'sonner'
import { ClienteContext } from "../context/ClienteContext"
import { useRouter } from "next/navigation"
import "./login.css"
import Link from "next/link"

interface Inputs {
  email: string
  senha: string
}

function Login() {

  const { register, handleSubmit } = useForm<Inputs>()
  const { mudaLogin } = useContext(ClienteContext)
  const router = useRouter()
  const [manterConectado, setManterConectado] = useState(false);

  async function enviaDados(data: Inputs) {
//    console.log(data)
    const response = await fetch("http://localhost:3004/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({...data})
    })
    const dados = await response.json()
    if (Number(dados.id) > 0) {
//      alert("Ok! Senha Correta")
//      toast.success("Ok! Senha Correta")
    if (manterConectado) {
      localStorage.setItem('usuarioConectado', JSON.stringify({id: Number(dados.id), nome: dados.nome}));
    }
      mudaLogin({id: Number(dados.id), nome: dados.nome})
      router.push("/inicial")
    } else {
//      alert("Erro! Login/Senha Incorreta")
      toast.error("Erro! Login/Senha Incorreta")
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 area">
      <form className="max-w-sm mx-auto" 
        onSubmit={handleSubmit(enviaDados)}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail:</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required 
            {...register("email")} />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha:</label>
          <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
            {...register("senha")} />
        </div>
        <div className="mb-5">
          <input type="checkbox" id="manterConectado" onChange={(e) => setManterConectado(e.target.checked)} />
          <label htmlFor="manterConectado" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">Manter-me conectado</label>
        </div>
        <p className="text-center mt-5">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Entrar</button>
        </p>
        <p className="mt-5">
          Não possui uma conta?  <Link href="./cadastro" className="text-blue-600">Cadastrar-se</Link>
        </p>
      </form>
      <Toaster position="top-right" richColors />
    </div>
  )
}

export default Login