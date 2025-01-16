import { Calendar, Home, Inbox } from "lucide-react";

export const postFilters = [
  { name: "Newest", value: "newest" },
  { name: "Most Viewed", value: "most_viewed" },
  { name: "Uncommented", value: "uncommented" },
];

export const AdminNavItems = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Posts",
    url: "/admin/posts",
    icon: Calendar,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Inbox,
  },
];
