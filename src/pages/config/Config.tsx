import { Footer } from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"

export const Config = () =>{
    return (
        <div>
            <Header/>
            <div className="p-6 flex justify-center flex-col my-28 pb-[6rem]">
                <section className="flex items-center flex-col gap-9">
                    <h1 className="text-[#e29db7] text-4xl mt-10 font-bold">Cofinguração</h1>
                    <div className="flex flex-col gap-[2rem]">
                        <a href="/client" className=" text-white bg-[#e29db7] text-2xl h-12 w-[150px] rounded-xl shadow-md hover:bg-[#db789e] duration-300 transform motion-safe:hover:scale-110 flex justify-center items-center">Clientes</a>
                        <a href="" className=" text-white bg-[#e29db7] text-2xl h-12 w-[150px] rounded-xl shadow-md hover:bg-[#db789e] duration-300 transform motion-safe:hover:scale-110 flex justify-center items-center">Produtos</a>
                        <a href="/menu" className=" text-white bg-[#e29db7] text-2xl h-12 w-[150px] rounded-xl shadow-md hover:bg-[#db789e] duration-300 transform motion-safe:hover:scale-110 flex justify-center items-center">Menu</a>
                        <a href="" className=" text-white bg-[#e29db7] text-2xl h-12 w-[150px] rounded-xl shadow-md hover:bg-[#db789e] duration-300 transform motion-safe:hover:scale-110 flex justify-center items-center">Encomendas</a>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    )
}
