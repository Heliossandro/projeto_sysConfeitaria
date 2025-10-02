import { useEffect, useState } from "react"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"

export const Client = () => {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => {
        setClients(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Erro ao buscar clientes:", err)
        setLoading(false)
      })
  }, [])

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email inválido!");
      return;
    }

    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const newClient = { name, email, password };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newClient),
    })
      .then(res => res.json())
      .then(data => {
        setClients([...clients, data]);
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch(err => console.error("Erro ao adicionar:", err));
  };

  const handleEdit = (id: number) => {
    if (!editName.trim() || !editEmail.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, email: editEmail }),
    })
      .then(res => res.json())
      .then(data => {
        setClients(clients.map(c => (c.id === id ? data : c)));
        setEditingId(null);
      })
      .catch(err => console.error("Erro ao editar:", err));
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setClients(clients.filter(c => c.id !== id))
      })
      .catch(err => console.error("Erro ao apagar:", err))
  };

  const startEditing = (client: any) => {
    setEditingId(client.id);
    setEditName(client.name);
    setEditEmail(client.email);
  };

  // filtro simples no frontend
  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <section className="p-6 flex justify-center flex-col pt-28">
        <div className="flex gap-8 w-full items-center flex-col">

          {/* Formulário */}
          <div className="mt-10 w-1/2">
            <form onSubmit={handleAddClient} className="flex flex-col gap-4 w-full">
              <h1 className="text-2xl font-bold text-center text-[#e29db7]">
                Adicionar Cliente
              </h1>

              <label className="text-[#e29db7]">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded bg-gray-200"
                placeholder="Digite o nome..."
              />

              <label className="text-[#e29db7]">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded bg-gray-200"
                placeholder="Digite o email..."
              />

              <label className="text-[#e29db7]">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded bg-gray-200"
                placeholder="Digite a senha..."
              />

              <button
                type="submit"
                className="text-white bg-[#e29db7] text-2xl h-12 w-full rounded-xl shadow-md hover:bg-[#db789e] duration-300"
              >
                Adicionar
              </button>
            </form>
          </div>

          {/* Pesquisa */}
          <div className="mt-10 w-1/2 flex flex-col">
            <h1 className="text-2xl font-bold mb-6 text-center text-[#e29db7]">
              Pesquisar cliente
            </h1>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Digite o nome..."
              className="p-2 rounded bg-gray-200"
            />
          </div>
        </div>

        {/* Lista */}
        <div className="mt-10">
          <h1 className="text-3xl font-bold text-center text-[#e29db7]">
            Clientes existentes
          </h1>

          <ul className="mt-8 flex flex-col gap-6 w-full max-w-3xl mx-auto">
            {loading ? (
              <p>Carregando...</p>
            ) : filteredClients.length === 0 ? (
              <p>Nenhum cliente encontrado</p>
            ) : (
              filteredClients.map((client) => (
                <li
                  key={client.id}
                  className="flex justify-between items-center p-4 bg-[#ffe4ed] rounded-xl shadow-md"
                >
                  {editingId === client.id ? (
                    <>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="p-2 rounded bg-gray-200"
                      />
                      <input
                        type="text"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="p-2 rounded bg-gray-200"
                      />
                      <button
                        onClick={() => handleEdit(client.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded-lg"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{client.name} - {client.email}</span>
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEditing(client)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        >
                          Apagar
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  )
}