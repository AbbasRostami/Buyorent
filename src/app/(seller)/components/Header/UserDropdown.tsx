import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  User,
} from "@heroui/react";
import { FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { confirm } from "@/components/shared/ConfirmModal";
import { useProfile } from "@/services/Profile/getProfile";
export default function UserDropdown() {
  const { user, isLoading, error } = useProfile();

  if (isLoading)
    return (
      <div className="flex items-center gap-3 w-fit px-2 py-1">
        <div>
          <Skeleton
            classNames={{
              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
            }}
            className="w-10 h-10 rounded-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Skeleton
            classNames={{
              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
            }}
            className="h-4 w-24 rounded-md"
          />
          <Skeleton
            classNames={{
              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
            }}
            className="h-3 w-16 rounded-md"
          />
        </div>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              color: "warning",
              src: user?.user?.profilePicture,
            }}
            className="transition-transform"
            description={user?.user?.role === "seller" ? "فروشنده" : "خریدار"}
            name={user?.user?.fullName}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem
            textValue="پروفایل"
            key="profile"
            className="h-14 gap-2"
          >
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                color: "primary",
                src: user?.user?.profilePicture,
              }}
              className="transition-transform"
              description={user?.user?.phoneNumber}
              name={user?.user?.fullName}
            />
          </DropdownItem>

          <DropdownItem
            color="primary"
            key="settings"
            textValue="موجودی قابل برداشت"
          >
            <div className="flex items-center gap-2">
              <FaPlusCircle />
              موجودی قابل برداشت
            </div>
          </DropdownItem>

          <DropdownItem
            textValue="خروج از حساب کاربری"
            key="logout"
            color="danger"
            onPress={async () => {
              const isConfirmed = await confirm({
                title: "آیا از خروج از حساب کاربری مطمئن هستید؟",
                description: "آیا مطمئن هستید؟",
                confirmText: "خروج",
                cancelText: "انصراف",
              });

              if (isConfirmed) {
                signOut({ callbackUrl: "/" });
              }
            }}
          >
            <div className="flex items-center gap-2">
              <FaSignOutAlt />
              خروج از حساب کاربری
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
