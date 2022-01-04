/* eslint-disable camelcase */
import { useRouter } from "next/router";
import { Flex, Container } from "@chakra-ui/react";
import React, { useState } from "react";

// Local File Imports
import API_URL from "../../_helper/config";

const axios = require("axios");

export default function verifyAccount() {
  const [verifyError, setVerifyError] = useState("");
  const router = useRouter();
  const { verify_token, email } = router.query;

  axios
    .get(`${API_URL}verify_account`, {
      params: {
        email,
        verify_token,
      },
    })
    .then((response: any) => {
      setVerifyError(response.data.message);
      setTimeout(() => {
        router.push("/user/login");
      }, 5000);
    })
    .catch(() => {});

  return (
    <Flex width="100%" height="100vh" align="center" justifyContent="center">
      {verifyError ? (
        <Container>
          <p>{}</p>
          <p>You&apos;re be redirect to Login page</p>
        </Container>
      ) : (
        ""
      )}
    </Flex>
  );
}
