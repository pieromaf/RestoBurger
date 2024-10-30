import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { API_URL } from '../config'; 

function ProductList() {
  const { addItem } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categorizedProducts, setCategorizedProducts] = useState({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${API_URL}/products/menu`);
        setProducts(response.data);
        categorizeProducts(response.data); // Llama a la función para categorizar productos
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    }

    fetchProducts();
  }, []);

  // Función para categorizar los productos
  const categorizeProducts = (products) => {
    const categories = products.reduce((acc, product) => {
      const category = product.category; // Obtén la categoría del producto
      if (!acc[category]) {
        acc[category] = []; // Inicializa el array si la categoría no existe
      }
      acc[category].push(product); // Agrega el producto a su categoría
      return acc;
    }, {});
    setCategorizedProducts(categories); // Actualiza el estado con las categorías
  };

  return (
    <div className="flex flex-col">
      {Object.keys(categorizedProducts).map((category) => (
        <div key={category} id={category} className="my-8">
          <h2 className="text-2xl font-bold text-center">{category}</h2>
          <div className="flex flex-wrap justify-between">
            {categorizedProducts[category].map((product) => (
              <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
                <ProductCard
                  title={product.name}
                  imageUrl={product.image_url}
                  description={product.description}
                  price={`${product.price}`}
                  isActive={product.active} // Pasamos el estado activo del producto
                  onAdd={() => addItem(product)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
