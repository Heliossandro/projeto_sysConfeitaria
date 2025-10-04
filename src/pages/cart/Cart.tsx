import { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  status: string;
  quantity: number;
}

export const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleRemove = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 👉 Função para enviar carrinho para backend
  const handleCheckout = async () => {
  if (cart.length === 0) return;

  setLoading(true);

  try {
    const userId = Number(localStorage.getItem("userId")); // 👈 pega o ID salvo no login

    if (!userId) {
      alert("Usuário não autenticado");
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        items: cart.map((item) => ({
          itemId: item.id, // precisa ser "itemId", não só "id"
          quantity: item.quantity,
        })),
      }),
    });

    if (!response.ok) throw new Error("Erro ao salvar carrinho");

    const data = await response.json();
    console.log("Carrinho salvo no banco:", data);

    localStorage.removeItem("cart");
    setCart([]);
    alert("Compra realizada com sucesso!");
  } catch (error) {
    console.error("Erro no checkout:", error);
    alert("Ocorreu um erro ao finalizar a compra.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-[#fff5f8]">
      <Header />

      <main className="flex-1 container mx-auto px-6 my-28 pt-12 pb-12">
        <h1 className="text-4xl font-extrabold text-center text-[#e29db7] mb-12">
          Carrinho de Compras
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">O carrinho está vazio.</p>
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500 text-sm">Qtd: {item.quantity}</p>
                  <p className="text-gray-500 text-sm">
                    Preço unitário:{" "}
                    {item.price.toLocaleString("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#e29db7] font-bold">
                    {(item.price * item.quantity).toLocaleString("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                    })}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Total:{" "}
                <span className="text-[#e29db7]">
                  {total.toLocaleString("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  })}
                </span>
              </h2>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-4 bg-[#e29db7] text-white px-6 py-3 rounded-xl shadow hover:bg-[#db789e] transition duration-300"
              >
                {loading ? "Processando..." : "Comprar"}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
