import { useEffect, useState } from "react";
import { getSuperhero, deleteSuperhero } from "../api";
import { X, Trash2 } from "lucide-react";
import type { Superhero } from "../types/superhero";

interface Props {
  id: number;
  onClose: () => void;
  onDeleted: () => void;
  onEdit: (id: number) => void;
}

export default function SuperheroDetail({ id, onClose, onDeleted, onEdit }: Props) {
  const [superhero, setSuperhero] = useState<Superhero | null>(null);

  useEffect(() => {
    getSuperhero(id).then(setSuperhero);
  }, [id]);

  if (!superhero) return null;

  const handleDelete = () => {
    deleteSuperhero(superhero.id).then(() => {
      onDeleted();
      onClose();
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{superhero.nickname}</h2>
        <button
          onClick={onClose}
          className="cursor-pointer p-2 rounded-lg hover:bg-neutral-300 transition bg-neutral-100"
          title="Close"
        >
          <X className="w-5 h-5 text-black" />
        </button>
      </div>

      <div className="space-y-2 text-gray-700">
        <p><span className="font-semibold">Real Name:</span> {superhero.real_name}</p>
        <p><span className="font-semibold">Origin:</span> {superhero.origin_description}</p>
        <p><span className="font-semibold">Superpowers:</span> {superhero.superpowers}</p>
        <p><span className="font-semibold">Catch Phrase:</span> {superhero.catch_phrase}</p>
      </div>

      {superhero.images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {superhero.images.map((img) => {
            const src = img.url.startsWith('http') ? img.url : `http://localhost:3000${img.url}`;

            return (
              <img
                key={img.id}
                src={src}
                alt={superhero.nickname}
                className="h-60 object-contain rounded-lg shadow"
              />
            )
          })}
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(id);
          }}
          className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
