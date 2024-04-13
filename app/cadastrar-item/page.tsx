'use client'
import React, { useContext } from "react";
import { useForm } from "react-hook-form"; // Importação correta de useForm
import Swal from "sweetalert2";
import { ClienteContext } from "../context/ClienteContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
        <div className="max-w-7xl mx-auto mt-6 area">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit(enviaDados)}>
                <div>
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
                    <input type="text" id="titulo" className="campo mt-1 p-2 border border-gray-300 rounded-md" required {...register("titulo")} />
                </div>
                <div>
                    <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Gênero</label>
                    <input type="text" id="genero" className="campo mt-1 p-2 border border-gray-300 rounded-md" required {...register("genero")} />
                </div>
                <div>
                    <label htmlFor="editora" className="block text-sm font-medium text-gray-700">Editora</label>
                    <input type="text" id="editora" className="campo mt-1 p-2 border border-gray-300 rounded-md" required {...register("editora")} />
                </div>
                <div>
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
                    <select id="categoria" className="campo mt-1 p-2 border border-gray-300 rounded-md" {...register("categoria")}>
                        <option value="">Selecione...</option>
                        <option value="manga">Manga</option>
                        <option value="hq">HQ</option>
                        <option value="importado">Importado</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="capa" className="block text-sm font-medium text-gray-700">Capa</label>
                    <input type="text" id="capa" className="campo mt-1 p-2 border border-gray-300 rounded-md" required {...register("capa")} />
                </div>
                <div>
                    <label htmlFor="volume" className="block text-sm font-medium text-gray-700">Volume</label>
                    <input type="text" id="volume" className="campo mt-1 p-2 border border-gray-300 rounded-md" required {...register("volume")} />
                </div>
                <div>
                    <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor</label>
                    <input type="text" id="valor" className="campo mt-1 p-2 border border-gray-300 rounded-md" required {...register("valor")} />
                </div>
                <p className="text-center mt-5">
                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cadastrar</button>
                </p>
            </form>
        </div>
    );
}

export default CadastrarItem;
