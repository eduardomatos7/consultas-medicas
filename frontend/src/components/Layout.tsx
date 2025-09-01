import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

import Footer from './Footer';
import Header from './Header';
export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#F4F0FF] text-[#000]">
      <Header />
      <main className="flex flex-1">
        <Outlet />
        <ToastContainer position="top-right" autoClose={3000} theme="light" newestOnTop />
      </main>
      <Footer />
    </div>
  );
}
