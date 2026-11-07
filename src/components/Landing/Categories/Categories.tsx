import { CategorytypeProps } from "@/types/Landing/LandingType";
import CategorySwiper from "./CategorySwiper";
import { getServerData } from "@/utils/hooks/useServerData";

export default async function Categories() {
  const categories = await getServerData<CategorytypeProps>("/categories", {
    revalidate: 60 * 60 * 24,
    tags: ["categories"],
  });

  return <CategorySwiper data={categories?.data || []} />;
}
