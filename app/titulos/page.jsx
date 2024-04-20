'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { ClienteContext } from "../context/ClienteContext"

function MinhaPagina() {
  const { idClienteLogado } = useContext(ClienteContext)
  const itemClicadoJSON = localStorage.getItem('itemClicado');
  const itemClicado = JSON.parse(itemClicadoJSON);

  const [dados, setDados] = useState([])

  useEffect(() => {
    async function recebeDados() {

      const data = {
        usuario_id: idClienteLogado,
        categoria: itemClicado.categoria
      };

      console.log(JSON.stringify(data))

      try {
        const response = await fetch("http://localhost:3004/itensuser2", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data)
        });

        const dados = await response.json();
        setDados(dados)
        console.log(dados);
      } catch (error) {
        console.error("Erro ao receber dados:", error);
      }
    }
    recebeDados()

  }, [])

  const listar = dados.map((item) =>(
    <div>
      <h1>{item.titulo}</h1>
    </div>
  ))

  return (
    <div>
      {listar}
      {itemClicado.categoria} - {idClienteLogado}
    </div>
  );
}

export default MinhaPagina;