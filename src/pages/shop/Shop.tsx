import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  menuId: number;
  status: string;
}

// Função util para normalizar texto (remove acentos, deixa lowercase)
const normalize = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // estado do modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
        setLoading(false);
      });
  }, []);

  // filtro simples no frontend
  const filtereditems = products.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1); // resetar quantidade
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
  if (!selectedProduct) return;

  // Buscar carrinho atual do localStorage
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Verificar se já existe no carrinho
  const existingIndex = cart.findIndex((item: any) => item.id === selectedProduct.id);

  if (existingIndex >= 0) {
    // Já existe, apenas somar a quantidade
    cart[existingIndex].quantity += quantity;
  } else {
    // Se não existe, adicionar novo
    cart.push({ ...selectedProduct, quantity });
  }

  // Atualizar localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Fechar modal depois de adicionar
  handleCloseModal();
};


  return (
    <div className="min-h-screen flex flex-col bg-[#fff5f8]">
      <Header />

      <main className="flex-1 container mx-auto px-6 my-28 pt-12 pb-12">
        <div className="mb-10 flex flex-col">
          <input
            type="text"
            value={search}
            placeholder="pesquisar produto..."
            className="p-2 rounded-xl bg-gray-200 placeholder:text-[#00000049] w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <h1 className="text-4xl font-extrabold text-center text-[#e29db7] mb-12">
          Nossa Loja
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Carregando produtos...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum produto disponível.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filtereditems.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col"
              >
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-[#e29db7] text-lg font-bold mb-4">
                      {product.price.toLocaleString("pt-AO", {
                        style: "currency",
                        currency: "AOA",
                      })}
                    </p>

                    <p
                      className={`${
                        normalize(product.status) === "disponivel"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.status}
                    </p>
                  </div>

                  <button
                    className="mt-auto mb-[1rem] bg-[#e29db7] text-white py-2 rounded-xl shadow hover:bg-[#db789e] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={normalize(product.status) !== "disponivel"}
                    onClick={() => handleBuyClick(product)}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedProduct.name}
            </h2>
            <p className="text-gray-600 mb-2">
              Preço unitário:{" "}
              <span className="font-semibold text-[#e29db7]">
                {selectedProduct.price.toLocaleString("pt-AO", {
                  style: "currency",
                  currency: "AOA",
                })}
              </span>
            </p>

            <div className="flex items-center gap-3 mb-4">
              <label className="font-medium">Quantidade:</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border p-2 rounded w-20 text-center"
              />
            </div>

            <p className="text-lg font-semibold mb-6">
              Total:{" "}
              <span className="text-[#e29db7]">
                {(selectedProduct.price * quantity).toLocaleString("pt-AO", {
                  style: "currency",
                  currency: "AOA",
                })}
              </span>
            </p>

            <div className="flex gap-3">
              <button className="flex-1 bg-[#e29db7] text-white py-2 rounded-xl shadow hover:bg-[#db789e] transition duration-300">
                Comprar já
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#26c267] text-white py-2 rounded-xl shadow hover:bg-[#1cd66a] transition duration-300"
              >
                Adicionar no carrinho
              </button>

            </div>

            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
