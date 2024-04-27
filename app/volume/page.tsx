'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { ClienteContext } from "../context/ClienteContext"
import Link from "next/link"
import "./volume.css"
import Swal from 'sweetalert2';


function Volume() {
  const { idClienteLogado,mudaLogin,nomeClienteLogado } = useContext(ClienteContext)
  const volumeClicadoJSON = localStorage.getItem('volumeClicado');
  const volumeClicado = volumeClicadoJSON ? JSON.parse(volumeClicadoJSON) : null;
  const tituloClicadoJSON = localStorage.getItem('tituloClicado');
  const tituloClicado = tituloClicadoJSON ? JSON.parse(tituloClicadoJSON) : null;
  const itemClicadoJSON = localStorage.getItem('itemClicado');
  const itemClicado = itemClicadoJSON? JSON.parse(itemClicadoJSON) : null;

  const [dados, setDados] = useState([])

  useEffect(() => {
    async function recebeDados() {

      const data = {
        usuario_id: idClienteLogado,
        titulo: tituloClicado,
        volume: volumeClicado,
        categoria: itemClicado.categoria
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
      Swal.fire({
        title: "Deseja excluir este item?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        }).then(async (result: { isConfirmed: any }) => {
        if (result.isConfirmed) {
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
            mudaLogin({ id: idClienteLogado, nome: nomeClienteLogado})
            window.location.href = '/inicial';
        }
        });
    }



  const itemTela = dados.map((item:any) => (
    <div className="card-vol">
      <div className="livro-vol">
        <img src={item.item.capa} alt={item.item.titulo} />
      </div>
      <div className='info-vol'>
        <h2>{item.item.titulo}</h2>
        <p>Volume: {item.item.volume}</p>
        <p>Editora: {item.item.editora}</p>
        <p>Gênero: {item.item.genero}</p>
        <p>Valor: R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        <div className='botoes-vol'>
          <button className="btn-vol">Vender</button>
          <button onClick={() => handleItemClick(item)} className="btn-vol">Remover</button>
        </div>
      </div>
    </div>
  ))

  return (
    <div className='corpo-vol'>{itemTela}</div>
  );
}

export default Volume