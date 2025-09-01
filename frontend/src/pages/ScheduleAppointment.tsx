import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import { Button } from '../components/Button';
import { ComboField } from '../components/ComboField';
import { TextField } from '../components/FormField';
import ValidationCard from '../components/ValidationCard';
import { fetchEspecialidades } from '../config';
import { useScheduleForm } from '../hooks/useScheduleForm';

export default function ScheduleAppointment() {
  const {
    register,
    control,
    submit,
    handleCpfChange,
    cpfValue,
    formState: { errors, isSubmitting },
  } = useScheduleForm();

  const [especialidades, setEspecialidades] = useState<{ label: string; value: string }[]>([]);
  const [loadingEspecialidades, setLoadingEspecialidades] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoadingEspecialidades(true);
    fetchEspecialidades()
      .then(list => {
        if (mounted) setEspecialidades(list);
      })
      .finally(() => mounted && setLoadingEspecialidades(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex w-full justify-center px-4 py-10 md:items-center md:py-14">
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
          className="flex flex-col gap-6 rounded-2xl border border-[#D6D3F9] bg-white p-6 shadow-lg md:col-span-3 md:h-fit md:py-10"
          onSubmit={submit}
          noValidate
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="patientName"
                label="Nome do Paciente"
                placeholder="Ex: Maria da Silva"
                required
                error={errors.patientName?.message}
                {...register('patientName')}
              />
              {(() => {
                const { ref } = register('patientCPF');
                return (
                  <TextField
                    id="patientCPF"
                    label="CPF"
                    placeholder="000.000.000-00"
                    required
                    error={errors.patientCPF?.message}
                    ref={ref}
                    value={cpfValue}
                    onChange={handleCpfChange}
                    inputMode="numeric"
                    maxLength={14}
                  />
                );
              })()}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="doctorName"
                label="Nome do Médico"
                placeholder="Ex: Dr. José da Silva"
                required
                error={errors.doctorName?.message}
                {...register('doctorName')}
              />
              <div className="flex flex-col gap-1">
                <Controller
                  control={control}
                  name="specialty"
                  render={({ field: { onChange, value } }) => (
                    <ComboField
                      id="specialty"
                      label="Especialidade"
                      required
                      options={especialidades}
                      value={value}
                      onChange={onChange}
                      placeholder="Selecione ou pesquise"
                      noOptionsMessage={
                        loadingEspecialidades ? 'Carregando...' : 'Nenhuma especialidade encontrada'
                      }
                    />
                  )}
                />
                {errors.specialty?.message && (
                  <span className="mt-1 text-xs font-medium text-red-500" role="alert">
                    {errors.specialty.message}
                  </span>
                )}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id="date"
                label="Data da Consulta"
                type="date"
                required
                error={errors.date?.message}
                {...register('date')}
              />
              <TextField
                id="time"
                label="Hora da Consulta"
                type="time"
                required
                error={errors.time?.message}
                {...register('time')}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Button variant="primaryGhost" className="flex-1" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Agendando...' : 'Agendar consulta'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
