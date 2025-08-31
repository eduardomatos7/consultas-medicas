import { ButtonLink } from '../components/Button';

export default function Home() {
  return (
    <section className="flex w-full items-center justify-center px-6 py-14">
      <div className="mx-auto grid max-w-4xl items-center gap-10">
        <div className="flex flex-col gap-6">
          <h1 className="font-figtree to-textPink bg-gradient-to-b from-[#674ac8] via-[#6a50a7] bg-clip-text text-4xl leading-snug font-bold text-transparent md:text-5xl">
            Agendamento de Consultas
          </h1>
          <p className="text-secondary text-justify text-base leading-relaxed md:text-start md:text-lg">
            Bem vindo! Aqui você organiza seus atendimentos de forma simples e estruturado. Gerencie
            consultas marcando em horários disponíveis clicando no
            <span className="text-span font-bold"> botão abaixo </span> para agendar uma consulta.
            Tudo isso com uma interface clara e intuitiva pensada para proporcionar agilidade e foco
            no cuidado.
          </p>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <ButtonLink to="/agendar" variant="primary" className="min-w-[200px]">
              Agendar uma consulta
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
