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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="geral">
      <div className="container">
        <header>
              <img src="/cadeado.png" alt="Logo" className="logo" />
          </header>
        <div className="login-container">
            <img src="VeCtor.png" alt="Login Icon" className="login-icon" />
            <div className="login-box">
                <form onSubmit={handleSubmit(enviaDados)}>
                    <input type="email" id="email" placeholder="Digite seu email" required {...register("email")} />
                    <div className="password-input-container">
                      <input className="senha" type={showPassword ? 'text' : 'password'} 
                      id="password" 
                      placeholder="Digite sua senha" 
                      required 
                      {...register("senha")} />
                      <button className="password-toggle-button" type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </div>
                    <div className="checkbox-container">
                        <input type="checkbox" id="remember" name="remember" onChange={(e) => setManterConectado(e.target.checked)} />
                        <label htmlFor="remember">Mantenha-me conectado</label>
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="options">
                    <Link href="#">Esqueci minha senha</Link>
                    <Link href="/cadastro">Cadastrar-se</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login