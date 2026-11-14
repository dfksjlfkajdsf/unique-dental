import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicLayout from './components/layout/PublicLayout';
import ScrollToTop from './components/layout/ScrollToTop';

// Public pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import Gallery from './pages/public/Gallery';
import Branches from './pages/public/Branches';
import BranchDetail from './pages/public/BranchDetail';
import Dentists from './pages/public/Dentists';

// Auth pages
import Login from './pages/auth/Login';
// import Register from './pages/auth/Register'; // disabled — patient registration hidden for now

// Patient pages — kept but not routed (re-enable when patient portal is ready)
// import Dashboard from './pages/patient/Dashboard';
// import MyAppointments from './pages/patient/MyAppointments';
// import BookAppointment from './pages/patient/BookAppointment';
// import MyMedicalRecords from './pages/patient/MyMedicalRecords';
// import Profile from './pages/patient/Profile';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminPatients from './pages/admin/AdminPatients';
import AdminMedicalRecords from './pages/admin/AdminMedicalRecords';
import AdminGallery from './pages/admin/AdminGallery';

import { BookingProvider } from './context/BookingContext';

function AppRoutes() {
  return (
    <Routes>
      {/* Public site — has Navbar + Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/dentists" element={<Dentists />} />
        <Route path="/doctors" element={<Dentists />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/branches/:id" element={<BranchDetail />} />
      </Route>

      {/* Auth — login kept for admin access only */}
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/admin/patients" element={<AdminPatients />} />
        <Route path="/admin/medical-records" element={<AdminMedicalRecords />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <AuthProvider>
          <BookingProvider>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <AppRoutes />
          </BookingProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
