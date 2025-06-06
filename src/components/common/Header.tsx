"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  User,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import Image from "next/image";
import { HiOutlineUser } from "react-icons/hi2";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import logo from "./../../assets/Landing/logo.png";
import AuthModal from "../auth/AuthModal";
import { signOut, useSession } from "next-auth/react";
import { ThemeSwitcher } from "@/context/ThemeSwitcher";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session } = useSession();

  const navItems = [
    { label: "خانه", href: "/" },
    { label: "رهن و اجاره", href: "/mortgage-and-house-rent" },
    { label: "رزرو سریع", href: "/houses-reserve" },
    { label: "مقالات", href: "/blogs" },
    { label: "درباره ما", href: "/contact-us" },
  ];

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await signOut({ redirect: false });
        toast.success("خروج با موفقیت انجام شد");
      } catch (err) {
        toast.error("خطا در هنگام خروج");
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed step-1 top-0 z-50 w-full transition-transform duration-500 ease-in-out">
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className={clsx(
          "transition-all duration-700 ease-in-out w-full dark:bg-[#0a192f]/80",
          isScrolled
            ? "mt-4 max-w-[calc(100%-3rem)] mx-auto rounded-2xl shadow-md md:block hidden"
            : "mt-0 max-w-full"
        )}
      >
        <NavbarContent justify="start">
          <NavbarBrand>
            <Image
              src={logo}
              priority
              alt="logo"
              width={146}
              height={48}
              className="w-24 md:w-28 lg:w-32 h-auto cursor-pointer"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-2" justify="center">
          {navItems.map((item, index) => (
            <NavbarItem
              key={item.href}
              className="relative flex items-center group gap-2"
            >
              <Link
                href={item.href}
                className={clsx(
                  "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  "ml-2 relative pb-1 hover:-translate-y-0.5",
                  "before:absolute before:bottom-0 before:left-0 before:w-0",
                  "before:h-[2px] before:bg-amber-500 before:transition-all before:duration-300",
                  "hover:before:w-full",
                  "text-sm md:text-base lg:text-lg",
                  pathname === item.href
                    ? "text-amber-600 font-semibold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text"
                    : "text-gray-700 hover:text-amber-600"
                )}
              >
                <span className="relative z-10 dark:text-white">
                  {item.label}
                </span>
              </Link>

              {index < navItems.length - 1 && (
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-2 md:mx-3" />
              )}
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle
            className="dark:text-white"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="hidden md:flex" justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
          {session?.accessToken ? (
            <div className="flex items-center gap-4" dir="rtl">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                    }}
                    className="transition-transform text-right cursor-pointer hover:-translate-y-0.5"
                    description=""
                    name=""
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2 text-right">
                    <p className="font-bold">وارد شده با</p>
                    <p className="font-bold">{session?.user?.email}</p>
                  </DropdownItem>
                  <DropdownItem
                    key="settings"
                    onPress={() => router.push("/buyer/dashboard")}
                  >
                    تنظیمات من
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between gap-2 cursor-pointer text-red-600"
                      disabled={isPending}
                    >
                      <span>{isPending ? "در حال خروج..." : "خروج"}</span>
                      {isPending ? (
                        <FaSpinner className="animate-spin" size={20} />
                      ) : (
                        <HiOutlineUser size={20} />
                      )}
                    </button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <NavbarItem className="border-1.5 border-amber-700 px-2 py-1 rounded-xl">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#543000] dark:text-white flex gap-1.5 text-sm md:text-base lg:text-lg cursor-pointer whitespace-nowrap"
              >
                ثبت نام / ورود
                <HiOutlineUser size={20} className="md:w-6 hidden lg:block md:h-6" />
              </button>
            </NavbarItem>
          )}
        </NavbarContent>

        <AuthModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

        <NavbarMenu
          className={clsx(
            "bg-white dark:bg-[#0a192f]",
            "w-[80%] max-w-[400px]",
            "right-0 left-auto",
            "border-r-0 border-l border-gray-200 dark:border-gray-700",
            "shadow-[-4px_0_15px_rgba(0,0,0,0.1)]"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 pt-16">
              {navItems.map((item) => (
                <NavbarMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "w-full text-lg py-3 px-4 block",
                      pathname === item.href
                        ? "text-amber-600 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex flex-col gap-4">
                <NavbarMenuItem>
                  <div className="w-full flex justify-between items-center px-4">
                    <span className="text-gray-700 dark:text-gray-300">
                      تغییر تم
                    </span>
                    <ThemeSwitcher />
                  </div>
                </NavbarMenuItem>

                {session?.accessToken ? (
                  <NavbarMenuItem>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-red-600 flex items-center justify-between gap-2 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      disabled={isPending}
                    >
                      <span>{isPending ? "در حال خروج..." : "خروج"}</span>
                      {isPending ? (
                        <FaSpinner className="animate-spin" size={20} />
                      ) : (
                        <HiOutlineUser size={20} />
                      )}
                    </button>
                  </NavbarMenuItem>
                ) : (
                  <NavbarMenuItem>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-[#543000] dark:text-white flex items-center justify-between gap-2 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <span>ثبت نام / ورود</span>
                      <HiOutlineUser size={20} />
                    </button>
                  </NavbarMenuItem>
                )}
              </div>
            </div>
          </div>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
