import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Header from "./routes/header/header.component";
import CategoryContent from "./routes/categoryContent/categoryContent.component";
import CartPage from "./routes/cart-page/cart-page.component";
import ProductPreview from "./routes/product-preview/product-preview.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Navigate to="/all" />} />
        <Route path="all" >
          <Route index element={<CategoryContent category="all" />} />
          <Route path=":productId" element={<ProductPreview />}/>
        </Route>
        <Route path="clothes" >
          <Route index element={<CategoryContent category="clothes" />} />
          <Route path=":productId" element={<ProductPreview />}/>
        </Route>
        <Route path="tech" >
          <Route index element={<CategoryContent category="tech" />} />
          <Route path=":productId" element={<ProductPreview />}/>
        </Route>
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default App;
