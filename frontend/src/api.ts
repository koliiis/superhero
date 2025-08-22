import type { Superhero } from "./types/superhero";
import type { SuperheroList } from "./types/superheroList";

const BASE = "http://localhost:3000";

export const getSuperheroes = async (page = 1): Promise<SuperheroList[]> => {
  const res = await fetch(`${BASE}/superheroes?page=${page}`);
  return res.json();
};

export const getSuperhero = async (id: number): Promise<Superhero> => {
  const res = await fetch(`${BASE}/superheroes/${id}`);
  return res.json();
};

const buildFormData = (
  data: Omit<Superhero, "id" | "images"> & { images: (string | File)[] }
) => {
  const formData = new FormData();
  formData.append("nickname", data.nickname);
  formData.append("real_name", data.real_name);
  formData.append("origin_description", data.origin_description);
  formData.append("superpowers", data.superpowers);
  formData.append("catch_phrase", data.catch_phrase);

  data.images.forEach((img) => {
    if (typeof img === "string") {
      formData.append("images", img);
    } else {
      formData.append("images", img);
    }
  });

  return formData;
};

export const createSuperhero = async (
  data: Omit<Superhero, "id" | "images"> & { images: (string | File)[] }
) => {
  const res = await fetch(`${BASE}/superheroes`, {
    method: "POST",
    body: buildFormData(data),
  });
  return res.json();
};

export const updateSuperhero = async (
  id: number,
  data: Omit<Superhero, "id" | "images"> & { images: (string | File)[] }
): Promise<Superhero> => {
  const res = await fetch(`${BASE}/superheroes/${id}`, {
    method: "PUT",
    body: buildFormData(data),
  });
  return res.json();
};

export const deleteSuperhero = async (id: number) => {
  const res = await fetch(`${BASE}/superheroes/${id}`, { method: "DELETE" });
  return res.json();
};
