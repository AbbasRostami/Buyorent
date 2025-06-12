import { useServerData } from "@/utils/hooks/useServerData";
import CategorySwiper from "./CategorySwiper";
import { CategoryProps } from "@/types/Landing/LandingType";

export default async function Categories() {
  const categories = await useServerData<CategoryProps[]>(
    "/categories",
    "categories",
    60 * 60 * 24
  );

  return <CategorySwiper categories={categories} />;
}
