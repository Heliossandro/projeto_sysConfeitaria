import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  menuId: number;
  status: string;
}

export const AddItem = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form inputs
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [menuId, setMenuId] = useState("");
  const [status, setStatus] = useState("Disponível"); // <-- já começa disponível

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [editingData, setEditingData] = useState<Partial<Item>>({});

  // Buscar menus
  useEffect(() => {
    fetch("http://localhost:5000/menus")
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error("Erro ao buscar menus:", err));
  }, []);

  // Buscar itens existentes
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar itens:", err);
        setLoading(false);
      });
  }, []);

  // Criar item
  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description || !menuId || !status) {
      return alert("Todos os campos são obrigatórios!");
    }

    if (Number(price) <= 0) {
      return alert("O preço deve ser maior que zero!");
    }

    try {
      const res = await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          description,
          menuId: Number(menuId),
          status,
        }),
      });

      const newItem = await res.json();
      setItems([...items, newItem]);

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setMenuId("");
      setStatus("Disponível"); // volta a default
    } catch (err) {
      console.error("Erro ao criar item:", err);
    }
  };

  // Atualizar item
  const handleUpdateItem = async (id: number, data: Partial<Item>) => {
    try {
      const res = await fetch(`http://localhost:5000/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const updatedItem = await res.json();
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
      setIsModalOpen(false);
      setEditingData({});
      setSelectedItem(null);
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
    }
  };

  // Deletar item
  const handleDeleteItem = async (id: number) => {
    if (!confirm("Tens certeza que queres apagar este item?")) return;

    try {
      await fetch(`http://localhost:5000/items/${id}`, { method: "DELETE" });
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erro ao deletar item:", err);
    }
  };

  return (
    <div>
      <Header />
      <section className="p-6 flex justify-center flex-col pt-28">
        {/* Formulário */}
        <div className="w-full max-w-2xl mx-auto">
          <form
            onSubmit={handleCreateItem}
            className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-lg"
          >
            <h1 className="text-2xl font-bold text-center text-[#e29db7]">
              Adicionar novo item
            </h1>

            <label className="text-[#e29db7]">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded bg-gray-200 w-full"
              placeholder="Digite o nome do item..."
            />

            <label className="text-[#e29db7]">Preço</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-2 rounded bg-gray-200 w-full"
              placeholder="Digite o preço..."
            />

            <label className="text-[#e29db7]">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded bg-gray-200 w-full"
              placeholder="Digite a descrição..."
            />

            <label className="text-[#e29db7]">Menu</label>
            <select
              value={menuId}
              onChange={(e) => setMenuId(e.target.value)}
              className="p-2 rounded bg-gray-200 w-full"
            >
              <option value="">Selecione um menu</option>
              {menus.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))}
            </select>

            <label className="text-[#e29db7]">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 rounded bg-gray-200 w-full"
            >
              <option value="Disponível">Disponível</option>
              <option value="Indisponível">Indisponível</option>
            </select>

            <button
              type="submit"
              className="text-white bg-[#e29db7] text-xl h-12 w-full rounded-xl shadow-md hover:bg-[#db789e] transition"
            >
              Adicionar Item
            </button>
          </form>
        </div>

        {/* Lista de itens */}
        <div className="mt-14">
          <h2 className="text-3xl font-bold text-center text-[#e29db7] mb-6">
            Itens existentes
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Carregando itens...</p>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum item disponível.</p>
          ) : (
            <ul className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-[#ffe4ed] rounded-xl shadow-md border border-[#e29db7]/30"
                >
                  <span className="text-lg font-medium text-gray-700">
                    {item.name} -{" "}
                    {item.price.toLocaleString("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                    })}
                  </span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setEditingData(item);
                        setIsModalOpen(true);
                      }}
                      className="bg-[#e29db7] text-white px-4 py-2 rounded-lg shadow hover:bg-[#db789e]"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                    >
                      Apagar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <Footer />

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[500px]">
            <h2 className="text-2xl font-bold text-[#e29db7] mb-4">
              Editar Item
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={editingData.name ?? ""}
                onChange={(e) =>
                  setEditingData({ ...editingData, name: e.target.value })
                }
                placeholder="Nome"
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={editingData.price ?? ""}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    price: Number(e.target.value),
                  })
                }
                placeholder="Preço"
                className="p-2 border rounded"
              />
              <textarea
                value={editingData.description ?? ""}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    description: e.target.value,
                  })
                }
                placeholder="Descrição"
                className="p-2 border rounded"
              />
              <select
                value={editingData.menuId ?? ""}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    menuId: Number(e.target.value),
                  })
                }
                className="p-2 border rounded"
              >
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
              <select
                value={editingData.status ?? ""}
                onChange={(e) =>
                  setEditingData({ ...editingData, status: e.target.value })
                }
                className="p-2 border rounded"
              >
                <option value="Disponível">Disponível</option>
                <option value="Indisponível">Indisponível</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleUpdateItem(selectedItem.id, editingData)}
                className="px-4 py-2 rounded bg-[#e29db7] text-white hover:bg-[#db789e]"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
