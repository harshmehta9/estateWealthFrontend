
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import PropertyManagement from './pages/admin/properties/PropertyManagement';
import NewProperty from './pages/admin/properties/NewProperty';
import EditProperty from './pages/admin/properties/EditProperty';
import PropertiesPage from './pages/PropertiesPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<PropertyManagement />} />
          <Route path='newproperty' element={<NewProperty/>}/>
          <Route path='editproperty/:id' element={<EditProperty/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;