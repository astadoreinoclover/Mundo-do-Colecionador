'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { ClienteContext } from "../context/ClienteContext"
import Link from "next/link"


function Itens() {
  const { idClienteLogado } = useContext(ClienteContext)
  const tituloClicadoJSON = localStorage.getItem('tituloClicado');
  const tituloClicado = tituloClicadoJSON ? JSON.parse(tituloClicadoJSON) : null;

  const [dados, setDados] = useState([])

  useEffect(() => {
    async function recebeDados() {

      const data = {
        usuario_id: idClienteLogado,
        titulo: tituloClicado
      };

      console.log(JSON.stringify(data))

      try {
        const response = await fetch("http://localhost:3004/itempelotitulo", {
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
  const [volumeClicado, setVolumeClicado] = useState(null);

  const handleItemClick = (item:any) => {
    setVolumeClicado(item.item.volume);
  };
  localStorage.setItem('volumeClicado', JSON.stringify(volumeClicado));

  const listar = dados.map((item: any) =>(
    <div className="card" onClick={() => handleItemClick(item)}>
      <Link href={{ pathname: '/volume', query: { volumeClicado: JSON.stringify(item.item.volume) } }}>
        <img src={item.item.capa} alt="" />
        <h1>{item.item.titulo} - Vol.{item.item.volume}</h1>
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

export default Itens;