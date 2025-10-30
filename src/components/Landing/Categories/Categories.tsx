import { useServerData } from "@/utils/hooks/useServerData";
import CategorySwiper from "./CategorySwiper";
import { CategorytypeProps } from "@/types/Landing/LandingType";

export default async function Categories() {
  const categories = await useServerData<CategorytypeProps>(
    "/categories",
    "categories",
    60 * 60 * 24
  );
  return <CategorySwiper data={categories?.data} />;
}
