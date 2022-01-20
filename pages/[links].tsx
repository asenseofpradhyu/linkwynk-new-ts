import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaPinterest,
  FaSpotify,
  FaSnapchatGhost,
  FaYoutube,
} from "react-icons/fa";
import {
  HStack,
  Avatar,
  Link,
  ListItem,
  UnorderedList,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";

// Compnent & File Imports
import API_URL from "../_helper/config";

const axios = require("axios");

const Links = function Links(props: any) {
  const { globalLinkData } = props;
  const router = useRouter();
  const { links } = router.query;

  const toTitleCase = (text: any) =>
    text ? text.replace(/(^\w|\s\w)/g, (m: any) => m.toUpperCase()) : links;

  return (
    // eslint-disable-next-line react/jsx-fragments
    <>
      <Head>
        <title>@{toTitleCase(links)} | LinkWynk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box display="flex" justifyContent="center">
        {/* Link Page Background  */}
        <Box
          backgroundImage="url('/img/setup.jpg')"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          position="fixed"
          top="0"
          right="0"
          left="0"
          bottom="0"
          height="100%"
          transform="scale(1.1)"
          filter="blur(20px)"
          opacity="0.9"
        />

        {/* Start of All Users Links  */}
        <Box
          maxWidth="530px"
          width="100%"
          height="100vh"
          position="relative"
          boxShadow="0 7px 29px 0 rgb(100 100 111 / 20%)"
        >
          {/* Start of User Top Cover Image */}
          <Box width="auto" height="auto">
            <Image
              src="/img/setup.jpg"
              alt="Greetings from linkwynk"
              height="175px"
              objectFit="cover"
              width="100%"
            />
          </Box>
          {/* End of User Top Cover Image */}

          {/* Start of Link List */}
          <Box background="#FFFFFF" height="100vh">
            {/* Start of User Profile Image */}
            <Box
              display="flex"
              justifyContent="center"
              position="absolute"
              left="50%"
              right="50%"
              transform="translate(-50%, -50%)"
            >
              <Avatar
                width="120px"
                height="120px"
                border="3px solid #FFFFFF"
                alt={links}
                src="https://source.unsplash.com/random/300x300"
              />
            </Box>
            {/* End of User Profile Image */}
            {/* Start of User Link and Description */}
            <Box padding="70px 30px 50px 30px" height="100%">
              <Text
                display="flex"
                justifyContent="center"
                fontSize="18px"
                fontWeight="bolder"
              >
                @{links}
              </Text>
              <Text
                display="flex"
                justifyContent="center"
                padding="0 50px"
                marginTop="20px"
                fontSize="14px"
              >
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC.
              </Text>

              {/* Start of Social Icons */}
              <Box padding="20px 0">
                <HStack spacing="20px" justifyContent="center">
                  <Box cursor="pointer">
                    <Link
                      href="https://www.facebook.com"
                      _hover={{ color: "#3B5998" }}
                    >
                      <FaFacebookSquare fontSize="28px" />
                    </Link>
                  </Box>
                  <Box cursor="pointer">
                    <Link
                      href="https://www.instagram.com"
                      _hover={{ color: "#30618A" }}
                    >
                      <FaInstagram fontSize="28px" />
                    </Link>
                  </Box>
                  <Box cursor="pointer" _hover={{ color: "#c8232c" }}>
                    <Link href="https://www.pinterest.com">
                      <FaPinterest fontSize="28px" />
                    </Link>
                  </Box>
                  <Box cursor="pointer" _hover={{ color: "#1ed760" }}>
                    <Link href="https://www.spotify.com">
                      <FaSpotify fontSize="28px" />
                    </Link>
                  </Box>
                  <Box cursor="pointer" _hover={{ color: "#FF0000" }}>
                    <Link href="https://www.youtube.com">
                      <FaYoutube fontSize="28px" />
                    </Link>
                  </Box>
                  <Box cursor="pointer" _hover={{ color: "#FFFC00" }}>
                    <Link href="https://www.snapchat.com">
                      <FaSnapchatGhost fontSize="28px" />
                    </Link>
                  </Box>
                </HStack>
              </Box>
              {/* End of Social Icons */}
              {/* Start of Custom Links */}
              <Box textAlign="center" marginTop="20px">
                <UnorderedList listStyleType="none" margin="0">
                  {Object.values(globalLinkData.links).map((data: any) => (
                    <ListItem marginBottom="15px" key={data._id}>
                      <Link href={`https://${data.link_url}`} isExternal>
                        <Box
                          padding="16px 28px"
                          backgroundColor="#0C0B0B"
                          color="#FFFFFF"
                          borderRadius="8px"
                        >
                          <Box>
                            {/* <Image src={ data.photo ? "https://dev.welovecoders.com/storage/app/public/"+data.photo : ''} alt={data.title} height="100%" objectFit="cover" width="100%"/> */}
                          </Box>
                          <Box>
                            <Text
                              fontWeight="bolder"
                              fontSize="16px"
                              isTruncated
                            >
                              {data.title}
                            </Text>
                            <Text fontSize="14px" marginTop="5px" isTruncated>
                              This is the google demo link please click and surf
                              the internet
                            </Text>
                          </Box>
                        </Box>
                      </Link>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
              {/* End of Custom Links */}
            </Box>
            {/* End of User Link and Description */}
          </Box>
          {/* End of Link List */}
        </Box>
        {/* End of All Users Links  */}
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { links } = context.params;

  const { data } = await axios.get(`${API_URL}show_public_links`, {
    params: {
      username: links,
    },
  });

  return {
    props: { globalLinkData: data },
  };
};

export default Links;
