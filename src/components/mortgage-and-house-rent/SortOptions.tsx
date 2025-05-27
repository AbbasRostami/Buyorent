interface SortOptionsProps {
  searchParams: URLSearchParams;
  onSortChange: (sort: string, order: string) => void;
}

const SORT_OPTIONS = [
  { label: "همه", sort: "", order: "" },
  { label: "محبوب ترین", sort: "rate", order: "desc" },
  { label: "ارزان ترین", sort: "price", order: "asc" },
  { label: "گران ترین", sort: "price", order: "desc" },
  { label: "عکس دار", sort: "photos", order: "desc" },
  { label: "پارکینگ دار", sort: "parking", order: "desc" },
  { label: "حمام دار", sort: "bathrooms", order: "desc" },
];

const SortOptions = ({ searchParams, onSortChange }: SortOptionsProps) => {
  return (
    <ul className="flex gap-3 md:gap-4 overflow-x-auto md:overflow-visible whitespace-nowrap md:px-0">
      {SORT_OPTIONS.map(({ label, sort, order }, index) => {
        const isActive =
          searchParams.get("sort") === sort &&
          searchParams.get("order") === order;

        return (
          <li
            key={index}
            onClick={() => onSortChange(sort, order)}
            className={`flex-shrink-0 w-24 cursor-pointer text-center text-base border rounded-2xl py-2 transition duration-300 ease-in-out ${
              isActive
                ? "bg-[#e89300] text-white font-bold"
                : "border-[#ccc] dark:text-amber-50 hover:bg-[#e89300] hover:text-white"
            }`}
          >
            {label}
          </li>
        );
      })}
    </ul>
  );
};

export default SortOptions;
