/** Style */
import "./assets/scss/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

/** Libs */
import { HashRouter as Router, Routes, Route } from "react-router-dom";

/** Layout */
import Footer from "./layout/Footer";
import Header from "./layout/Header";

/** Pages */
import { HomePage } from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          {/* <Route path="myFavorite" element={<MyFavorite/>}/> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
