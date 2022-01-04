/* eslint-disable func-names */
import React, { useState } from "react";
import * as Yup from "yup";
import {
  Flex,
  Box,
  Container,
  Center,
  Heading,
  FormControl,
  Text,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";

// Local File Imports
import API_URL from "../../_helper/config";

const axios = require("axios");

const ForgotPassword = function () {
  const [apiMessage, setApiMessage] = useState();
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
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit(values) {
      axios
        .post(`${API_URL}password/reset-request`, {
          email: values.email,
        })
        .then((response: any) => {
          setApiMessage(response.data.message);
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Container maxW="container.xl" h="100%">
      <Flex
        width="100%"
        h="100vh"
        align="center"
        flexDirection={["column", "column"]}
        justifyContent="center"
      >
        <Box>
          <Center>
            <Heading fontSize={["24px", "32px", "36px", "36px"]}>
              Forgot Password?
            </Heading>
          </Center>
        </Box>

        <Box
          borderRadius="14px"
          overflow="hidden"
          bg="#F5F5F7"
          p={["20px 20px", "78px 168px", "78px 168px", "78px 168px"]}
          w={["100%", "638px", "725px", "725px"]}
          mt="79px"
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
              <Center flexDirection={["column", "column"]}>
                <Text mt="10px" mb="10px">
                  {apiMessage}
                </Text>
                <Button
                  className="theme-button"
                  width="auto"
                  mt="34px"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Send reset link
                </Button>
              </Center>
            </form>
          </Box>
        </Box>
      </Flex>
    </Container>

    //         <Flex width="100%" height="100vh" align="center" justifyContent="center">
    //     <Box p={8} maxWidth="650px" width="100%" borderWidth={1} borderRadius={8} boxShadow="lg">
    //         <Box textAlign="center">
    //             <Heading> Forgot Password </Heading>
    //         </Box>
    //         <Box my={4} textAlign="left">

    //             <form onSubmit={handleSubmit}>

    //                 <FormControl isRequired mt={6} isInvalid={ touched["email"] && errors["email"] }>
    //                     <FormLabel> Email </FormLabel>
    //                     <Input type="text"
    //                     id="email"
    //                         placeholder="example@example.com"
    //                         size="lg" {...getFieldProps("email")}/>
    //                   <FormErrorMessage>{touched["email"] && errors["email"]}</FormErrorMessage>
    //                 </FormControl>
    //                 <Button width="full" mt={4} type="submit" isLoading={isSubmitting}>Send Reset Link</Button>
    //             </form>
    //         </Box>
    //     </Box>
    // </Flex>
  );
};

export default ForgotPassword;
