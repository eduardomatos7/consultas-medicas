import { useState } from 'react';
import { Button } from '../components/Button';
import { TextField } from '../components/FormField';
import { ComboField } from '../components/ComboField';
import ValidationCard from '../components/ValidationCard';
import type { ComboOption } from '../interfaces/combobox';

export default function ScheduleAppointment() {
  const especialidades: ComboOption[] = [
    { value: 'cardiologia1', label: 'Cardiologia1' },
    { value: 'cardiologia2', label: 'Cardiologia2' },
    { value: 'cardiologia3', label: 'Cardiologia3' },
    { value: 'cardiologia4', label: 'Cardiologia4' },
    { value: 'cardiologia5', label: 'Cardiologia5' },
  ];
  const [especialidade, setEspecialidade] = useState<string | null>(null);
  return (
    <div className="flex w-full justify-center px-4 py-10 md:py-14">
      <div className="grid w-full max-w-4xl gap-10 md:grid-cols-5">
        <section className="flex flex-col gap-6 md:col-span-2">
          <div>
            <h1 className="from-textPink bg-gradient-to-t to-[#634DCA] bg-clip-text text-3xl leading-normal font-extrabold text-transparent md:text-4xl">
              Agendar Consulta
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#2d1b52]/80">
              Preencha os campos ao lado para estruturar um novo agendamento.
            </p>
          </div>
          <ValidationCard />
        </section>
        <form
          className="flex flex-col gap-6 rounded-2xl border border-[#D6D3F9] bg-white p-6 shadow-lg md:col-span-3"
          onSubmit={e => e.preventDefault()}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="nomePaciente"
                label="Nome do Paciente"
                placeholder="Ex: Maria da Silva"
                required
              />
              <TextField id="cpf" label="CPF" placeholder="000.000.000-00" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="nomeMedico"
                label="Nome do Médico"
                placeholder="Ex: Dr. José da Silva"
                required
              />
              <ComboField
                id="especialidade"
                label="Especialidade"
                required
                options={especialidades}
                value={especialidade}
                onChange={setEspecialidade}
                placeholder="Selecione ou pesquise"
                noOptionsMessage="Nenhuma especialidade encontrada"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="dataConsulta" label="Data da Consulta" type="date" required />
              <TextField id="horaConsulta" label="Hora da Consulta" type="time" required />
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Button variant="primaryGhost" className="flex-1">
              Agendar consulta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
