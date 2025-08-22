import type { SuperheroList } from "../types/superheroList";
import SuperheroCard from "./SuperheroCard";

interface Props {
  superheroes: SuperheroList[];
  onSelect: (id: number) => void;
  onEdit: (id: number) => void;
  fullWidth?: boolean;
}

export default function SuperheroList({ superheroes, onSelect, onEdit, fullWidth }: Props) {
  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">🦸 Superheroes</h2>
      <div className={`grid gap-6 transition-all duration-500 ${
          fullWidth
            ? "grid-cols-5"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        }`}>
        {superheroes.map((sh) => (
          <SuperheroCard key={sh.id} id={sh.id} image={sh.image} nickname={sh.nickname} onSelect={onSelect} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
