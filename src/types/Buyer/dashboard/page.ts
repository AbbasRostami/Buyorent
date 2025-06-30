export interface LastetResevesType {
  id: number;
  title: string;
  date: string;
  price: number;
  status: "تایید شده" | "در انتظار" | "لغو شده";
  image: string;
}
