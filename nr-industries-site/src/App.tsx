import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { IndustriesPage } from "@/pages/IndustriesPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { SpecificationsPage } from "@/pages/SpecificationsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
          <Route path="specifications" element={<SpecificationsPage />} />
          <Route path="industries" element={<IndustriesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
