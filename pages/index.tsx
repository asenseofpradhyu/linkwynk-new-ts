/* eslint-disable func-names */
import type { NextPage } from "next";
import { Button, Link } from "@chakra-ui/react";
import React from "react";
// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";

const Home: NextPage = function () {
  return (
    <div>
      <p>Test</p>
      <Link href="user/login" color="linkme.100">
        Login
      </Link>
      <Button colorScheme="blue">Button</Button>
    </div>
  );
};

export default Home;
