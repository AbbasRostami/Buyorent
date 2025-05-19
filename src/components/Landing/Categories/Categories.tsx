import { useServerData } from "@/utils/hooks/useServerData";
import CategorySwiper from "./CategorySwiper";
import { CategoryProps } from "@/types/LandingType";

export default async function Categories() {
  const categories = await useServerData<CategoryProps[]>(
    "/categories",
    "categories"
  );

  return <CategorySwiper categories={categories} />;
}
