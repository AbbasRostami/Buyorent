"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
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
import { usePathname } from "next/navigation";
import clsx from "clsx";
import logo from "./../../assets/Landing/logo.png";
import RegisterModal from "../auth/RegisterModal";
import { customLogout } from "@/services/logout";
import { signOut, useSession } from "next-auth/react";
import { ThemeSwitcher } from "@/context/ThemeSwitcher";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { label: "خانه", href: "/" },
    { label: "مقالات", href: "/houses" },
    { label: "درباره ما", href: "/rentpage" },
  ];

  const menuItems = ["پروفایل", "مقالات", "درباره ما", "خروج"];

  const currentPath = pathname;

  const { data: session } = useSession();
  console.log("Log session: ", session);

  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        if (session?.refreshToken) {
          await customLogout(session.refreshToken);
        } else {
          await signOut();
        }
        toast.success("خروج با موفقیت انجام شد");
      } catch (err) {
        toast.error("خطا در هنگام خروج");
      }
    });
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={clsx(
        "fixed top-0 z-50 w-full transition-transform duration-500 ease-in-out"
      )}
    >
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className={clsx(
          "transition-all duration-700  ease-in-out w-full dark:bg-[#0a192f]",
          " dark:bg-[#0a192f]/80",

          isScrolled
            ? "mt-4 max-w-[calc(100%-3rem)] mx-auto rounded-2xl shadow-md"
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
              className="w-24  md:w-28 lg:w-32 h-auto cursor-pointer"
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4" justify="center">
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
                  currentPath === item.href
                    ? "text-amber-600 font-semibold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text"
                    : "text-gray-700 hover:text-amber-600"
                )}
              >
                <span className="relative z-10 text-xl dark:text-white">
                  {item.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <span
                className={clsx(
                  "absolute -right-3 top-1/2 -translate-y-1/2",
                  "w-2 h-2 rounded-full transition-all duration-300",
                  "shadow-[0_0_8px_rgba(251,191,36,0.3)]",
                  currentPath === item.href
                    ? "bg-amber-500 animate-pulse-scale "
                    : "bg-transparent"
                )}
              />

              {index < navItems.length - 1 && (
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-3 relative">
                  <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-[1px]" />
                </div>
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
                <DropdownItem key="settings">تنظیمات من</DropdownItem>
                <DropdownItem key="team_settings">تنظیمات تیم</DropdownItem>
                <DropdownItem key="configurations">پیکربندی‌ها</DropdownItem>
                <DropdownItem key="help_and_feedback">راهنما و بازخورد</DropdownItem>
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
                className="text-[#543000] dark:text-white flex gap-1.5 text-lg cursor-pointer"
              >
                ثبت نام / ورود <HiOutlineUser size={25} />
              </button>
            </NavbarItem>
          )}
        </NavbarContent>

        <RegisterModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}

          {session?.accessToken ? (
            <NavbarMenuItem>
              <button
                onClick={handleLogout}
                className="text-[#543000] flex gap-1.5 text-lg cursor-pointer dark:text-amber-50"
              >
                خروج <HiOutlineUser size={25} />
              </button>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#543000] dark:text-white flex gap-1.5 text-lg cursor-pointer"
              >
                ثبت نام / ورود <HiOutlineUser size={25} />
              </button>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
