'use client'
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Toaster, toast } from 'sonner'
import { ClienteContext } from "../context/ClienteContext"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import "./cadastro.css"

interface Inputs {
    email: string
    senha: string
    nome: string
    cpf: string
    numero: string
}


function Cadastro(){


    const { register, handleSubmit } = useForm<Inputs>();
    const { mudaLogin } = useContext(ClienteContext);
    const router = useRouter();

    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    async function enviaDados(data: Inputs) {

        try {

            if (data.senha !== confirmarSenha) {
                Swal.fire({
                    title: "As senhas não coincidem",
                    icon: "error"
                });
                return;
            }

            const verificarCadastroResponse = await fetch("http://localhost:3004/verificar-cadastro", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email: data.email})
            });

            const verificarCadastroResponse2 = await fetch("http://localhost:3004/verificar-cadastro2", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ cpf: data.cpf})
            });

            const verificarCadastro = await verificarCadastroResponse.json();
            const verificarCadastro2 = await verificarCadastroResponse2.json();

            if (verificarCadastro.cadastroExistente || verificarCadastro2.cadastroExistente) {
                Swal.fire({
                    title: "Email ou Cpf já cadastrados",
                    icon: "warning"
                  });
                return;
            }

            const response = await fetch("http://localhost:3004/usuario", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const dados = await response.json();
                if (Number(dados.id) > 0) {
                    mudaLogin({ id: Number(dados.id), nome: dados.nome });
                    router.push("/inicial");
                } else {
                    toast.error("Erro! Cadastro falhou");
                }
            } else {
                Swal.fire({
                    title: "Erro ao Cadastrar",
                    icon: "warning"
                });
                throw new Error("Erro ao cadastrar. Por favor, tente novamente.");
                return;
            }
        } catch (error) {
                console.error("Erro ao processar o cadastro:", error);
            toast.error("Erro ao processar o cadastro. Por favor, tente novamente mais tarde.");
        }
    }

    return(
        <div className="max-w-7xl mx-auto mt-6 area">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit(enviaDados)}>
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input type="text" id="nome" className="campo mt-1 p-2 border border-gray-300 rounded-md" required {...register("nome")} />
                    </div>
                    <div>
                        <label htmlFor="numero" className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input type="number" id="numero" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="campo mt-1 p-2 border border-gray-300 rounded-md" placeholder="Ex: (00) 90000-0000" required {...register("numero")} />
                    </div>
                    <div>
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                        <input type="text" id="cpf" className="campo mt-1 p-2 border border-gray-300 rounded-md" required {...register("cpf")} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input type="email" id="email" className="campo mt-1 p-2 border border-gray-300 rounded-md" required {...register("email")} />
                    </div>
                    <div>
                        <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
                        <input type="password"  id="senha" className="campo mt-1 p-2 border border-gray-300 rounded-md" required {...register("senha")} />
                    </div>
                    <div>
                        <label htmlFor="repeat_password" className="block text-sm font-medium text-gray-700">Confirme sua senha</label>
                        <input type="password" name="repeat_password" id="repeat_password" className="campo mt-1 p-2 border border-gray-300 rounded-md" onChange={(e) => setConfirmarSenha(e.target.value)} required />
                    </div>
                <p className="text-center mt-5">
                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Cadastrar-se</button>
                </p>


            </form>
        </div>
    )
}
export default Cadastro