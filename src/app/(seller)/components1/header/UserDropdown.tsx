import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

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

          <DropdownItem color="primary" key="settings" textValue="موجودی قابل برداشت">
            <div className="flex items-center gap-2">
              <FaPlusCircle />
              موجودی قابل برداشت
            </div>
          </DropdownItem>

          <DropdownItem
            textValue="خروج از حساب کاربری"
            key="logout"
            color="danger"
            onPress={() => {
              setTimeout(() => {
                Swal.fire({
                  title: "خروج از حساب کاربری",
                  text: "آیا مطمئن هستید؟",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "خروج",
                  cancelButtonText: "انصراف",
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#aaa",
                  customClass: {
                    popup: "rounded-2xl shadow-lg dark:bg-gray-800",
                    title: "text-lg font-bold text-gray-800 dark:text-white",
                    htmlContainer: "text-sm text-gray-600 dark:text-gray-300",
                    cancelButton:
                      "bg-color2/20 hover:bg-color3 text-black dark:text-white px-4 py-2 rounded-md ml-2",
                    confirmButton:
                      "bg-color1  text-white px-4 py-2 ml-2 rounded-md",
                  },
                  buttonsStyling: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    signOut({ callbackUrl: "/" });
                  }
                });
              }, 0);
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
