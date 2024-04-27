'use client'
import { ReactNode, createContext, useEffect, useState } from "react"

interface ClienteProps {
  id: number | null
  nome: string
}

type ClienteContextData = {
  idClienteLogado: number | null
  nomeClienteLogado: string
  mudaLogin: ({ id, nome }: ClienteProps) => void
}

// cria um contexto
export const ClienteContext = createContext({} as ClienteContextData)

function ClienteProvider({ children }: { children: ReactNode } ) {
  const [idClienteLogado, setIdClienteLogado] = useState<number|null>(null)
  const [nomeClienteLogado, setNomeClienteLogado] = useState<string>("")

  // function mudaLogin({id, nome}: ClienteProps) {
  //   setIdClienteLogado(id)
  //   setNomeClienteLogado(nome)
  // }

  useEffect(() => {
    // Verifica se há informações de autenticação no localStorage ao inicializar o contexto
    const storedId = localStorage.getItem("idClienteLogado");
    const storedNome = localStorage.getItem("nomeClienteLogado");

    if (storedId && storedNome) {
      setIdClienteLogado(parseInt(storedId));
      setNomeClienteLogado(storedNome);
    }
  }, []);

  function mudaLogin({ id, nome }: ClienteProps) {
    setIdClienteLogado(id);
    setNomeClienteLogado(nome);

    // Armazena as informações de autenticação no localStorage ao fazer login
    localStorage.setItem("idClienteLogado", id?.toString() || "");
    localStorage.setItem("nomeClienteLogado", nome);
  }

  return (
    <ClienteContext.Provider value={{idClienteLogado, nomeClienteLogado, mudaLogin}}>
      {children}
    </ClienteContext.Provider>
  )

}

export default ClienteProvider