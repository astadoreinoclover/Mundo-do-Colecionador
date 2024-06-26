'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { ClienteContext } from "../context/ClienteContext"
import "./titulo.css"
import Link from "next/link"

function Titulos() {
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

  const [tituloClicado, setTituloClicado] = useState(null);

  const handleItemClick = (item) => {
    setTituloClicado(item.titulo);
  };
  localStorage.setItem('tituloClicado', JSON.stringify(tituloClicado));

  console.log(tituloClicado);

  const listar = dados.map((item) =>(
    <div className="card" onClick={() => handleItemClick(item)}>
        <Link href={{ pathname: '/itens', query: { itemClicado: JSON.stringify(item.titulo) } }}>
          <img src={item.capa} alt= "Capa ${item.titulo}" />
          <h1>{item.titulo}</h1>
        </Link>
      </div>
  ))

  return (
    <div>
      <div className='cards-container'>
        {listar}
      </div>
    </div>
  );
}

export default Titulos;