"use client";
import { Skeleton } from "@/app/(home)/components";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { useProjectContext } from "./(home)/hooks/useProjectContext";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Tâches",
    href: "/issues/list",
  },
];
const NavBar = () => {
  const { projectId } = useProjectContext();

  const currentPath = usePathname();
  return (
    <nav className="border-b mb-5 px-5 py-5 z-30 relative">
      <Container>
        <Flex align="center" justify="between">
          <Flex align="center" gap="5">
            <Link href="/dashboard">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links?.map((link) => (
                <li key={link.href} onClick={() => console.log("click")}>
                  <Link
                    href={`${
                      link.href === "/issues/list" &&
                      projectId !== null &&
                      !Number.isNaN(projectId)
                        ? `${link.href}?projectId=${projectId}`
                        : link.href
                    }`}
                    className={classnames({
                      "nav-link": true,
                      "!text-zinc-900": link.href === currentPath,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;

const AuthStatus = () => {
  const currentPath = usePathname();

  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated") {
    return (
      <Link
        href="/api/auth/signin"
        className={classnames({
          "nav-link": true,
          "!text-zinc-900": "/api/auth/signin" === currentPath,
        })}
      >
        Connexion
      </Link>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            fallback="?"
            src={session!.user!.image!}
            radius="full"
            size="2"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Déconnexion</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
