export interface MenuItem {
  name: string;
  url: string;
  icon: string;
  isUnderConstruction: boolean;
}

export const menuItems: MenuItem[] = [
  {
    icon: "radix-icons:dashboard",
    name: "Home",
    url: "/",
    isUnderConstruction: false,
  },
  {
    name: "Products",
    icon: "ep:goods",
    url: "/products",
    isUnderConstruction: true,
  },
  {
    name: "Payments",
    icon: "ph:contactless-payment",
    url: "/payments",
    isUnderConstruction: true,
  },
  {
    name: "Orders",
    icon: "fluent:receipt-28-regular",
    url: "/orders",
    isUnderConstruction: true,
  },
  {
    name: "Customers",
    icon: "mingcute:group-line",
    url: "/customers",
    isUnderConstruction: false,
  },
  {
    name: "Feedback",
    icon: "fluent:person-feedback-48-regular",
    url: "/feedback",
    isUnderConstruction: true,
  },
  {
    name: "Settings",
    icon: "radix-icons:gear",
    url: "/settings",
    isUnderConstruction: true,
  },
  {
    name: "Help center",
    icon: "radix-icons:question-mark",
    url: "/help",
    isUnderConstruction: true,
  },
] as const;
