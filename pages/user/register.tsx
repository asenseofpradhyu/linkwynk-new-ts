/* eslint-disable func-names */
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import {
  Flex,
  Box,
  Heading,
  Container,
  Center,
  Link,
  Text,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import { useFormik } from "formik";

// Local File Imports
import API_URL from "../../_helper/config";

const axios = require("axios");

const Register = function () {
  const router = useRouter();
  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms_policy: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      name: Yup.string()
        .required("Required")
        .matches(/^[a-zA-Z0-9._]+$/, "Username is invalid"),
      password: Yup.string()
        .min(6, "Must be more than 6 characters")
        .required("Required"),
      terms_policy: Yup.bool().oneOf(
        [true],
        "Accept Terms & Conditions is required"
      ),
    }),
    onSubmit(values) {
      axios
        .post(`${API_URL}register`, {
          username: values.name,
          email: values.email,
          password: values.password,
        })
        .then(() => {
          setTimeout(() => {
            router.push("/user/login");
          }, 300);
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
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
          <Center flexDirection={["column", "column"]}>
            <Heading fontSize={["24px", "32px", "36px", "36px"]}>
              Create an account for free.
            </Heading>
            <Text fontSize="16px">Free forever. No payment needed.</Text>
          </Center>
        </Box>

        <Box
          borderRadius="14px"
          overflow="hidden"
          bg="#F5F5F7"
          p={["20px", "78px 168px", "78px 168px", "78px 168px"]}
          w={["100%", "638px", "638px", "638px"]}
          mt="79px"
        >
          <Box>
            <form onSubmit={handleSubmit}>
              <FormControl
                isRequired
                isInvalid={
                  (touched.name as boolean) &&
                  (errors.name as unknown as boolean)
                }
              >
                <Input
                  type="text"
                  id="Name"
                  placeholder="Username"
                  h="40px"
                  {...getFieldProps("name")}
                />
                <FormErrorMessage>
                  {touched.name && errors.name}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                mt={6}
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
                mt={6}
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
              <FormControl
                isRequired
                isInvalid={
                  (touched.terms_policy as boolean) &&
                  (errors.terms_policy as unknown as boolean)
                }
              >
                <Checkbox
                  size="lg"
                  mt="25px"
                  {...getFieldProps("terms_policy")}
                >
                  <Text fontSize="10px">
                    By creating an account you are agreeing to our{" "}
                    <Link href="#!">Terms and Conditions</Link> and{" "}
                    <Link href="#!">Privacy Policy</Link>
                  </Text>
                </Checkbox>
                <FormErrorMessage>
                  {touched.terms_policy && errors.terms_policy}
                </FormErrorMessage>
              </FormControl>
              <Center>
                <Button
                  className="theme-button"
                  width="120px"
                  mt="34px"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Sign up now
                </Button>
              </Center>
            </form>
            <Center>
              <Link href="login" fontSize="14px" mt="38px">
                Already have an account?
              </Link>
            </Center>
          </Box>
        </Box>
      </Flex>
    </Container>

    //         <Flex width="100%" height="100vh" align="center" justifyContent="center">
    //     <Box p={8} maxWidth="650px" width="100%" borderWidth={1} borderRadius={8} boxShadow="lg">
    //         <Box textAlign="center">
    //             <Heading> Register </Heading>
    //         </Box>
    //         <Box my={4} textAlign="left">

    //             <form onSubmit={handleSubmit}>
    //             <FormControl isRequired  isInvalid={ touched["name"] && errors["name"] }>
    //                     <FormLabel>Name</FormLabel>
    //                     <Input type="text"
    //                     id="Name"
    //                         placeholder="John Doe"
    //                         size="lg" {...getFieldProps("name")}/>
    //                   <FormErrorMessage>{touched["name"] && errors["name"]}</FormErrorMessage>
    //                 </FormControl>
    //                 <FormControl isRequired mt={6} isInvalid={ touched["email"] && errors["email"] }>
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
    //                 <Button width="full" mt={4} type="submit" isLoading={isSubmitting}>Register</Button>
    //             </form>
    //         </Box>
    //     </Box>
    // </Flex>
  );
};

export default Register;
