
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const productos = [
  { descripcion: "Algabo enjuague sandía x 750 ml", precio: 4500 },
  { descripcion: "Algabo jabón para bebé pastilla 80g con estuche", precio: 1300 },
  { descripcion: "Algabo shampoo 350ml bubble gum", precio: 3100 },
  { descripcion: "Algabo shampoo 350ml durazno", precio: 3100 },
  { descripcion: "Algabo shampoo 350ml sandía", precio: 3100 },
];

export default function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);

  const generarLinkPago = () => {
    const items = carrito.map((item) => `${item.descripcion} - $${item.precio}`).join(" | ");
    const mensaje = encodeURIComponent(
      `Hola! Quiero comprar estos productos:\n${items}\nTotal: $${total}`
    );
    return `https://wa.me/5491135742446?text=${mensaje}`;
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 font-sans px-4 py-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">🍼 Baby Home</h1>
        <p className="text-lg text-pink-700">Todo lo que tu bebé necesita</p>
      </header>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {productos.map((prod, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-md border border-pink-100">
            <h2 className="text-lg font-semibold mb-1">{prod.descripcion}</h2>
            <p className="text-pink-700 font-bold mb-3 text-xl">${prod.precio}</p>
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full w-full transition"
              onClick={() => agregarAlCarrito(prod)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {carrito.length > 0 && (
        <div className="mt-12 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-pink-300 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-pink-600">🧺 Carrito</h2>
          <ul className="mb-4 list-disc list-inside">
            {carrito.map((item, i) => (
              <li key={i}>{item.descripcion} - ${item.precio}</li>
            ))}
          </ul>
          <p className="text-xl font-bold mb-4">Total: ${total}</p>
          <a
            href={generarLinkPago()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 text-lg"
          >
            <FaWhatsapp /> Finalizar compra por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
