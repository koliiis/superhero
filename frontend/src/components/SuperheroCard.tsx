interface Props {
  id: number;
  image: string;
  nickname: string;
  onSelect: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function SuperheroCard({ id, image, nickname, onSelect, onEdit }: Props) {
  const src = image 
    ? image.startsWith('http') 
      ? image 
      : `http://localhost:3000${image}`
    : undefined;

  return (
    <div
      onClick={() => onSelect(id)}
      className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
    >
      {image ? (
        <img
          src={src}
          alt={nickname}
          className="w-full h-70 object-cover hover:scale-105 transition-all duration-600"
        />
      ) : (
        <div className="w-full h-70 flex items-center justify-center bg-gray-200 text-gray-500">
          No Image
        </div>
      )
      }
      <div className="p-4">
        <h3 className="text-lg font-semibold">{nickname}</h3>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => onSelect(id)}
            className="cursor-pointer px-4 py-2 text-white rounded-lg transition bg-neutral-900 hover:bg-neutral-700"
          >
            Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
            className="cursor-pointer px-4 py-2 text-cyan-500 rounded-lg transition bg-neutral-900 hover:bg-neutral-700"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

