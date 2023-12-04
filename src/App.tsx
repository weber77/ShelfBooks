import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBook from "./pages/addBook/AddBook";
import ViewBooks from "./pages/viewBooks/ViewBooks";
import Navbar from "./components/navbar/navbar";
import { ToastContainer } from "react-toastify";
import ViewBook from "./pages/viewBook/viewBook";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        {/* Navigation or header can be placed here */}
        <Routes>
          <Route path="/" element={<AddBook />} />
          <Route path="/books" element={<ViewBooks />} />
          <Route path="/book/:id" element={<ViewBook />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;
