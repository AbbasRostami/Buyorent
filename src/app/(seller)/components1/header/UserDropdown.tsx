import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { confirm } from "@/components/common/ConfirmModal";

export default function UserDropdown() {
  return (
    <>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="فروشنده"
            name="عباس رستمی"
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
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform"
              description="+989366666666"
              name="عباس رستمی"
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
