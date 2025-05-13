import { Accordion, AccordionItem } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { IoHeartCircleOutline } from "react-icons/io5";
import moment from "moment-jalaali";
import image2 from "../../assets/Avatar1.png";
import image from "../../assets/Avatar2.png";
import { useGet } from "@/utils/hooks/useReactQueryHooks";
moment.loadPersian();
const CommentSingleHouses = ({ houseId }) => {
  const { data: allComments = [] } = useGet<any[]>(`/houses/${houseId}/comments`);

  // تقسیم‌بندی کامنت‌ها
  const parentComments = allComments.filter(comment => comment.parent_comment_id === null);
  const replies = allComments.filter(comment => comment.parent_comment_id !== null);

  // اتصال ریپلای‌ها به والدشان
  const commentsWithReplies = parentComments.map(parent => ({
    ...parent,
    replies: replies.filter(reply => reply.parent_comment_id === parent.id),
  }));

  return (
    <div className="mt-6 space-y-6">
      {commentsWithReplies.map((comment) => (
        <div
          key={comment.id}
          className="bg-[#f9f9f9] dark:bg-gray-800 rounded-2xl p-4 shadow-sm space-y-4"
        >
          {/* نویسنده، تاریخ، و متن کامنت اصلی */}
          <div className="flex items-center gap-3">
            <Image src={image2} alt="avatar" className="w-9 h-9 rounded-full" />
            <div className="text-sm font-medium">
              <span>{comment.user?.fullName}</span>
              <span className="text-color1 mx-2">در</span>
              <span className="text-gray-500 dark:text-gray-300/85">
              { moment(comment.created_at).format('jYYYY/jMM/jDD')}
              </span>
            </div>
          </div>

          <p className="text-medium font-semibold text-gray-800 dark:text-amber-50 leading-6">
            {comment.caption}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-100">
            <div className="flex items-center gap-3">
              <IoHeartCircleOutline className="text-color2" size={22} />
              <span className="text-color2 font-bold text-medium">{comment.rating}</span>
              <span className="text-color2 font-bold text-medium cursor-pointer">پاسخ دادن</span>
            </div>
          </div>

          {/* نمایش ریپلای‌ها در آکاردئون */}
          {comment.replies.length > 0 && (
            <Accordion selectionMode="multiple">
              <AccordionItem
                aria-label={`پاسخ‌های کامنت ${comment.id}`}
                title={
                  <span className="text-sm font-bold text-gray-500 dark:text-amber-200/75 cursor-pointer">
                    مشاهده {comment.replies.length} پاسخ
                  </span>
                }
              >
                <div className="mt-4 space-y-4 border-r-2 pr-4 border-gray-200 ">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 shadow-sm space-y-2"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Image src={image} alt="avatar" className="w-7 h-7 rounded-full" />
                        <div className="text-sm font-medium">
                          <span>{reply.user?.fullName}</span>
                          <span className="text-color1 mx-2">در</span>
                          <span className="text-gray-500 dark:text-gray-300/85">
                            {moment(reply.created_at).format('jYYYY/jMM/jDD')}
                          </span>
                        </div>
                      </div>
                      <p className="text-medium font-semibold dark:text-amber-50 text-gray-800 leading-6">
                        {reply.caption}
                      </p>

                      <div className="text-xs text-color2 font-bold cursor-pointer mt-1 pr-10 text-right">
                        پاسخ دادن
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSingleHouses;
