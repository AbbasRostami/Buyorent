import { Button, useDisclosure } from "@heroui/react";
import { RiMenuSearchLine } from "react-icons/ri";
import FilterModal from "./FilterModal";

interface SearchAndFilterProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  isFilterActive: boolean;
  onClearFilters: () => void;
  onApplyFilters: (filters: any) => void;
}

const SearchAndFilter = ({
  searchValue,
  setSearchValue,
  isFilterActive,
  onClearFilters,
  onApplyFilters,
}: SearchAndFilterProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 w-full">
      <div className="relative w-full md:w-[320px] max-w-md">
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
          <RiMenuSearchLine size={25} />
        </span>
        <input
          type="text"
          placeholder="جستجو کنید..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full p-3 pr-10 text-sm border dark:text-amber-100 dark:placeholder:text-amber-50 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isFilterActive ? (
        <Button
          className="w-full md:w-24 text-sm bg-red-500 text-white p-3 rounded-2xl transition"
          onPress={onClearFilters}
        >
          حذف فیلتر
        </Button>
      ) : (
        <Button
          onPress={onOpen}
          className="w-full md:w-24 text-sm bg-[#e89300] text-white p-3 rounded-2xl transition"
        >
          فیلترها
        </Button>
      )}

      <FilterModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onApplyFilters={onApplyFilters}
      />
    </div>
  );
};

export default SearchAndFilter;
