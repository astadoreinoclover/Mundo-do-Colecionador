'use client'
import Link from "next/link"
import "./inicial.css"
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { ClienteContext } from "../context/ClienteContext"
import ReactDOM from "react-dom";
import React from "react";
import Router from "next/router";

export interface itemProps {
  item: any;
  categoria: string
  titulo: string
}

function Inicial() {
  const { idClienteLogado } = useContext(ClienteContext)
  const [dados, setDados] = useState([])
  const idlogadoJSON = localStorage.getItem('idClienteLogado');
  const idlogado = idlogadoJSON ? JSON.parse(idlogadoJSON) : null;

  useEffect(() => {
    async function recebeDados() {

      const data = {
        usuario_id: idClienteLogado || idlogado
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

  const [itemClicado, setItemClicado] = useState<itemProps | null>(null);

  const handleItemClick = (item: itemProps) => {
    setItemClicado(item);
  };
  localStorage.setItem('itemClicado', JSON.stringify(itemClicado));

  console.log(itemClicado)

  const listar = dados.map((item: itemProps) => (
      <div className="card-i" key={item.categoria} onClick={() => handleItemClick(item)}>
        <Link href={{ pathname: '/titulos', query: { itemClicado: JSON.stringify(item) } }}>
          {item.categoria === "manga" && (
            <div>
              <img src="manga.jpg" alt="Manga" className="card-img-top-i" />
              <h1>Manga</h1>
            </div>
          )}
          {item.categoria === "hq" && (
            <div>
              <img src="hq.jpg" alt="HQ" className="card-img-top-i" />
              <h1>HQ</h1>
            </div>
          )}
          {item.categoria === "importado" && (
            <div>
              <img src="importado.jpg" alt="Importado" className="card-img-top-i" />
              <h1>Importados</h1>
            </div>
          )}
        </Link>
      </div>
  ));

  return (
    <div className="tela-i">
      <div className="container-i">
        <div className="options-i">
          <h1 className="option-i">Minha Coleção<span className="line-i"></span></h1>
          <h1 className="option-i">Loja</h1>
        </div>
        <div className="cards-i">{listar}</div>
      </div>
      <div className="footer-i">
        <div className="total-spent-i">
          Total Gasto: R$ XXXX,XX
        </div>
        <Link href="/cadastrar-item" className="add-button-i">Adicionar Item</Link>
      </div>
    </div>
    
  )
}

export default Inicial