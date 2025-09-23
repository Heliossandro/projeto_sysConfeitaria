import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";

export const Config = () => {
  const [menus, setMenus] = useState<any[]>([]);
  const [menuName, setMenuName] = useState("");
  const [search, setSearch] = useState(""); // pesquisa
  const [editingId, setEditingId] = useState<number | null>(null); // id que está em edição
  const [editingName, setEditingName] = useState(""); // novo nome em edição

  // Buscar menus existentes
  useEffect(() => {
    fetch("http://localhost:5000/menus")
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error("Erro ao buscar Menus:", err));
  }, []);

  // Criar menu novo
  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!menuName.trim()) {
      return alert("O nome do menu é obrigatório!");
    }

    try {
      const res = await fetch("http://localhost:5000/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: menuName }),
      });

      const newMenu = await res.json();
      setMenus([...menus, newMenu]);
      setMenuName("");
    } catch (err) {
      console.error("Erro ao criar menu:", err);
    }
  };

  // Deletar menu
  const handleDeleteMenu = async (id: number) => {
    if (!confirm("Tens certeza que queres apagar este menu?")) return;

    try {
      await fetch(`http://localhost:5000/menus/${id}`, {
        method: "DELETE",
      });
      setMenus(menus.filter((menu) => menu.id !== id));
    } catch (err) {
      console.error("Erro ao deletar menu:", err);
    }
  };

  // Editar menu
  const handleEditMenu = async (id: number) => {
    if (!editingName.trim()) {
      return alert("O nome do menu é obrigatório!");
    }

    try {
      const res = await fetch(`http://localhost:5000/menus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName }),
      });

      const updatedMenu = await res.json();
      setMenus(menus.map((menu) => (menu.id === id ? updatedMenu : menu)));
      setEditingId(null);
      setEditingName("");
    } catch (err) {
      console.error("Erro ao editar menu:", err);
    }
  };

  // Filtrar menus pesquisados
  const filteredMenus = menus.filter((menu) =>
    menu.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <section className="p-6 flex justify-center flex-col">
       <div className="flex gap-8 w-full items-start">
        {/* Criar novo menu */}
        <div className="mt-10 w-1/2">
            <form onSubmit={handleCreateMenu} className="flex flex-col gap-4 w-full">
            <h1 className="text-2xl font-bold text-center text-[#e29db7]">
                Criar novo menu
            </h1>
            <label htmlFor="menuName" className="text-[#e29db7]">Nome</label>
            <input
                type="text"
                id="menuName"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                className="p-2 rounded bg-gray-200 placeholder:text-[#00000049] w-full"
                placeholder="Digite o nome do menu..."
            />
            <button
                type="submit"
                className="text-white bg-[#e29db7] text-2xl h-12 w-full rounded-xl shadow-md hover:bg-[#db789e] duration-300 transform motion-safe:hover:scale-105"
            >
                Adicionar
            </button>
            </form>
        </div>

        {/* Pesquisar menu */}
        <div className="mt-10 w-1/2 flex flex-col">
            <h1 className="text-2xl font-bold mb-6 text-center text-[#e29db7]">
            Pesquisar menu
            </h1>
            <input
            type="text"
            placeholder="Digite o nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded bg-gray-200 placeholder:text-[#00000049] w-full"
            />
        </div>
        </div>

        {/* Lista de menus existentes */}
        <div className="mt-10">
          <h1 className="text-2xl font-bold text-center text-[#e29db7]">Menus existentes</h1>
          <ul className="mt-4 flex flex-col gap-4">
            {filteredMenus.map((menu) => (
              <li
                key={menu.id}
                className="p-4 border-b-[#46b361] rounded flex justify-between items-center"
              >
                {/* Se está em edição */}
                {editingId === menu.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border p-2 rounded flex-1 mr-4"
                  />
                ) : (
                  <span>{menu.name}</span>
                )}

                <div className="flex gap-2">
                  {editingId === menu.id ? (
                    <>
                      <button
                        onClick={() => handleEditMenu(menu.id)}
                        className="bg-[#46b361] text-white px-3 py-1 rounded"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditingName("");
                        }}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
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
                        className="bg-[#46b361] text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(menu.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Apagar
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
