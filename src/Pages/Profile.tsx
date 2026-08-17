import { useState } from "react";
import {  User,  Mail,  Phone,MapPin,  Package, Heart,  Star, 
   CreditCard,  Settings,  LogOut,  Edit3,  ChevronRight,  Camera,  CheckCircle2,  Clock3, Truck,
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  items: number;
  amount: string;
  status: "Delivered" | "Processing" | "Shipped";
}

const orders: Order[] = [
  {
    id: "#ORD-28491",
    date: "12 Aug 2026",
    items: 3,
    amount: "$129.00",
    status: "Delivered",
  },
  {
    id: "#ORD-28412",
    date: "04 Aug 2026",
    items: 2,
    amount: "$84.50",
    status: "Shipped",
  },
  {
    id: "#ORD-28376",
    date: "28 Jul 2026",
    items: 1,
    amount: "$49.99",
    status: "Processing",
  },
];

const menuItems = [
  {
    icon: Package,
    title: "My Orders",
    description: "Track and manage your orders",
  },
  {
    icon: Heart,
    title: "Wishlist",
    description: "Your saved products",
  },
  {
    icon: MapPin,
    title: "Addresses",
    description: "Manage your delivery addresses",
  },
  {
    icon: CreditCard,
    title: "Payment Methods",
    description: "Manage your cards & payments",
  },
  {
    icon: Settings,
    title: "Account Settings",
    description: "Password, security & preferences",
  },
];

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle2 size={16} />;
    case "Shipped":
      return <Truck size={16} />;
    case "Processing":
      return <Clock3 size={16} />;
  }
};

const getStatusStyle = (status: Order["status"]) => {
  switch (status) {
    case "Delivered":
      return "bg-emerald-50 text-emerald-600";
    case "Shipped":
      return "bg-blue-50 text-blue-600";
    case "Processing":
      return "bg-amber-50 text-amber-600";
  }
};

export default function Profile() {
  const [activeMenu, setActiveMenu] = useState("My Profile");

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            My Account
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your profile, orders and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">

          {/* SIDEBAR */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

            <div className="mb-3 border-b border-slate-100 px-3 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Account
              </p>
            </div>

            <button
              onClick={() => setActiveMenu("My Profile")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm
                 font-medium transition ${
                activeMenu === "My Profile"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <User size={18} />
              My Profile
            </button>

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  onClick={() => setActiveMenu(item.title)}
                  className={`mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 
                    text-left text-sm font-medium transition ${
                    activeMenu === item.title
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {item.title}
                </button>
              );
            })}

            <div className="my-3 border-t border-slate-100" />

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50">
              <LogOut size={18} />
              Logout
            </button>
          </aside>

          {/* MAIN CONTENT */}
          <main className="space-y-6">

            {/* PROFILE CARD */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Cover */}
              <div className="h-32 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 sm:h-40" />

              <div className="relative px-5 pb-6 sm:px-8">

                {/* Avatar */}
                <div className="-mt-14 flex items-end justify-between sm:-mt-16">

                  <div className="relative">
                    <div className="flex h-28 w-28 items-center justify-center 
                    overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md sm:h-32 sm:w-32">
                      <User
                        size={55}
                        strokeWidth={1.5}
                        className="text-slate-400"
                      />
                    </div>

                    <button className="absolute bottom-1 right-1 flex h-9 w-9 items-center 
                     justify-center rounded-full border-2 border-white bg-slate-900
                      text-white shadow-md transition hover:bg-slate-700">
                      <Camera size={16} />
                    </button>
                  </div>

                  <button className="mb-1 flex items-center gap-2 rounded-xl border border-slate-200
                   bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition
                    hover:bg-slate-50">
                    <Edit3 size={16} />
                    <span className="hidden sm:inline">
                      Edit Profile
                    </span>
                  </button>
                </div>

                {/* User info */}
                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                      Haseeb Rehman
                    </h2>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                      Verified
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    Premium Customer
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                        <Mail size={17} />
                      </div>
                      haseeb@example.com
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                        <Phone size={17} />
                      </div>
                      +92 300 1234567
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                        <MapPin size={17} />
                      </div>
                      Karachi, Pakistan
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                        <Star size={17} />
                      </div>
                      Member since 2025
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* STATS */}
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Package size={20} />
                  </div>
                </div>

                <p className="mt-4 text-2xl font-bold text-slate-900">
                  24
                </p>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Total Orders
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600">
                  <Heart size={20} />
                </div>

                <p className="mt-4 text-2xl font-bold text-slate-900">
                  12
                </p>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Wishlist
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Star size={20} />
                </div>

                <p className="mt-4 text-2xl font-bold text-slate-900">
                  18
                </p>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Reviews
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CreditCard size={20} />
                </div>

                <p className="mt-4 text-2xl font-bold text-slate-900">
                  $1.2k
                </p>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Total Spent
                </p>
              </div>
            </section>

            {/* RECENT ORDERS */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Recent Orders
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Your latest purchases
                  </p>
                </div>

                <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-900">
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60 text-left text-xs uppercase tracking-wide text-slate-400">
                      <th className="px-6 py-4 font-semibold">
                        Order
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Date
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Items
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Amount
                      </th>

                      <th className="px-6 py-4 font-semibold">
                        Status
                      </th>

                      <th className="px-6 py-4" />
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                          {order.id}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-500">
                          {order.date}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-500">
                          {order.items} items
                        </td>

                        <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                          {order.amount}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <button className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Orders */}
              <div className="divide-y divide-slate-100 md:hidden">
                {orders.map((order) => (
                  <div key={order.id} className="p-5">

                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900">
                        {order.id}
                      </p>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <div>
                        <p className="text-xs text-slate-400">
                          Date
                        </p>

                        <p className="mt-1 text-slate-600">
                          {order.date}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Items
                        </p>

                        <p className="mt-1 text-slate-600">
                          {order.items}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Amount
                        </p>

                        <p className="mt-1 font-semibold text-slate-900">
                          {order.amount}
                        </p>
                      </div>
                    </div>

                    <button className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-700">
                      View Order
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* ADDRESS + PAYMENT */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

              {/* Address */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Default Address
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Your primary delivery address
                    </p>
                  </div>

                  <button className="text-sm font-semibold text-slate-700">
                    Edit
                  </button>
                </div>

                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Home
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Haseeb Rehman
                        <br />
                        House 123, Block A
                        <br />
                        Karachi, Pakistan
                        <br />
                        +92 300 1234567
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Payment Method
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Your default payment method
                    </p>
                  </div>

                  <button className="text-sm font-semibold text-slate-700">
                    Edit
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-16 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold tracking-wider text-white">
                      VISA
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Visa ending in 4242
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Expires 08/28
                      </p>
                    </div>
                  </div>

                  <CheckCircle2
                    size={19}
                    className="text-emerald-500"
                  />
                </div>
              </section>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}