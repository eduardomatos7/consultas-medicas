import { Link } from 'react-router';

function Header() {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-4 md:gap-0">
        <Link
          to="/"
          className="font-poppins md:text-md from-textPink to-textPink bg-gradient-to-r via-[#634DCA] bg-clip-text font-normal text-transparent"
        >
          Consultas Médicas
        </Link>
        <nav className="font-poppins flex gap-4 text-sm md:gap-10">
          <Link to="/" className="text-secondary font-medium transition hover:text-gray-800">
            Início
          </Link>
          <Link to="/agendar" className="text-secondary font-medium transition hover:text-gray-800">
            Agendar
          </Link>
          <Link
            to="/consultas"
            className="text-secondary font-medium transition hover:text-gray-800"
          >
            Consultas
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
