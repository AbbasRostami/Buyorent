import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure,
  User,
} from "@heroui/react";
import { FaBell, FaPlusCircle, FaUser, FaSignOutAlt } from "react-icons/fa";
import { HiOutlineBellAlert } from "react-icons/hi2";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GiRingingBell } from "react-icons/gi";
export default function UserDropdown() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
            description="خریدار"
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

          <DropdownItem key="settings" textValue="شارژ کردن کیف پول">
            <div className="flex items-center gap-2">
              <FaPlusCircle />
              شارژ کردن کیف پول
            </div>
          </DropdownItem>
          <DropdownItem
            onPress={onOpen}
            key="team_settings"
            textValue="تنظیمات نوتیفیکیشن ها"
          >
            <div className="flex items-center gap-2">
              <FaBell />
              تنظیمات نوتیفیکیشن ها
            </div>
          </DropdownItem>
          <DropdownItem
            key="system"
            onPress={() => router.push("/profile")}
            textValue="ویرایش اطلاعات کاربری"
          >
            <div className="flex items-center gap-2">
              <FaUser />
              ویرایش اطلاعات کاربری
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          <>
            <ModalHeader className="flex  gap-2  text-2xl  font-normal">
              <GiRingingBell />
              تنظیمات نوتیفیکیشن
            </ModalHeader>
            <ModalBody className="flex flex-col gap-10 text-right border-dotted border-t-2 py-4 border-color1">
              <div className="flex items-center justify-between flex-row">
                <span className="text-xl font-normal">نوتیفیکیشن رزرو</span>
                <Switch defaultSelected color="warning" />
              </div>
              <div className="flex items-center justify-between flex-row">
                <span className="text-xl font-normal">نوتیفیکیشن پرداخت</span>
                <Switch color="warning" />
              </div>
              <div className="flex items-center justify-between flex-row">
                <span className="text-xl font-normal">نوتیفیکیشن تخفیف</span>
                <Switch defaultSelected color="warning" />
              </div>
              <div className="flex items-center justify-between flex-row">
                <span className="text-xl font-normal">نوتیفیکیشن سیستمی</span>
                <Switch defaultSelected color="warning" />
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
