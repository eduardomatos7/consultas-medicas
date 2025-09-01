import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { schedule } from '../schemas/scheduleAppointmentSchema';
import type { scheduleSchemaType } from '../types/schedule.types';
import { formatCpfInput, unmaskCpf } from '../utils/cpf';
import { buildAppointmentPayload } from '../utils/schedule';

export function useScheduleForm() {
  const form = useForm<scheduleSchemaType>({
    resolver: zodResolver(schedule),
    mode: 'onSubmit',
    defaultValues: {
      patientName: '',
      patientCPF: '',
      doctorName: '',
      specialty: '',
      date: '',
      time: '',
    },
  });

  const { setValue, setFocus, watch, handleSubmit, reset } = form;
  const cpfValue = watch('patientCPF') || '';

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { formatted, digits } = formatCpfInput(e.target.value);
    setValue('patientCPF', formatted, { shouldValidate: true, shouldDirty: true });
    if (digits.length === 11) setFocus('doctorName');
  };

  const submit = handleSubmit(
    async data => {
      const payload = buildAppointmentPayload({
        patientName: data.patientName,
        patientCPF: unmaskCpf(data.patientCPF),
        doctorName: data.doctorName,
        specialty: data.specialty,
        date: data.date,
        time: data.time,
      });
      console.log(payload);
      await new Promise(r => setTimeout(r, 600));
      reset();
      setFocus('patientName');
    },
    errors => {
      const first = Object.keys(errors)[0] as keyof scheduleSchemaType | undefined;
      if (first) setFocus(first);
    }
  );

  return { ...form, submit, handleCpfChange, cpfValue };
}
