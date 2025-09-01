function ValidationCard() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#D6D3F9] bg-white p-5 shadow-md">
      <div className="flex flex-col gap-1">
        <h2 className="font-inter text-sm font-semibold tracking-wide text-[#634DCA]">
          Validações
        </h2>
        <p className="text-secondary font-inter text-xs">Preencha corretamente para criar</p>
      </div>
      <ul className="text-secondary font-inter space-y-2 text-xs">
        <li> Nome completo do paciente e médico</li>
        <li> CPF no formato válido </li>
        <li> Data e hora válidas </li>
      </ul>
      <div className="grid grid-cols-3 gap-3 pt-2">
        {/* <div className="h-2 rounded-full bg-gradient-to-r from-textPink to-[#634DCA]" /> */}
        <div className="h-2 rounded-full bg-[#D6D3F9]" />
        <div className="h-2 rounded-full bg-[#D6D3F9]" />
        <div className="h-2 rounded-full bg-[#D6D3F9]" />
      </div>
    </div>
  );
}

export default ValidationCard;
