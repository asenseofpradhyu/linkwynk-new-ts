/* eslint-disable func-names */
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import React, { useSession } from "next-auth/react";

const Auth = function () {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.userData.token) {
      router.push("/user/login");
    }
  });

  return <Spinner color="red.500" size="lg" />;
};

export default Auth;
