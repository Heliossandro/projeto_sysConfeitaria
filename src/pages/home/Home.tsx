import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";

export const Home = () => {
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/menus") // chama backend
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error("Erro ao buscar menus:", err));
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center flex-col mt-[8rem]">
        <section className="flex items-center flex-col gap-9">
          <h1 className="text-[#e29db7] text-4xl mt-10 font-bold">
            Bem-Vindo a Confeitaria Mirella´s Delights
          </h1>
          <button className=" text-white bg-[#e29db7] text-2xl h-12 w-[150px] rounded-xl shadow-md hover:bg-[#db789e] duration-300 transform motion-safe:hover:scale-110">
            Encomendar
          </button>
        </section>

        <section className=" flex items-center justify-center flex-col w-[100%] my-[8rem] p-10">
          <h1 className="text-[#e29db7] text-4xl my-10 font-bold">
            O que podes Encomendar na nossa Confeitaria
          </h1>
            <div className="flex flex-col gap-8 mt-10 w-full max-w-6xl px-4">
                {menus.map((menu) => (
                    <div
                        key={menu.id}
                        className="flex flex-col sm:flex-row justify-between items-center 
                            rounded-2xl overflow-hidden shadow-lg p-4 bg-[#e29db7] 
                            gap-4">
                            <h2 className="text-xl text-white font-semibold text-center sm:text-left">
                                {menu.name}
                            </h2>
                            <button className="px-4 py-2 text-white rounded-lg  hover:text-[#c75c87] transition">
                                Ver mais
                            </button>
                    </div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
};
