import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserLayout from './components/User/UserLayout';

// Pages
import UserList from './components/Admin/Pages/UserList';
import EventPost from './components/Admin/Pages/EventPost';
import PostCategory from './components/Admin/Pages/PostCategory';
import AddGallery from './components/Admin/Pages/AddGallery';
import ContactList from './components/Admin/Pages/ContactList';
import Profile from './components/Admin/Pages/Profile';
import ChangePassword from './components/Admin/Pages/ChangePassword';
import Home from './components/User/Pages/Home';
import About from './components/User/Pages/About';
import Events from './components/User/Pages/Events';
import EventDetails from './components/User/Pages/EventDetails';
import MyBookings from './components/User/Pages/MyBookings';
import Gallery from './components/User/Pages/Gallery';
import GalleryHighlight from './components/User/Pages/GalleryHighlight';
import Contact from './components/User/Pages/Contact';
import Account from './components/User/Pages/Account';
import UserChangePassword from './components/User/Pages/UserChangePassword';

// Protection Wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/user/home" />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Protect Admin route */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRole="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            >
              <Route index element={<UserList />} />
              <Route path="users" element={<UserList />} />
              <Route path="events" element={<EventPost />} />
              <Route path="categories" element={<PostCategory />} />
              <Route path="gallery" element={<AddGallery />} />
              <Route path="contacts" element={<ContactList />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/password" element={<ChangePassword />} />
            </Route>

            {/* Login Route (Guest only) */}
            <Route path="/login" element={<Login />} />

            {/* User Multi-Page Protected Route */}
            <Route 
              path="/user" 
              element={
                <ProtectedRoute allowedRole="User">
                  <UserLayout />
                </ProtectedRoute>
              } 
            >
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="events" element={<Events />} />
              <Route path="event/:id" element={<EventDetails />} />
              <Route path="mybooking" element={<MyBookings />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="gallery/:eventName" element={<GalleryHighlight />} />
              <Route path="contact" element={<Contact />} />
              <Route path="account" element={<Account />} />
              <Route path="change-password" element={<UserChangePassword />} />
              <Route index element={<Navigate to="home" />} />
            </Route>

            {/* Redirect / to login */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
