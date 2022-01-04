/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import * as Yup from "yup";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";

// Local File Imports
import API_URL from "../../_helper/config";
import Auth from "../../component/Auth";

const axios = require("axios");

const ChangePassword = function () {
  const { data: session } = useSession();
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    // console.log(session?.userData.token);
  });

  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    isSubmitting,
    setSubmitting,
    dirty,
    isValid,
  } = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      c_password: "",
    },
    validationSchema: Yup.object().shape({
      old_password: Yup.string()
        .min(6, "Must be more than 6 characters")
        .required("Required"),
      new_password: Yup.string()
        .min(6, "Must be more than 6 characters")
        .required("Required"),
      c_password: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit(values) {
      axios
        .post(
          `${API_URL}change_password`,
          {
            old_password: values.old_password,
            new_password: values.new_password,
            confirm_password: values.c_password,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.userData.token}`,
            },
          }
        )
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
    // eslint-disable-next-line react/jsx-fragments
    <Box>
      {!session?.userData.token ? (
        <Auth />
      ) : (
        <Flex
          width="100%"
          height="100vh"
          align="center"
          justifyContent="center"
        >
          <Box
            p={8}
            maxWidth="650px"
            width="100%"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <Box textAlign="center">
              <Heading> Change Password </Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                <FormControl
                  isRequired
                  mt={6}
                  isInvalid={
                    (touched.old_password as boolean) &&
                    (errors.old_password as unknown as boolean)
                  }
                >
                  <FormLabel> Old Password </FormLabel>
                  <Input
                    type="password"
                    id="old_password"
                    placeholder="Old Password"
                    size="lg"
                    {...getFieldProps("old_password")}
                  />
                  <FormErrorMessage>
                    {touched.old_password && errors.old_password}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  mt={6}
                  isInvalid={
                    (touched.new_password as boolean) &&
                    (errors.new_password as unknown as boolean)
                  }
                >
                  <FormLabel> New Password </FormLabel>
                  <Input
                    type="password"
                    id="new_password"
                    placeholder="New Password"
                    size="lg"
                    {...getFieldProps("new_password")}
                  />
                  <FormErrorMessage>
                    {touched.new_password && errors.new_password}
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
                  <FormLabel> Confirm Password </FormLabel>
                  <Input
                    type="password"
                    id="c_password"
                    placeholder="Confirm Password"
                    size="lg"
                    {...getFieldProps("c_password")}
                  />
                  <FormErrorMessage>
                    {touched.c_password && errors.c_password}
                  </FormErrorMessage>
                </FormControl>
                {apiMessage}
                <Button
                  className="theme-button"
                  width="full"
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={!(isValid && dirty)}
                >
                  Update
                </Button>
              </form>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default ChangePassword;
