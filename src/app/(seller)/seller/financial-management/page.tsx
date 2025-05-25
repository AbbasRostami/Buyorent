import { FaMoneyBillTransfer } from "react-icons/fa6";

export default function FinancialManagementPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row mr-20 items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
        <div className="flex items-center gap-2">
          <FaMoneyBillTransfer
            className="text-amber-900 dark:text-amber-200 "
            size={30}
          />
          <h1 className="text-amber-500 text-3xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            مدیریت مالی
          </h1>
        </div>
      </div>
    </div>
  );
}
