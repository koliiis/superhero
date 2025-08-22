import { useState } from "react";
import SuperheroList from "../components/SuperheroList";
import SuperheroForm from "../components/SuperheroForm";
import { useSuperheroes } from "../hooks/useSuperhero";
import SuperheroDetail from "../components/SuperheroDetail";

export default function SuperheroPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const { superheroes, loading, fetchData } = useSuperheroes(page);

  const handleSaved = () => {
    setEditingId(null);
    fetchData();
  };

  const showRightColumn = editingId !== null || selectedId !== null;

  return (
    <div className={`mx-auto px-18 pt-8 text-black space-y-6 md:space-y-0 md:grid md:gap-8 ${
        showRightColumn ? "md:grid-cols-2" : "md:grid-cols-1"
      }`}
    >
      <div className="shadow rounded-2xl p-6 bg-neutral-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Superhero Database
        </h1>

        <button
          onClick={() => setEditingId(0)}
          className="cursor-pointer mb-6 px-5 py-2 bg-neutral-900 text-white rounded-xl hover:bg-neutral-700 shadow-sm transition w-full md:w-auto"
        >
          ➕ Add New Superhero
        </button>

        {loading && <p className="text-gray-500 italic">Loading superheroes...</p>}
        {!loading && !superheroes.length && (
          <p className="text-gray-500 italic">No superheroes found 🦸‍♂️</p>
        )}

        {!loading && superheroes.length > 0 && (
          <SuperheroList
            superheroes={superheroes}
            onSelect={setSelectedId}
            onEdit={setEditingId}
            fullWidth={!showRightColumn}
          />
        )}

        <div className="mt-6 flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 text-white rounded-lg transition 
              ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-neutral-900 hover:bg-neutral-700 cursor-pointer"}`}
          >
            ⬅ Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={superheroes.length < 5}
            className={`px-4 py-2 text-white rounded-lg transition 
              ${superheroes.length < 5 ? "bg-gray-400 cursor-not-allowed" : "bg-neutral-900 hover:bg-neutral-700 cursor-pointer"}`}
          >
            Next ➡
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {editingId !== null && (
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {editingId === 0 ? "➕ Add New Superhero" : "✏️ Edit Superhero"}
            </h2>
            <SuperheroForm
              id={editingId || undefined}
              onSaved={handleSaved}
              onCancel={() => setEditingId(null)}
              onDeleted={fetchData}
            />
          </div>
        )}

        {selectedId !== null && (
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🦸 Superhero Details
            </h2>
            <SuperheroDetail
              id={selectedId}
              onClose={() => setSelectedId(null)}
              onDeleted={fetchData}
              onEdit={setEditingId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
