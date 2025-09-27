import { Header } from "../components/header/Header"
import { Footer } from "../components/footer/Footer"

export const Client = () =>{
    return(
        <div>
            <Header/>
                <section  className="p-6 flex justify-center flex-col pt-28">
                    <div className="flex gap-8 w-full items-center flex-col">
                        {/* Criar novo menu */}
                        <div className="mt-10 w-1/2">
                            <form className="flex flex-col gap-4 w-full">
                            <h1 className="text-2xl font-bold text-center text-[#e29db7]">
                                Adicionar Cliente
                            </h1>
                            <label htmlFor="menuName" className="text-[#e29db7]">Nome</label>
                            <input
                                type="text"
                                className="p-2 rounded bg-gray-200 placeholder:text-[#00000049] w-full"
                                placeholder="Digite o nome..."
                            />

                            <label htmlFor="menuName" className="text-[#e29db7]">Email</label>
                            <input
                                type="text"
                                className="p-2 rounded bg-gray-200 placeholder:text-[#00000049] w-full"
                                placeholder="Digite o email..."
                            />

                            <label htmlFor="menuName" className="text-[#e29db7]">Senha</label>
                            <input
                                type="text"
                                className="p-2 rounded bg-gray-200 placeholder:text-[#00000049] w-full"
                                placeholder="Digite a senha..."
                            />
                            <button
                                type="submit"
                                className="text-white bg-[#e29db7] text-2xl h-12 w-full rounded-xl shadow-md hover:bg-[#db789e] duration-300 transform motion-safe:hover:scale-105"
                            >
                                Adicionar
                            </button>
                            </form>
                        </div>

                        <div className="mt-10 w-1/2 flex flex-col">
                            <h1 className="text-2xl font-bold mb-6 text-center text-[#e29db7]">
                            Pesquisar cliente
                            </h1>
                            <input
                            type="text"
                            placeholder="Digite o nome..."
                            className="p-2 rounded bg-gray-200 placeholder:text-[#00000049] w-full"/>
                        </div>
                    </div>
                            {/* Lista de menus existentes */}
                    <div className="mt-10">
                    <h1 className="text-3xl font-bold text-center text-[#e29db7]">
                        Clientes existentes
                    </h1>

                    <ul className="mt-8 flex flex-col gap-6 w-full max-w-3xl mx-auto">
                       {/* <li
                            key={menu.id}
                            className="flex justify-between items-center p-4 bg-[#ffe4ed] rounded-xl shadow-md border border-[#e29db7]/30 hover:shadow-lg transition"
                        >
                             Se está em edição 
                            {editingId === menu.id ? (
                            <input
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="p-2 rounded-lg flex-1 mr-4 focus:outline-none focus:ring-2 focus:ring-[#e29db7]"
                            />
                            ) : (
                            <span className="text-lg font-medium text-gray-700">{menu.name}</span>
                            )}

                            <div className="flex gap-3">
                            {editingId === menu.id ? (
                                <>
                                <button
                                    onClick={() => handleEditMenu(menu.id)}
                                    className="bg-[#46b361] text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={() => {
                                    setEditingId(null);
                                    setEditingName("");
                                    }}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition"
                                >
                                    Cancelar
                                </button>
                                </>
                            ) : (
                                <>
                                <button
                                    onClick={() => {
                                    setEditingId(menu.id);
                                    setEditingName(menu.name);
                                    }}
                                    className="bg-[#e29db7] text-white px-4 py-2 rounded-lg shadow hover:bg-[#db789e] transition"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteMenu(menu.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                                >
                                    Apagar
                                </button>
                                </>
                            )}
                            </div>
                        </li>*/}
                    </ul>
                    </div>
                </section>
            <Footer/>
        </div>
    )
}