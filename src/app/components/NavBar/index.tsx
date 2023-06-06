"use client";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import logo from "@app/../public/logo.png";
import { Link } from "@chakra-ui/next-js";
import { signOut, useSession } from "next-auth/react";
import Top5Text from "../Top5Text";
import CurrencySelect from "../CurrencySelect";

export default function NavBar() {
  const { data: session } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link href="/search">
          <Image src={logo} alt={""} width="40" />
        </Link>

        <Flex alignItems={"center"} justifyContent={"space-between"}>
          {session && <Top5Text />}
          <Stack direction={"row"} spacing={7}>
            {session && <CurrencySelect />}

            {session && (
              <Button
                width={150}
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              >
                Sign Out
              </Button>
            )}

            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
