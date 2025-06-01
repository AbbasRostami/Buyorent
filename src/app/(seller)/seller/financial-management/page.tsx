import FinancialTable, { BookingData } from "./FinancialTable";

const data: BookingData[] = [
  {
    id: 1,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 150000000,
    status: "تایید شده",
    type: "شارژ کیف پول",
  },
  {
    id: 2,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 150000000,
    status: "تایید نشده",
    type: "رزرو",
  },
  {
    id: 3,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 160000000,
    status: "تایید نشده",
    type: "رزرو",
  },
  {
    id: 4,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 180000000,
    status: "تایید شده",
    type: "رزرو",
  },
  {
    id: 5,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 170000000,
    status: "تایید نشده",
    type: "رزرو",
  },
  {
    id: 6,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 170000000,
    status: "تایید نشده",
    type: "رزرو",
  },
  {
    id: 7,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 100000,
    status: "تایید شده",
    type: "شارژ کیف پول",
  },
  {
    id: 8,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 160000000,
    status: "تایید نشده",
    type: "رزرو",
  },
  {
    id: 9,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 190000000,
    status: "تایید شده",
    type: "شارژ کیف پول",
  },
  {
    id: 10,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 170000000,
    status: "تایید شده",
    type: "رزرو",
  },
  {
    id: 11,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 170000000,
    status: "تایید نشده",
    type: "شارژ کیف پول",
  },
  {
    id: 12,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 170000000,
    status: "تایید شده",
    type: "رزرو",
  },
  {
    id: 13,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    price: 186600000,
    type: "رزرو",
    status: "تایید نشده",
  },
];
export default function FinancialManagementPage() {
  return (
    <div>
      <FinancialTable data={data || []} />
    </div>
  );
}
