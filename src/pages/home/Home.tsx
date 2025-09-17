import { Header } from "../../components/header/Header"

export const Home = ()=>{
    return(
        <div className="">
            <Header/>
            <div className="flex justify-center items-center flex-col mt-[8rem]">
                <section className="flex items-center flex-col gap-9">
                    <h1 className="text-[#e29db7] text-4xl mt-10 font-bold">Bem-Vindo a Confeitaria Mirella´s Delights </h1>
                    <button className=" text-white bg-[#e29db7] text-2xl h-12 w-[150px] rounded-xl shadow-md hover:bg-[#db789e] duration-300 transform motion-safe:hover:scale-110">Encomendar</button>
                </section>

                <section className="bg-[#e29db7] flex items-center justify-center flex-col h-[30rem] w-[100%] my-[8rem]">
                    <h1 className="text-[#ffffff] text-4xl mt-10 font-bold"> O que podes Encomendar na nossa Confeitaria</h1>
                    <div className="">
                        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
                        {/* <img className="w-full" alt="Imagem do card"> */}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">Título do Card</h2>
                            <p className="text-gray-600 mb-4">
                            Este é um exemplo simples de card com TailwindCSS. Podes adicionar imagem, texto e botão.
                            </p>
                            <button className="px-4 py-2 bg-[#e29db7] text-white rounded-lg hover:bg-[#db789e] *:transition">
                            Saber mais
                            </button>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}