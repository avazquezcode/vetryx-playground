import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import {
    GithubIcon,
    HeartFilledIcon,
} from "@/components/icons";

export const Navbar = () => {

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold text-inherit">{process.env.APP_NAME}</p>
                    </NextLink>
                </NavbarBrand>
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                    <NavbarItem key="#">
                        <NextLink
                            className={clsx(
                                linkStyles({ color: "foreground" }),
                                "data-[active=true]:text-primary data-[active=true]:font-medium"
                            )}
                            color="foreground"
                            href="#"
                        >
                            Playground
                        </NextLink>
                    </NavbarItem>
                </ul>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    <Link isExternal href={process.env.REPO_URL} aria-label="Github">
                        <GithubIcon className="text-default-500" />
                    </Link>
                </NavbarItem>
                <NavbarItem className="hidden md:flex">
                    <Button
                        isExternal
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        href={process.env.AUTHOR_URL}
                        startContent={<HeartFilledIcon className="text-danger" />}
                        variant="flat"
                    >
                        My Blog
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <Link isExternal href={process.env.REPO_URL} aria-label="Github">
                    <GithubIcon className="text-default-500" />
                </Link>
                <NavbarMenuToggle />
            </NavbarContent>
        </NextUINavbar>
    );
};
