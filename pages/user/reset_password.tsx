import React, { useState } from "react";
import { useRouter } from "next/router";
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
// Library
const axios = require("axios");

const ResetPassword = function () {
  const router = useRouter();
  const [apiMessage, setApiMessage] = useState();
  const { token, email } = router.query;

  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      password: "",
      c_password: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(6, "Must be more than 6 characters")
        .required("Required"),
      c_password: Yup.string()
        .min(6, "Must be more than 6 characters")
        .required("Required"),
    }),
    onSubmit(values) {
      axios
        .post(`${API_URL}password/reset`, {
          token,
          email,
          password: values.password,
          confirm_password: values.c_password,
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
              Reset Password
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
              <FormControl
                isRequired
                mt={6}
                isInvalid={
                  (touched.c_password as boolean) &&
                  (errors.c_password as unknown as boolean)
                }
              >
                <Input
                  type="password"
                  id="c_password"
                  placeholder="Confirm Password"
                  h="40px"
                  {...getFieldProps("c_password")}
                />
                <FormErrorMessage>
                  {touched.c_password && errors.c_password}
                </FormErrorMessage>
              </FormControl>
              <Center flexDirection={["column", "column"]}>
                <Text color="green" mt="10px" mb="10px">
                  {apiMessage}
                </Text>
                <Button
                  className="theme-button"
                  width="120px"
                  mt="34px"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Reset Password
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
    //             <Heading> Reset Password </Heading>
    //         </Box>
    //         <Box my={4} textAlign="left">

    //             <form onSubmit={handleSubmit}>
    //                 <FormControl isRequired mt={6} isInvalid={ touched["password"] && errors["password"] }>
    //                     <FormLabel> Password </FormLabel>
    //                     <Input type="password"
    //                     id="password"
    //                         placeholder="********"
    //                         size="lg" {...getFieldProps("password")}/>
    //                         <FormErrorMessage>{touched["password"] && errors["password"]}</FormErrorMessage>
    //                 </FormControl>
    //                 <FormControl isRequired mt={6} isInvalid={ touched["c_password"] && errors["c_password"] }>
    //                     <FormLabel> Confirm Password </FormLabel>
    //                     <Input type="password"
    //                     id="password"
    //                         placeholder="********"
    //                         size="lg" {...getFieldProps("c_password")}/>
    //                         <FormErrorMessage>{touched["c_password"] && errors["c_password"]}</FormErrorMessage>
    //                 </FormControl>
    //                 <Button width="full" mt={4} type="submit" isLoading={isSubmitting}>Reset Password</Button>
    //             </form>
    //         </Box>
    //     </Box>
    // </Flex>
  );
};

export default ResetPassword;
