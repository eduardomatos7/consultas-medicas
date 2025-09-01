import { FiTrash2 } from 'react-icons/fi';

interface ActionMenuProps {
  onDelete: () => void;
}

export function ActionMenu({ onDelete }: ActionMenuProps) {
  return (
    <div
      className="border-background-button/20 absolute top-full right-0 z-20 mt-2 w-40 overflow-hidden rounded-md border bg-white shadow-lg"
      data-appointments-menu
    >
      <button
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
        onClick={onDelete}
      >
        <FiTrash2 /> Excluir
      </button>
    </div>
  );
}
