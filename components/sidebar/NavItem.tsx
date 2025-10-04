import { Images } from "@/public/assets";

export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: Images.dashboard,
  },
  {
    label: "Product",
    href: "#",
    icon: Images.product,
  },
  {
    label: "Customers",
    href: "#",
    icon: Images.customers,
  },
  {
    label: "Income",
    href: "#",
    icon: Images.income,
  },
  {
    label: "Promote",
    href: "#",
    icon: Images.promote,
  },
  {
    label: "Help",
    href: "#",
    icon: Images.help,
  },
];
