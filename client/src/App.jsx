import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './middleware/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import PublicForm from './pages/PublicForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/post" element={<PublicForm />} />
        {/* Admin Routes */}
        <Route path="/admin">
          <Route index element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
