'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { ClienteContext } from "../context/ClienteContext"
import Link from "next/link"
import "./volume.css"


function Volume() {
  const { idClienteLogado } = useContext(ClienteContext)
  const volumeClicadoJSON = localStorage.getItem('volumeClicado');
  const volumeClicado = volumeClicadoJSON ? JSON.parse(volumeClicadoJSON) : null;
  const tituloClicadoJSON = localStorage.getItem('tituloClicado');
  const tituloClicado = tituloClicadoJSON ? JSON.parse(tituloClicadoJSON) : null;

  const [dados, setDados] = useState([])

  useEffect(() => {
    async function recebeDados() {

      const data = {
        usuario_id: idClienteLogado,
        titulo: tituloClicado,
        volume: volumeClicado
      };

      console.log(JSON.stringify(data))

      try {
        const response = await fetch("http://localhost:3004/volume", {
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

    async function handleItemClick(item:any) {

      const data = {
        usuario_id: idClienteLogado,
        item_id: item.item_id
      };

      console.log(JSON.stringify(data))

      try {
        const response = await fetch("http://localhost:3004/delete", {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data)
        });

        console.log("Item deletado");
      } catch (error) {
        console.error("Erro ao receber dados:", error);
      }
    }



  const itemTela = dados.map((item:any) => (
    <div className='card'>
        <img src={item.item.capa} alt="" />
        <div className='texto-card'>
            <h1>{item.item.titulo} - Volume {item.item.volume}</h1>
            <h4>Genero: {item.item.genero}</h4>
            <h4>Categoria: {item.item.categoria}</h4>
            <h3>Valor: R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            <div className='botao-remover' onClick={() => handleItemClick(item)}>
                <Link href="./inicial">Remover</Link>
            </div>
            <div className='botao-vender'>Vender</div>
        </div>
    </div>
  ))

  return (
    <div className='area-carde'>{itemTela}</div>
  );
}

export default Volume;
