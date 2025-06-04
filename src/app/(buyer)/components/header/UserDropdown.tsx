import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Switch,
  useDisclosure,
  User,
} from "@heroui/react";
import { FaBell, FaPlusCircle, FaUser, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GiRingingBell } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { confirm } from "../../../../components/ui/ConfirmModal";
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
            onPress={() => router.push("/buyer/profile")}
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        hideCloseButton
      >
        <ModalContent>
          <>
            <ModalHeader className="flex justify-between items-center gap-2  text-2xl  font-normal">
              <div className="flex items-center gap-2">
                <GiRingingBell />
                تنظیمات نوتیفیکیشن
              </div>
              <button
                className="flex items-center gap-2 border border-red-400 text-red-500 rounded-full px-6 py-2 text-lg font-bold hover:bg-red-50 transition"
                onClick={onOpenChange}
              >
                بستن <IoMdClose size={24} />
              </button>
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
