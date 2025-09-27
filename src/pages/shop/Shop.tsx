import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  menuId: number;
  /* image?: string; */
}

export const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#fff5f8]">
      <Header/>

      <main className="flex-1 container mx-auto px-6 my-28 pt-12 pb-12">
         <div className="mb-10 flex flex-col">
            <input
            type="text"
            placeholder="pesquisar produto..."
            className="p-2 rounded-xl bg-gray-200 placeholder:text-[#00000049] w-full"/>
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
            {products.map((product) => (
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
                  <p className="text-[#e29db7] text-lg font-bold mb-4">
                    {product.price.toLocaleString("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                    })}
                  </p>

                  <button className="mt-auto mb-[1rem] bg-[#e29db7] text-white py-2 rounded-xl shadow hover:bg-[#db789e] transition duration-300">
                    Comprar
                  </button>
                  
                  <button className="mt-auto bg-[#26c267] text-white py-2 rounded-xl shadow hover:bg-[#1cd66a] transition duration-300">
                    Adicionar no carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
