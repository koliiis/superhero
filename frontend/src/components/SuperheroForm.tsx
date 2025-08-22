import { useState, useEffect } from "react";
import {
  createSuperhero,
  updateSuperhero,
  getSuperhero,
  deleteSuperhero,
} from "../api";
import { Trash2 } from "lucide-react";
import type { Superhero } from "../types/superhero";

interface Props {
  id?: number;
  onSaved: () => void;
  onCancel: () => void;
  onDeleted: () => void;
}

export default function SuperheroForm({ id, onSaved, onCancel, onDeleted }: Props) {
  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: [] as (string | File)[],
  });

  useEffect(() => {
    if (id) {
      getSuperhero(id).then((data: Superhero) => {
        setForm({
          nickname: data.nickname,
          real_name: data.real_name,
          origin_description: data.origin_description,
          superpowers: data.superpowers,
          catch_phrase: data.catch_phrase,
          images: data.images.map((img) => img.url),
        });
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    setForm((f) => {
      const imgs = [...f.images];
      imgs[index] = value;
      return { ...f, images: imgs };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((f) => ({
        ...f,
        images: [...f.images, ...Array.from(e.target.files!)],
      }));
    }
  };

  const addImageField = () =>
    setForm((f) => ({ ...f, images: [...f.images, ""] }));

  const removeImageField = (index: number) => {
    setForm((f) => {
      const imgs = [...f.images];
      imgs.splice(index, 1);
      return { ...f, images: imgs };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const action = id ? updateSuperhero(id, form) : createSuperhero(form);
    action.then(onSaved);
  };

  const handleDelete = () => {
    if (id) {
      deleteSuperhero(id).then(() => {
        onDeleted();
        onSaved();
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4 text-black"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {id ? "Edit Superhero" : "Add New Superhero"}
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Nickname</label>
        <input
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
          placeholder="Nickname"
          required
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Real Name</label>
        <input
          name="real_name"
          value={form.real_name}
          onChange={handleChange}
          placeholder="Real Name"
          required
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Origin</label>
        <textarea
          name="origin_description"
          value={form.origin_description}
          onChange={handleChange}
          placeholder="Origin description"
          required
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Superpowers</label>
        <textarea
          name="superpowers"
          value={form.superpowers}
          onChange={handleChange}
          placeholder="Superpowers"
          required
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Catch Phrase</label>
        <input
          name="catch_phrase"
          value={form.catch_phrase}
          onChange={handleChange}
          placeholder="Catch Phrase"
          required
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Images</label>
        {form.images.map((img, i) =>
          typeof img === "string" ? (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                value={img}
                onChange={(e) => handleImageChange(i, e.target.value)}
                placeholder="Image URL"
                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => removeImageField(i)}
                className="cursor-pointer px-2 py-1 text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <div key={i} className="flex items-center gap-2 mb-2 text-gray-700">
              📁 {img.name}
              <button
                type="button"
                onClick={() => removeImageField(i)}
                className="cursor-pointer px-2 py-1 text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          )
        )}
        <button
          type="button"
          onClick={addImageField}
          className="block cursor-pointer text-blue-600 text-sm hover:underline"
        >
          + Add image URL
        </button>

        <label className="block cursor-pointer text-blue-600 text-sm hover:underline">
          + Select Images
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-red-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        {id && (
          <button
            onClick={handleDelete}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>
    </form>
  );
}