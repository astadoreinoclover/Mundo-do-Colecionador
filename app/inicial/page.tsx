'use client'
import Link from "next/link"
import "./inicial.css"
import { useContext, useEffect, useState } from 'react';
import { ClienteContext } from "../context/ClienteContext"

export interface itemProps {
  item: any;
  categoria: string
}

function Inicial() {
  const { idClienteLogado } = useContext(ClienteContext)
  const [dados, setDados] = useState([])

  useEffect(() => {
    async function recebeDados() {

      const data = {
        //usuario_id: idClienteLogado
        usuario_id: 4
      };

      console.log(JSON.stringify(data))
  
      try {
        const response = await fetch("http://localhost:3004/itensuser", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data)
        });
  
        const dados = await response.json();
        console.log(dados);
        setDados(dados)
      } catch (error) {
        console.error("Erro ao receber dados:", error);
      }
    }
    recebeDados()
  
  }, [])  
  

  const listar = dados.map((item: itemProps) => (
    <h1 className="m-5">{item.categoria}</h1>
  ));

  return (
    <div className="max-w-7xl mx-auto mt-6 area">
      <div className="cards-container bg-blue-500">
        {listar}
      </div>
      <Link href="/cadastrar-item" className="area-mais">
        Adicionar item
        <span className="mais">+</span>
      </Link>
    </div>
  )
}

export default Inicial