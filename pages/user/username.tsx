import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Flex,
  Box,
  FormErrorMessage,
  Heading,
  Container,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

// Local File Imports
import API_URL from "../../_helper/config";
import Auth from "../../component/Auth";
import Tagbutton from "../../component/Tagbutton";

const axios = require("axios");

const Username = function (props: any) {
  const { categoriesData } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const [tagSelectcount, setTagSelectcount] = useState(0 as number);
  const [tagSelect, setTagSelect] = useState([] as any);

  // Save User Information
  const { handleSubmit, getFieldProps, touched, errors, setSubmitting } =
    useFormik({
      initialValues: {
        name: "",
      },
      validationSchema: Yup.object().shape({
        name: Yup.string()
          .required("Required")
          .matches(
            /^[A-Za-z\s]{1,}[\\.]{0,1}[A-Za-z\s]{0,}$/,
            "Name is invalid"
          ),
      }),
      onSubmit(values) {
        axios
          .post(
            `${API_URL}setup_user`,
            {
              name: values.name,
              categories: tagSelect,
            },
            {
              headers: {
                Authorization: `Bearer ${session?.userData.token}`,
              },
            }
          )
          .then(() => {
            setTimeout(() => {
              router.push(`/admin/${session?.userData.username}/links`);
            }, 300);
            setSubmitting(false);
          })
          .catch(() => {
            setSubmitting(false);
          });
      },
    });

  const addTag = (value: any) => {
    // console.log(value);

    if (value.color && value.id) {
      if (tagSelectcount <= 0) {
        setTagSelectcount(0);
      } else {
        setTagSelectcount(tagSelectcount - 1);
      }
    } else if (tagSelectcount !== 3) {
      setTagSelectcount(tagSelectcount + 1);
    }

    if (value.color === false) {
      setTagSelect([...tagSelect, value.id]);
    } else if (value.color === true) {
      setTagSelect(tagSelect.filter((item: any) => item !== value.id));
    }
  };

  return (
    <Box>
      {
        !session?.userData.token ? (
          <Auth />
        ) : (
          <Container
            maxW="container.xl"
            h="100%"
            minHeight="100vh"
            d="flex"
            flexDirection={["column", "column"]}
            justifyContent="center"
          >
            <Flex
              width="100%"
              h="100%"
              align="center"
              flexDirection={["column", "column"]}
              justifyContent="center"
            >
              <Box w={["100%", "100%", "607px", "607px"]}>
                <Center flexDirection={["column", "column"]}>
                  <Heading fontSize={["24px", "32px", "36px", "36px"]}>
                    We just need to confirm a few things.
                  </Heading>
                </Center>
              </Box>
              <form onSubmit={handleSubmit}>
                <Box w={["100%", "100%", "607px", "607px"]} mt={["20px"]}>
                  <FormControl
                    id="fullname"
                    isRequired
                    isInvalid={
                      (touched.name as boolean) &&
                      (errors.name as unknown as boolean)
                    }
                  >
                    <FormLabel fontWeight="700">
                      Tell us your full name
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Name"
                      bg="#F5F5F7 !important"
                      {...getFieldProps("name")}
                    />
                    <FormErrorMessage>
                      {touched.name && errors.name}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box
                  w={["100%", "100%", "607px", "607px"]}
                  mt={["30px"]}
                  position="relative"
                >
                  <Text fontWeight="700">Tell us about yourself</Text>
                  <Text
                    position="absolute"
                    top="-2px"
                    right="calc(100% - 166px)"
                    color="#e53e3e"
                  >
                    *
                  </Text>
                  <Text display="inline">
                    Select up to 3 categories that best describe your Linkwynk.
                    <br />
                    We&apos;ll customise your Linkwynk experience based on what
                    you select.
                  </Text>
                  <Text float="right" display="inline-block">
                    {tagSelectcount} of 3
                  </Text>
                </Box>
                <Box w={["100%", "100%", "607px", "607px"]} mt={["25px"]}>
                  {Object.values(categoriesData.categories).map((type: any) => (
                    <Tagbutton
                      addTag={addTag}
                      totalSelect={tagSelectcount}
                      key={type._id}
                      dataid={type._id}
                    >
                      {type.category}
                    </Tagbutton>
                  ))}
                  {/* <Tag p="10px" borderRadius="20px" mr="10px" cursor="pointer">Sample Tag</Tag> */}
                </Box>
                <Box w={["100%", "100%", "607px", "607px"]} mt={["30px"]}>
                  <Center>
                    <Button
                      className="theme-button"
                      width="120px"
                      type="submit"
                    >
                      Next
                    </Button>
                  </Center>
                </Box>
              </form>
            </Flex>
          </Container>
        )

        //         <div>
        // 			<h1>Welcome</h1>
        //       <Menu>
        //   <MenuButton as={Button}>{userData.user.name + " >"} </MenuButton>
        //   <MenuList>
        //     <MenuItem onClick={toChangePassword}>Change Password</MenuItem>
        //     <MenuItem onClick={logOut}>Logout</MenuItem>
        //   </MenuList>
        // </Menu>
        //             {/* <Button type="button" onClick={logOut}>Log Out</Button> */}
        // 		</div>
      }
    </Box>
  );
};

export async function getServerSideProps(context: any) {
  const sessionData = await getSession(context);

  if (sessionData) {
    axios.defaults.headers.common.Authorization = `Bearer ${sessionData.userData.token}`;
    const { data } = await axios.get(`${API_URL}getCategories`);

    return {
      props: { categoriesData: data },
    };
  }
  return {
    props: { categoriesData: null },
  };
}

export default Username;
