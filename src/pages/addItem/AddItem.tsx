import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  menuId: number;
  image?: string;
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
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<Item>>({});

  // Buscar menus (para selecionar)
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

    if (!name || !price || !description || !menuId) {
      return alert("Todos os campos são obrigatórios!");
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
          image,
        }),
      });

      const newItem = await res.json();
      setItems([...items, newItem]);

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setMenuId("");
      setImage("");
    } catch (err) {
      console.error("Erro ao criar item:", err);
    }
  };

  // Atualizar item
  const handleUpdateItem = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingData),
      });

      const updatedItem = await res.json();
      setItems(items.map((item) => (item.id === id ? updatedItem : item)));
      setEditingId(null);
      setEditingData({});
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

            <label className="text-[#e29db7]">Imagem (URL)</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="p-2 rounded bg-gray-200 w-full"
              placeholder="Cole o link da imagem..."
            />

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
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editingData.name || ""}
                      onChange={(e) =>
                        setEditingData({ ...editingData, name: e.target.value })
                      }
                      className="p-2 border rounded w-1/2"
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-700">
                      {item.name} -{" "}
                      {item.price.toLocaleString("pt-AO", {
                        style: "currency",
                        currency: "AOA",
                      })}
                    </span>
                  )}

                  <div className="flex gap-3">
                    {editingId === item.id ? (
                      <>
                        <button
                          onClick={() => handleUpdateItem(item.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditingData({});
                          }}
                          className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            setEditingData(item);
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
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};
