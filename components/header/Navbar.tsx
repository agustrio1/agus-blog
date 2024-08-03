'use client';
import * as React from "react";
import { useNavbarStore } from "@/store/navbarStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession, signOut } from "next-auth/react";
import { FiMenu, FiX } from "react-icons/fi";


const Navbar = () => {
  const { isOpen, setIsOpen } = useNavbarStore();
  const router = useRouter();
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session as any);
    };

    fetchSession();
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleDashboard = () => {
    if (session && (session as any).user && ((session as any).user.role === "admin" || (session as any).user.role === "editor")) {
      router.push("/dashboard");
    } else {
      router.push("/user");
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-drawer-target="logo-sidebar"
              data-drawer-show="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="lg:hidden">
              <span className="sr-only">Open sidebar</span>
              <FiMenu className="w-6 h-6" />
            </button>
            <Link href="/">
              <span className="ml-3 text-xl font-semibold dark:text-white">Blog</span>
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link href="/">
              <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Home</span>
            </Link>
            <Link href="/blog">
              <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Blog</span>
            </Link>
            <Link href="/about">
              <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">About</span>
            </Link>
          </div>
          <div className="relative flex items-center">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Menu</button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleDashboard}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
            <div className="absolute top-0 right-0 -mr-14 p-1">
              <button
                className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                onClick={() => setIsOpen(false)}>
                <FiX className="h-6 w-6 text-black" />
              </button>
            </div>
            <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 flex flex-col px-2 space-y-1">
                <Link href="/">
                  <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600" onClick={() => setIsOpen(false)}>Home</span>
                </Link>
                <Link href="/blog">
                  <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600" onClick={() => setIsOpen(false)}>Blog</span>
                </Link>
                <Link href="/about">
                  <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600" onClick={() => setIsOpen(false)}>About</span>
                </Link>
                {!session && (
                  <Link href="/login">
                    <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600" onClick={() => setIsOpen(false)}>Login</span>
                  </Link>
                )}
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
