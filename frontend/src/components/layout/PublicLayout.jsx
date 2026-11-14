import { Outlet, useLocation } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';
import FloatingContact from '../ui/FloatingContact';

export default function PublicLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main key={pathname} className="flex-1 page-enter">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
