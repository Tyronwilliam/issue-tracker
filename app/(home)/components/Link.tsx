import React from "react";
import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  children: string;
  href: string;
}
const Link = ({ children, href }: Props) => {
  return (
    <NextLink href={href} legacyBehavior passHref>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
