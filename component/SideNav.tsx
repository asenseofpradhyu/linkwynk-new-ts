import { useRouter } from "next/router";
import React from "react";
import {
  Box,
  Image,
  VStack,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tooltip,
} from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
import {
  FiHome,
  FiUser,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiInbox,
} from "react-icons/fi";
import { useSession } from "next-auth/react";

const SideNav = function SideNav() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigateUser = async (navigateUrl: any) => {
    const sessionRef: any = session;
    router.push(`/admin/${sessionRef.userData.username}/${navigateUrl}`);
  };

  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Box>
      <Box
        display={{ base: "inline-block", md: "inline-block", lg: "none" }}
        marginTop="15px"
        marginLeft="15px"
        onClick={handleToggle}
      >
        <TiThMenu fontSize="24px" />
      </Box>

      <Drawer isOpen={isOpen} onClose={onClose} placement="top">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Box
              onClick={() => navigateUser("links")}
              display="flex"
              alignItems="center"
              marginBottom="15px"
              cursor="pointer"
            >
              <FiHome color="#0C0B0B" fontSize="22px" />
              <Text marginRight="5px">Links</Text>
            </Box>
            <Box
              onClick={() => navigateUser("settings")}
              display="flex"
              alignItems="center"
              marginBottom="15px"
              cursor="pointer"
            >
              <FiInbox color="#0C0B0B" fontSize="22px" />
              <Text marginRight="5px">Settings</Text>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Box>Test</Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Box
        float="left"
        position="fixed"
        top="24px"
        left="32px"
        bottom="24px"
        display={{ base: "none", md: "none", lg: "block" }}
      >
        <VStack
          bg="#0C0B0B"
          borderRadius="24px"
          height="100%"
          boxShadow="10px 0px 10px 0px rgba(12,11,11,0.42)"
          overflow="hidden"
          width="132px"
          minHeight="95%"
        >
          <Box paddingTop="40px">
            <Image
              height="40px"
              width="40px"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/600px-Google_%22G%22_Logo.svg.png"
              alt="LinkWynk Logo"
            />
          </Box>
          <Tooltip
            hasArrow
            label="Links"
            bg="#0C0B0B"
            color="#FFFFFF"
            borderRadius="8px"
            placement="right"
          >
            <Box
              marginTop="25px !important"
              onClick={() => navigateUser("links")}
              cursor="pointer"
              width="100%"
              backgroundColor={
                router.pathname === "/admin/[name]/links"
                  ? "#ffffff"
                  : "#0C0B0B"
              }
              padding="15px 50px"
              borderTopLeftRadius="20px"
              borderBottomLeftRadius="20px"
              marginLeft="10px !important"
            >
              <FiHome
                color={
                  router.pathname === "/admin/[name]/links"
                    ? "#0C0B0B"
                    : "#ffffff"
                }
                width="26px"
                height="26px"
                fontSize="26px"
              />
            </Box>
          </Tooltip>
          <Tooltip
            hasArrow
            label="Settings"
            bg="#0C0B0B"
            color="#FFFFFF"
            borderRadius="8px"
            placement="right"
          >
            <Box
              marginTop="25px !important"
              onClick={() => navigateUser("settings")}
              padding="15px 50px"
              width="100%"
              backgroundColor={
                router.pathname === "/admin/[name]/settings"
                  ? "#ffffff"
                  : "#0C0B0B"
              }
              borderTopLeftRadius="20px"
              borderBottomLeftRadius="20px"
              marginLeft="10px !important"
              cursor="pointer"
            >
              <FiInbox
                color={
                  router.pathname === "/admin/[name]/settings"
                    ? "#0C0B0B"
                    : "#ffffff"
                }
                width="26px"
                height="26px"
                fontSize="26px"
              />
            </Box>
          </Tooltip>
          <Box
            marginTop="25px !important"
            padding="15px 50px"
            width="100%"
            borderTopLeftRadius="20px"
            borderBottomLeftRadius="20px"
            marginLeft="10px !important"
            cursor="pointer"
          >
            <FiUser color="#fff" width="26px" height="26px" fontSize="26px" />
          </Box>
          <Box
            marginTop="25px !important"
            padding="15px 50px"
            width="100%"
            borderTopLeftRadius="20px"
            borderBottomLeftRadius="20px"
            marginLeft="10px !important"
            cursor="pointer"
          >
            <FiMessageSquare
              color="#fff"
              width="26px"
              height="26px"
              fontSize="26px"
            />
          </Box>
          <Box
            marginTop="25px !important"
            padding="15px 50px"
            width="100%"
            borderTopLeftRadius="20px"
            borderBottomLeftRadius="20px"
            marginLeft="10px !important"
            cursor="pointer"
          >
            <FiSettings
              color="#fff"
              width="26px"
              height="26px"
              fontSize="26px"
            />
          </Box>
          <Box
            marginTop="auto !important"
            marginBottom="15px"
            width="100%"
            padding="15px 50px"
            cursor="pointer"
          >
            <FiLogOut color="#fff" width="26px" height="26px" fontSize="26px" />
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default SideNav;
