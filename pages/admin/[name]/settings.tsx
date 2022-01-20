import React from "react";
import {
  Flex,
  Box,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Text,
} from "@chakra-ui/react";
import { AiOutlineFire, AiOutlineGift } from "react-icons/ai";
import { FiInbox, FiEyeOff } from "react-icons/fi";
import { BiCart } from "react-icons/bi";

// Compnent & File Imports
import SideNav from "../../../component/SideNav";
import LinkPreview from "../../../component/LinkPreview";

const settings = () => (
  <Box className="clearfix">
    <SideNav />
    <Box
      width={{ base: "100%", md: "100%", lg: "calc(100% - 164px)" }}
      padding={{ base: "15px", md: "15px", lg: "24px 35px" }}
      position="relative"
      left={{ base: "0", md: "0", lg: "164px" }}
    >
      <Flex justifyContent="space-between" width="100%">
        <Box
          flexShrink="0"
          flexBasis={{ base: "100%", md: "100%", lg: "70%" }}
          h="100%"
        >
          <Box className="">
            <Tabs variant="unstyled">
              <TabList
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                flexWrap="wrap"
              >
                <SimpleGrid columns={2} spacing={5}>
                  <Tab
                    width={{ base: "100%", md: "300px", lg: "300px" }}
                    _focus={{ boxShadow: "none" }}
                    _selected={{ color: "white", bg: "#0C0B0B" }}
                    backgroundColor="#0C0B0B"
                    color="#ffffff"
                    marginRight={{ base: "0px", md: "20px", lg: "20px" }}
                    marginBottom={{ base: "0px", md: "12px", lg: "12px" }}
                    justifyContent="left"
                    borderRadius="8px"
                    padding={{ base: "10px", md: "15px", lg: "20px 25px" }}
                    fontSize={{ base: "12px", md: "18px", lg: "20px" }}
                  >
                    <AiOutlineFire
                      height="30px"
                      width="30px"
                      fontSize="25px"
                      style={{ marginRight: "15px" }}
                    />{" "}
                    Social Links
                  </Tab>
                  <Tab
                    width={{ base: "100%", md: "300px", lg: "300px" }}
                    _focus={{ boxShadow: "none" }}
                    _selected={{ color: "white", bg: "#0C0B0B" }}
                    backgroundColor="#0C0B0B"
                    color="#ffffff"
                    marginRight={{ base: "0px", md: "20px", lg: "20px" }}
                    marginBottom={{ base: "0px", md: "12px", lg: "12px" }}
                    justifyContent="left"
                    borderRadius="8px"
                    padding={{ base: "10px", md: "15px", lg: "20px 25px" }}
                    fontSize={{ base: "12px", md: "18px", lg: "20px" }}
                  >
                    <FiInbox
                      height="30px"
                      width="30px"
                      fontSize="25px"
                      style={{ marginRight: "15px" }}
                    />{" "}
                    Mailing List Integration
                  </Tab>
                  <Tab
                    width={{ base: "100%", md: "300px", lg: "300px" }}
                    _focus={{ boxShadow: "none" }}
                    _selected={{ color: "white", bg: "#0C0B0B" }}
                    backgroundColor="#0C0B0B"
                    color="#ffffff"
                    marginRight={{ base: "0px", md: "20px", lg: "20px" }}
                    marginBottom={{ base: "0px", md: "12px", lg: "12px" }}
                    justifyContent="left"
                    borderRadius="8px"
                    padding={{ base: "10px", md: "15px", lg: "20px 25px" }}
                    fontSize={{ base: "12px", md: "18px", lg: "20px" }}
                  >
                    <AiOutlineGift
                      height="30px"
                      width="30px"
                      fontSize="25px"
                      style={{ marginRight: "15px" }}
                    />{" "}
                    Support Banner
                  </Tab>
                  <Tab
                    width={{ base: "100%", md: "300px", lg: "300px" }}
                    _focus={{ boxShadow: "none" }}
                    _selected={{ color: "white", bg: "#0C0B0B" }}
                    backgroundColor="#0C0B0B"
                    color="#ffffff"
                    marginRight={{ base: "0px", md: "20px", lg: "20px" }}
                    marginBottom={{ base: "0px", md: "12px", lg: "12px" }}
                    justifyContent="left"
                    borderRadius="8px"
                    padding={{ base: "10px", md: "15px", lg: "20px 25px" }}
                    fontSize={{ base: "12px", md: "18px", lg: "20px" }}
                  >
                    <BiCart
                      height="30px"
                      width="30px"
                      fontSize="25px"
                      style={{ marginRight: "15px" }}
                    />{" "}
                    Commerce Integrations
                  </Tab>
                  <Tab
                    height="58px"
                    width={{ base: "100%", md: "300px", lg: "300px" }}
                    _focus={{ boxShadow: "none" }}
                    _selected={{ color: "white", bg: "#0C0B0B" }}
                    backgroundColor="#0C0B0B"
                    color="#ffffff"
                    marginRight={{ base: "0px", md: "20px", lg: "20px" }}
                    justifyContent="left"
                    borderRadius="8px"
                    padding={{ base: "10px", md: "15px", lg: "20px 25px" }}
                    fontSize={{ base: "13px", md: "18px", lg: "20px" }}
                  >
                    <FiEyeOff
                      height="30px"
                      width="30px"
                      fontSize="25px"
                      style={{ marginRight: "15px" }}
                    />{" "}
                    Sensitive Material
                  </Tab>
                </SimpleGrid>
              </TabList>
              <TabPanels>
                <TabPanel padding={{ base: "0px" }}>
                  <Box marginTop="25px">
                    <Text
                      fontSize="20px"
                      fontWeight="700"
                      marginBottom="25px"
                      display="flex"
                      alignItems="center"
                    >
                      <AiOutlineFire
                        fontSize="25px"
                        style={{
                          marginRight: "15px",
                          display: "inline-block",
                          strokeWidth: "50px",
                        }}
                      />
                      Social Links
                    </Text>
                    <Input
                      size="lg"
                      height={{ base: "40px", md: "50px", lg: "60px" }}
                      fontSize="16px !important"
                      bg="#F5F5F7 !important"
                      marginBottom={{
                        base: "15px",
                        md: "20px",
                        lg: "25px",
                      }}
                      placeholder="example@example.com"
                    />
                    <Input
                      size="lg"
                      height={{ base: "40px", md: "50px", lg: "60px" }}
                      fontSize="16px !important"
                      bg="#F5F5F7 !important"
                      marginBottom={{
                        base: "15px",
                        md: "20px",
                        lg: "25px",
                      }}
                      placeholder="facebook.com/linkwynk"
                    />
                    <Input
                      size="lg"
                      height={{ base: "40px", md: "50px", lg: "60px" }}
                      fontSize="16px !important"
                      bg="#F5F5F7 !important"
                      marginBottom={{
                        base: "15px",
                        md: "20px",
                        lg: "25px",
                      }}
                      placeholder="instagram.com/linkwynk"
                    />
                  </Box>
                </TabPanel>
                <TabPanel padding={{ base: "0px" }}>
                  <p>Mail listing Integration!</p>
                </TabPanel>
                <TabPanel padding={{ base: "0px" }}>
                  <p>Support Banner!</p>
                </TabPanel>
                <TabPanel padding={{ base: "0px" }}>
                  <p>Commerce Integration!</p>
                </TabPanel>
                <TabPanel>
                  <p>Sensitive Content!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>

        <LinkPreview />
      </Flex>
    </Box>
  </Box>
);

export default settings;
