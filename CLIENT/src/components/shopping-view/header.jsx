import React, { useState } from "react";
import { HousePlug, Menu, ShoppingCart, User, LogOut, UserCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { menuItemShoppingView } from "@/config";
import { logoutUserAction } from "@/store/auth-slice";

// 1. Navigation Menu Links
function MenuItems({ setOpen }) {
  return (
    <nav className="flex flex-col gap-6 lg:flex-row lg:items-center">
      {menuItemShoppingView.map((menuitem) => (
        <Link
          key={menuitem.id}
          to={menuitem.path}
          // ✅ Closes sheet on mobile when clicked, safe on desktop!
          onClick={() => {
            if (setOpen) setOpen(false);
          }}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          {menuitem.label}
        </Link>
      ))}
    </nav>
  );
}

// 2. Mobile Profile Section
function MobileProfilePart({ setOpen }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUserAction());
    if (setOpen) setOpen(false);
  }

  function handleNavigate(path) {
    navigate(path);
    if (setOpen) setOpen(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-4 border-t">
        <Link to="/auth/login" onClick={() => setOpen && setOpen(false)} className="w-full">
          <Button className="w-full">Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-4 border-t space-y-4">
      {/* User Info (Avatar + Name) */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
          {(user?.userName || user?.username || "U")[0].toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-sm">
            {user?.userName || user?.username || "User"}
          </p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      {/* Account and Logout Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => handleNavigate("/shop/account")}
        >
          <UserCheck className="w-4 h-4" />
          Account
        </Button>

        <Button
          variant="destructive"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

// 3. Desktop Right Side Content (Cart & Dropdown Menu)
function HeaderRightContent() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUserAction());
  }

  return (
    <div className="flex items-center gap-4">
      {/* Shopping Cart Button */}
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="w-5 h-5" />
        <span className="sr-only">User cart</span>
      </Button>

      {/* User Avatar with Dropdown */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full cursor-pointer bg-black text-white hover:bg-gray-800 hover:text-white"
            >
              {(user?.userName || user?.username || "U")[0].toUpperCase()}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>
              Logged in as <span className="font-bold">{user?.userName || user?.username}</span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate("/shop/account")}
              className="cursor-pointer"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/auth/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}

// 4. Main Header
function ShoppingViewHeader() {
  const [open, setOpen] = useState(false); // ✅ Controlled state for Mobile Drawer

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        {/* Left: Brand Logo */}
        <Link to="/shop/home" className="flex items-center gap-2 font-bold text-lg">
          <HousePlug className="h-6 w-6 text-primary" />
          <span>Ecommerce</span>
        </Link>

        {/* Center: Desktop Navigation Links (Safe without Sheet) */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Icon on Mobile */}
          <Button variant="outline" size="icon" className="relative lg:hidden">
            <ShoppingCart className="w-5 h-5" />
            <span className="sr-only">User cart</span>
          </Button>

          {/* Desktop Right Side Content */}
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>

          {/* Mobile Drawer (Sheet) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-full max-w-xs flex flex-col justify-between py-6">
              <div>
                <SheetHeader>
                  <SheetTitle className="text-left font-bold text-lg flex items-center gap-2">
                    <HousePlug className="h-5 w-5" />
                    Ecommerce
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <div className="mt-8">
                  <MenuItems setOpen={setOpen} />
                </div>
              </div>

              {/* Mobile Profile & Logout */}
              <MobileProfilePart setOpen={setOpen} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default ShoppingViewHeader;