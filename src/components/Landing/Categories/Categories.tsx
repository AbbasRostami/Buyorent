import { useServerData } from "@/utils/hooks/useServerData";
import CategorySwiper from "./CategorySwiper";

export default async function Categories() {
  const categories = await useServerData("/categories", "categories");

  console.log("categories: ", categories);

  return <CategorySwiper categories={categories} />;
}
