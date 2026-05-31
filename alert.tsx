import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-western-cream">
      <Header />
      <main className="flex-1 pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
