interface Props {
  options: {
    id: string;
    value: string;
    label: string;
  }[];
  category: "Bedrooms" | "Beds" | "Bathrooms";
  name: "bedroomsAmount" | "totalBeds" | "baths";
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RoomBedsFilter({
  options,
  category,
  name,
  handleChange,
}: Props) {
  return (
    <>
      <p>{category}</p>
      <div>
        {options.map((option) => (
          <div key={option.id}>
            <input
              onChange={handleChange}
              name={name}
              value={option.value}
              type="radio"
              id={option.id}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </div>
    </>
  );
}
