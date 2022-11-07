import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Header from "./routes/header/header.component";
import CategoryContent from "./routes/categoryContent/categoryContent.component";
import CartPage from "./routes/cart-page/cart-page.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Navigate to="/all" />} />
        <Route path="all" element={<CategoryContent category="all" />} />
        <Route path="clothes" element={<CategoryContent category="clothes" />} />
        <Route path="tech" element={<CategoryContent category="tech" />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default App;
