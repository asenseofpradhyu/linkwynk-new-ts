/* eslint-disable camelcase */
import { useRouter } from "next/router";
import * as Yup from "yup";
import {
  Box,
  Heading,
  Container,
  Center,
  Link,
  FormControl,
  Text,
  Input,
  Button,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
// const axios = require("axios");

// Local File Imports
// import { API_URL } from "../../_helper/config";
// import Utility from "../../_helper/util";
// import ForgotPassword from "./forgot_password";

// type userData = {
//   data: {
//     first_login: number;
//     token: string;
//     username: string;
//   };
// };

// eslint-disable-next-line func-names
const Login = function () {
  const router = useRouter();
  // const [session] = useSession();
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (router.query.error) {
      // setLoginError(router.query.error);
    }
  }, [router]);

  const {
    // values,
    handleSubmit,
    // submitCount,
    getFieldProps,
    // setValues,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
    // setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit(values) {
      // axios.post(API_URL+'login', {
      //   email: values.email,
      //   password: values.password
      // })
      // .then(function (response) {
      //   Utility.setToken(response.data.token);
      //   setTimeout(
      //     function() {
      //       router.push('/user/username')
      //     }
      //     .bind(this),
      //     300
      // );
      //   setSubmitting(false);
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   setSubmitting(false);
      //   console.log(error);
      // });

      const { email } = values;
      const { password } = values;
      const res = signIn("credentials", {
        email,
        password,
        callbackUrl: `${window.location.origin}/user/login`,
        redirect: false,
      });

      res.then(async (response: any) => {
        if (response.error) {
          setLoginError(response.error);
          setSubmitting(false);
          // console.log(response);
        } else if (response.status === 200 && response.ok) {
          const session = await getSession();
          // const { userdata } = session;
          console.log(session);
          // console.log(`Session:-  ${JSON.stringify(session!)}`);

          setTimeout(() => {
            if (session?.userData.first_login === 0) {
              console.log("Link Page..");
              // router.push(`/admin/${username}/links`);
            } else if (session?.userData.first_login === 1) {
              // router.push("username");
              // console.log("First login 1..");
            } else {
              setLoginError(
                "Something Went Wrong While Redirecting the Page..!!"
              );
              setSubmitting(false);
            }
          }, 100);

          // if(session.first_login == 0){
          //   console.log("Link Page..");
          //   router.push(`/admin/${session.username}/links`);
          // } else if(session.first_login == 1) {
          //   router.push('username')
          // } else {
          //   setLoginError("Something Went Wrong While Redirecting the Page..!!")
          // }

          // setTimeout(
          //   function() {
          // router.push('username')
          // router.push("/admin/dashboard");
          // }.bind(this), 300);
          // console.log(userdata.data);
        } else {
          setLoginError("Something Went Wrong..!!");
          setSubmitting(false);
        }
      });
    },
  });

  return (
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
        <Box>
          <Center>
            <Heading fontSize={["24px", "32px", "36px", "36px"]}>
              Sign in to your Linkwynk account
            </Heading>
          </Center>
        </Box>

        <Box
          borderRadius="14px"
          overflow="hidden"
          bg="#F5F5F7"
          p={["20px 20px", "78px 168px", "78px 168px", "78px 168px"]}
          w={["100%", "638px", "725px", "725px"]}
          mt={["25px", "25px", "75px", "80px"]}
        >
          <Box>
            <form onSubmit={handleSubmit}>
              <FormControl
                isRequired
                isInvalid={
                  (touched.email as boolean) &&
                  (errors.email as unknown as boolean)
                }
              >
                <Input
                  type="text"
                  id="email"
                  placeholder="Email"
                  h="40px"
                  {...getFieldProps("email")}
                />
                <FormErrorMessage>
                  {touched.email && errors.email}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                mt="23px"
                isInvalid={
                  (touched.password as boolean) &&
                  (errors.password as unknown as boolean)
                }
              >
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  h="40px"
                  {...getFieldProps("password")}
                />
                <FormErrorMessage>
                  {touched.password && errors.password}
                </FormErrorMessage>
              </FormControl>
              <Center flexDirection={["column", "column"]}>
                <Text fontSize="14px" color="red" mt="10px">
                  {loginError}
                </Text>
                <Button
                  className="theme-button"
                  width="120px"
                  mt={loginError ? "20px" : "34px"}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>
              </Center>
              <Center>
                <Link href="forgot_password" fontSize="14px" mt="10px">
                  Forgot Password?
                </Link>
              </Center>
              <Center>
                <Text fontSize="14px" mt="38px">
                  Don&apos;t have an account?{" "}
                  <Link href="register" fontWeight="extrabold">
                    Create one
                  </Link>
                </Text>
              </Center>
            </form>
          </Box>
        </Box>
      </Flex>
    </Container>

    //     <Flex width="100%" height="100vh" align="center" justifyContent="center">
    //     <Box p={8} maxWidth="650px" width="100%" borderWidth={1} borderRadius={8} boxShadow="lg">
    //         <Box textAlign="center">
    //             <Heading> Login </Heading>
    //         </Box>
    //         <Box my={4} textAlign="left">

    //             <form onSubmit={handleSubmit}>
    //                 <FormControl isRequired isInvalid={ touched["email"] && errors["email"] }>
    //                     <FormLabel> Email </FormLabel>
    //                     <Input type="text"
    //                     id="email"
    //                         placeholder="example@example.com"
    //                         size="lg" {...getFieldProps("email")}/>
    //                   <FormErrorMessage>{touched["email"] && errors["email"]}</FormErrorMessage>
    //                 </FormControl>
    //                 <FormControl isRequired mt={6} isInvalid={ touched["password"] && errors["password"] }>
    //                     <FormLabel> Password </FormLabel>
    //                     <Input type="password"
    //                     id="password"
    //                         placeholder="********"
    //                         size="lg" {...getFieldProps("password")}/>
    //                         <FormErrorMessage>{touched["password"] && errors["password"]}</FormErrorMessage>
    //                 </FormControl>
    //                 <Button width="full" mt={4} type="submit" isLoading={isSubmitting}>
    //                 Login
    //                 </Button>
    //                 <span>{loginError}</span>
    //             </form>
    //             <Link href="register" mt={4} mr={2}>Register</Link>
    //             <Link href="forgot_password" mt={4}>ForgotPassword</Link>
    //         </Box>
    //     </Box>
    // </Flex>
  );
};

export default Login;
