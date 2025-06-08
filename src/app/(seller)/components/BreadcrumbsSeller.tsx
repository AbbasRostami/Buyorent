"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs as HeroBreadcrumbs, BreadcrumbItem } from "@heroui/react";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const routeMap: { [key: string]: string } = {
  dashboard: "داشبورد",
  profile: "پروفایل",
  "realstates-management": "مدیریت املاک",
  "booking-management": "مدیریت رزرو",
  "financial-management": "مدیریت مالی",
  "comments-management": "مدیریت نظرات",
  announcements: "مدیریت اعلان‌ها",
};

export default function SellerBreadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const sellerIndex = paths.indexOf("seller");
  if (sellerIndex !== -1) {
    paths.splice(sellerIndex, 1);
  }

  return (
    <HeroBreadcrumbs
      className="!pl-0 !pr-0 !pb-4 !pt-0"
      separator={<MdKeyboardDoubleArrowRight size={20} />}
      size="lg"
      color="warning"
      variant="solid"
      underline="focus"
    >
      <BreadcrumbItem>
        <Link href="/seller/dashboard">خانه</Link>
      </BreadcrumbItem>
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        const label = routeMap[path] || path;

        return (
          <BreadcrumbItem key={path}>
            {index === paths.length - 1 ? (
              label
            ) : (
              <Link href={href}>{label}</Link>
            )}
          </BreadcrumbItem>
        );
      })}
    </HeroBreadcrumbs>
  );
}
