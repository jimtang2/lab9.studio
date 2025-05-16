import { MenuItemProps } from "@/components/layout/Menu"

export const menuItems: MenuItemProps[] = [
  {
    id: "home",
    type: "link",
    href: "/",
    alt: "home icon",
    icon: "/heroicons/solid/home.svg",
    label: "Home",
  },
  {
    id: "article",
    type: "link",
    href: "/articles",
    alt: "article icon",
    icon: "/heroicons/solid/document-text.svg",
    label: "Articles",
  },
  {
    id: "divider-1",
    type: "divider"
  },
  {
    id: "contact",
    type: "link",
    href: "/about/contact",
    alt: "contact icon",
    icon: "/heroicons/solid/at-symbol.svg",
    label: "Contact",
  },
  {
    id: "about",
    type: "group",
    alt: "about icon",
    icon: "/heroicons/solid/question-mark-circle.svg",
    label: "About",
  },
  {
    id: "terms",
    type: "link",
    parentId: "about",
    href: "/about/terms",
    alt: "about icon",
    icon: "/heroicons/solid/cursor-arrow-ripple.svg",
    label: "Terms of Use",
  },
  {
    id: "privacy",
    type: "link",
    parentId: "about",
    href: "/about/privacy",
    alt: "privacy icon",
    icon: "/heroicons/solid/clipboard-document-check.svg",
    label: "Privacy Policy",
  },
  {
    id: "preferences",
    type: "link",
    href: "/preferences",
    alt: "preferences icon",
    icon: "/heroicons/solid/cog.svg",
    label: "Preferences",
  },
]
