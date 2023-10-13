"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

const links = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Issues",
    href: "/issues/list",
  },
];
const NavBar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();
  return (
    <nav className="border-b mb-5 px-5 py-5">
      <Container>
        <Flex align="center" justify="between">
          <Flex align="center" gap="5">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links?.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classnames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500 ": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" ? (
              <Link href="/api/auth/signout">Déconnexion</Link>
            ) : (
              <Link
                href="/api/auth/signin"
                className={classnames({
                  "text-zinc-900": "/api/auth/signin" === currentPath,
                  "text-zinc-500 ": "/api/auth/signin" !== currentPath,
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                Connexion
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
