import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Posts from "./pages/Posts";
import Passengers from "./pages/Passengers";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/passengers" element={<Passengers />} />
          <Route
            path="/"
            element={
              <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
                <Link
                  to="/posts"
                  className="block  text-[#F87171] hover:text-[#EF4444] font-medium"
                >
                  Go to Posts
                </Link>
                <Link
                  to="/passengers"
                  className="block text-[#F87171] hover:text-[#EF4444] font-medium"
                >
                  Go to Passengers
                </Link>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
