"use client";

import * as React from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, setIsOpen } = useDashboardStore();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={`fixed inset-y-0 left-0 z-50 flex-shrink-0 w-64 bg-white dark:bg-gray-800 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Dashboard
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden focus:outline-none">
            <FiX className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
        <nav className="h-full flex-1 p-4 space-y-4 overflow-y-auto">
          <Link href="/dashboard">
            <span className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700">
              Dashboard
            </span>
          </Link>
          <Link href="/profile">
            <span className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700">
              Profile
            </span>
          </Link>
          <Link href="/settings">
            <span className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700">
              Settings
            </span>
          </Link>
          <Link href="/support">
            <span className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700">
              Support
            </span>
          </Link>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="blog">
              <AccordionTrigger className="ml-4">Blog</AccordionTrigger>
              <AccordionContent>
                <Link href="/dashboard/category">
                  <span className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700">
                    Category
                  </span>
                </Link>
                <Link href="/dashboard/post">
                  <span className="block px-4 py-2 text-gray-700 rounded hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700">
                    Post 2
                  </span>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </div>
      <div className="flex flex-col flex-1 w-0 lg:pl-64 overflow-hidden">
        <header className="flex items-center justify-between flex-shrink-0 p-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700 lg:justify-start lg:space-x-4 lg:p-4 lg:w-full">
          <button
            onClick={() => setIsOpen(true)}
            className="focus:outline-none lg:hidden">
            <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex-1 lg:flex lg:items-center lg:space-x-4">
            <div className="relative lg:mr-auto">
              <input
                type="text"
                className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 rounded-full focus:outline-none focus:bg-white dark:bg-gray-700 dark:text-gray-200 dark:focus:bg-gray-600"
                placeholder="Search..."
              />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
