import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home"; 
import AboutSec from "./Components/about/AboutUs";
import Products from "./Components/Products/product";
import ContactUs from "./Components/Contact/ContactUs";
import Services from "./Components/ServicesSec/Services";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutSec />} />
        <Route path="/product" element={<Products />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </>
  );
}

export default App;


