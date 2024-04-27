'use client'
import React, { useContext } from "react";
import { useForm } from "react-hook-form"; // Importação correta de useForm
import Swal from "sweetalert2";
import { ClienteContext } from "../context/ClienteContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import "./cadastrar-item.css"

interface Inputs {
    titulo: string;
    genero: string;
    editora: string;
    categoria?: "manga" | "hq" | "importado";
    capa: string;
    volume: string;
    valor: string;
}

function CadastrarItem() {
    const { register, handleSubmit } = useForm<Inputs>();
    const router = useRouter();
    const { mudaLogin, idClienteLogado } = useContext(ClienteContext);

    async function enviaDados(data: Inputs) {
        try {
            const response = await fetch("http://localhost:3004/item", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const dados = await response.json();
                if (Number(dados.id) > 0) {
                    // Cadastro do item bem sucedido
                    // Agora, vamos cadastrar na colecao
                    const colecaoData = {
                        usuario_id: idClienteLogado,
                        item_id: dados.id,
                        valor: data.valor
                    };

                    const colecaoResponse = await fetch("http://localhost:3004/colecao", {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(colecaoData)
                    });

                    if (colecaoResponse.ok) {
                        // Cadastro na colecao bem sucedido
                        router.push("/inicial");
                    } else {
                        toast.error("Erro ao cadastrar na colecao");
                    }
                } else {
                    toast.error("Erro! Cadastro falhou");
                }
            } else {
                Swal.fire({
                    title: "Erro ao Cadastrar",
                    icon: "warning"
                });
                throw new Error("Erro ao cadastrar. Por favor, tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao processar o cadastro:", error);
            toast.error("Erro ao processar o cadastro. Por favor, tente novamente mais tarde.");
        }
    }


    return (
    <div className="corpo-ci">
        <div className="background-images-ci">
            <img src="./hq.jpg" alt="Livro 1" />
            <img src="./manga.jpg" alt="Livro 2" className="img-2-ci" />
            <img src="./importado.jpg" alt="Livro 3" className="img-3-ci" />
            <img src="./img/logo.png" alt="Livro 4" className="img-4-ci" />
        </div>

        <div className="container-ci">
            <h2 className="form-de-liv-ci">Formulário de Livros</h2>
            <form onSubmit={handleSubmit(enviaDados)}>
                <div className="form-group-ci">
                <label htmlFor="titulo">Título:</label>
                <input className="input-campos" type="text" id="titulo" {...register("titulo")} required />
                </div>
                <div className="form-group-ci">
                <label htmlFor="volume">Volume:</label>
                <input className="input-campos" type="text" id="volume" {...register("volume")}/>
                </div>
                <div className="form-group-ci">
                <label htmlFor="capa">Capa:</label>
                <input className="input-campos" type="text" id="capa" {...register("capa")} />
                </div>
                <div className="form-group-ci">
                <label htmlFor="valor">Valor:</label>
                <input className="input-campos" type="text" id="valor" {...register("valor")} required />
                </div>
                <div className="form-group-ci">
                <label htmlFor="editora">Editora:</label>
                <input className="input-campos" type="text" id="editora" {...register("editora")} />
                </div>
                <div className="form-group-ci">
                <label htmlFor="genero">Gênero:</label>
                <input className="input-campos" type="text" id="genero" {...register("genero")} />
                </div>
                <div className="form-group-ci">
                <label htmlFor="categoria">Categoria:</label>
                <select id="categoria" {...register("categoria")} required>
                    <option value="">Selecione...</option>
                    <option value="manga">Manga</option>
                    <option value="hq">HQ</option>
                    <option value="importado">Importado</option>
                </select>
                </div>
                <div className="form-group-ci">
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default CadastrarItem;
