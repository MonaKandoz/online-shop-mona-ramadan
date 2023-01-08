import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProductsContext } from "./context/products.context";

import "./App.css";
import Header from "./routes/header/header.component";
import CategoryContent from "./routes/categoryContent/categoryContent.component";
import CartPage from "./routes/cart-page/cart-page.component";
import ProductPreview from "./routes/product-preview/product-preview.component";
import Spinner from "./components/spinner/spinner.component";

function App() {
  const {loading, error,categories} = useContext(ProductsContext);
  
  return (
    <>
    {!loading && categories[0] !== undefined?
      <Routes>
        <Route path="/" element={<Header />}>
        <Route index element={<Navigate to={`/${categories[0]}`} />} />
              {categories.map((category)=>(
                  <Route path={category} >
                      <Route index element={<CategoryContent category={category} />} />
                      <Route path=":productId" element={<ProductPreview />}/>
                  </Route>
              ))}
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
      :
      <Spinner />
    }
    {error && <h1> Error loading the page! 🤕❌</h1>}
    </>
  );
}

export default App;
