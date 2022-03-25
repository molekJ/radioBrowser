/** Style */
import "./assets/scss/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

/** Libs */
import { HashRouter as Router, Routes, Route } from "react-router-dom";

/** Layout */
import Footer from "./layout/Footer";
import Header from "./layout/Header";

/** Pages */
import { Dashboard } from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route index element={<Dashboard />} />
          {/* <Route path="myFavorite" element={<MyFavorite/>}/> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
