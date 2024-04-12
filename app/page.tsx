import Pesquisa from "./components/Pesquisa";
import "./home.css"

export default function Home() {
  return (
    <div className="area text-center">
      <h1 className="font text-6xl mt-8">Complete a sua Coleção com</h1>
      <h1 className="font text-6xl mt-6"> a gente!!</h1>
      <Pesquisa/>
    </div>
  );
}
