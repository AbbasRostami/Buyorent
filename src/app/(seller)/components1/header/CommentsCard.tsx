import { FaCommentMedical } from "react-icons/fa";
import { useSidebar } from "../../context/SidebarContext";

const CommentsCard = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  if (!isExpanded && !isHovered && !isMobileOpen) {
    return (
      <div className="w-full flex-shrink-0 px-2 pb-6 mt-auto flex justify-center">
        <FaCommentMedical
          className="text-gray-700 dark:text-gray-200"
          size={32}
        />
      </div>
    );
  }

  return (
    <>
      <div
        className="w-full flex-shrink-0 px-2 pb-6 mt-auto cursor-pointer transition-all duration-300"
        style={{ direction: "rtl" }}
      >
        <div className="flex items-center justify-between  border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 px-4 py-3 shadow-sm transition-all duration-300 w-full min-h-[70px]">
          <div className="flex flex-col items-start gap-1">
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              نظرات جدید
            </span>
            <span className="text-xs text-gray-400 mt-1">5 نظر جدید</span>
          </div>
          <FaCommentMedical
            className="text-gray-700 dark:text-gray-200"
            size={28}
          />
        </div>
      </div>
    </>
  );
};

export default CommentsCard;
