import CommentsTable, { CommentsData } from "./Table/CommentsTable";

const data: CommentsData[] = [
  {
    id: 1,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "این کامنت به صورت خودکار ایجاد شده است",
    status: "تایید شده",
  },
  {
    id: 2,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "این کامنت به صورت خودکار ایجاد شده است",
    status: "تایید نشده",
  },
  {
    id: 3,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "این کامنت به صورت خودکار ایجاد شده است",
    status: "تایید نشده",
  },
  {
    id: 4,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "عالی  شده است",
    status: "تایید شده",
  },
  {
    id: 5,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "عالی  شده است",
    status: "تایید نشده",
  },
  {
    id: 6,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "عالی  کامنتتتتت است",
    status: "تایید نشده",
  },
  {
    id: 7,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "عالی  کامنتتتتت است",
    status: "تایید شده",
  },
  {
    id: 8,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "عالی  کامنتتتتت است",
    status: "تایید نشده",
  },
  {
    id: 9,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "عالی  کامنتتتتت است",
    status: "تایید شده",
  },
  {
    id: 10,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "عالی  کامنتتتتت است",
    status: "تایید شده",
  },
  {
    id: 11,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "عالی  کامنتتتتت است",
    status: "تایید نشده",
  },
  {
    id: 12,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "عالی  کامنتتتتت است",
    status: "تایید شده",
  },
  {
    id: 13,
    numbertransaction: "1234567890",
    date: "1403/02/01/ 10:00",
    comment: "عالی  کامنتتتتت است",
    status: "تایید نشده",
  },
];
export default function CommentsManagementPage() {
  return (
    <div>
      <CommentsTable commentsData={data || []} />
    </div>
  );
}
