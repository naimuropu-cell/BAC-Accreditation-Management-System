import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Office from "./pages/Office.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Standards from "./pages/Standards.jsx";
import StandardPage from "./pages/StandardPage.jsx";
import CriterionPage from "./pages/CriterionPage.jsx";
import BacBook from "./pages/BacBook.jsx";
import BacChapter from "./pages/BacChapter.jsx";
import List from "./pages/List.jsx";
import ListDetails from "./pages/ListDetails.jsx";
import CriterionTable from "./pages/CriterionTable.jsx";
import ListTable from "./pages/ListTable.jsx";
import Annex from "./pages/Annex.jsx";
import BookHighlight from "./pages/BookHighlight.jsx";


function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="p-2">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/annex" element={<Annex />} />
            <Route path="/book-highlight" element={<BookHighlight/>} />
            <Route path="/BacBook" element={<BacBook />} />
            <Route path="/BacChapter" element={<BacChapter />} />

            {/* <Route path="/list" element={<List />} />
            <Route path="/list/:id" element={<ListDetails />} />
            <Route path="/list/:listId/criterion/:criterionId" element={<CriterionTable />} /> */}


            <Route path="/list" element={<List />} />
            <Route path="/list/:id" element={<ListDetails />} />
            <Route path="/list/:id/criterion/:criterionId" element={<ListTable />} />






            {/* Standards */}
            <Route path="/standards" element={<Standards />} />
            <Route path="/standards/:standardId" element={<StandardPage />} />

            <Route
              path="/standards/:standardId/criterion/:criterionId"
              element={<CriterionPage></CriterionPage>}
            />

            {/* Auth & Others */}
            <Route path="/login" element={<Login />} />
            <Route path="/office" element={<Office />} />
            <Route
              path="/dashboard/:role"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}
