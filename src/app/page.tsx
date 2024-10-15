/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Button,
  Container,
  Input,
  Tag,
} from "D:/CCORGZ/reactivus/reactivus/src/index";
import styles from "./page.module.css";
import { IoDocumentTextSharp, IoEye, IoEyeOff } from "react-icons/io5";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RiNpmjsFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  interface CredentialsProps {
    user: string;
    pwd: string;
  }
  interface LoginStatusProps {
    isUserOk: boolean;
    userMessage: string;
    userStatus: "success" | "danger" | "info" | "warning" | "default";
    isPwdOk: boolean;
    pwdMessage: string;
    pwdStatus: "success" | "danger" | "info" | "warning" | "default";
  }

  const [credentials, setCredentials] = useState<CredentialsProps>({
    user: "",
    pwd: "",
  });

  const [loginStatus, setLoginStatus] = useState<LoginStatusProps>({
    isUserOk: true,
    userMessage: "",
    userStatus: "default",
    isPwdOk: true,
    pwdMessage: "",
    pwdStatus: "default",
  });

  const handleLoginSubmitData = () => {
    const isUserCorrect: boolean = Boolean(
      credentials && credentials.user == "user"
    );
    const isUserEmpty: boolean = Boolean(credentials && credentials.user == "");
    const isPwdCorrect: boolean = Boolean(
      credentials && credentials.pwd == "password"
    );
    const isPwdEmpty: boolean = Boolean(credentials && credentials.pwd == "");
    setLoginStatus((prev: LoginStatusProps) => ({
      ...prev,
      isUserOk: isUserCorrect,
      userStatus: isUserEmpty || isUserCorrect ? "default" : "danger",
      userMessage: isUserEmpty
        ? "Inform your user"
        : isUserCorrect
        ? ""
        : "Wrong user",
      isPwdOk: isPwdCorrect,
      pwdStatus: isPwdEmpty || isPwdCorrect ? "default" : "danger",
      pwdMessage: isPwdEmpty
        ? "Inform your password"
        : isPwdCorrect
        ? ""
        : "Wrong password",
    }));
  };

  useEffect(() => {
    handleLoginSubmitData();
  }, [credentials]);

  return (
    <main className={styles.loginMainBox}>
      <Container className={styles.loginBox} flexDirection="column" gap="40px">
        <Container
          flexDirection="column"
          alignItems="flex-start"
          width="100%"
          gap="5px"
        >
          <h1>Reactivus</h1>
          <Container gap="10px">
            <Link
              href={"https://www.ccorgz.com/reactivus"}
              target="_blank"
            >
              <Tag icon={<IoDocumentTextSharp />} label="v0.2.39" color="success" text />
            </Link>
            <Link
              href={"https://www.npmjs.com/package/reactivus"}
              target="_blank"
            >
              <Tag icon={<RiNpmjsFill />} color="danger" label={"npm"} text />
            </Link>
            <Link
              href={"https://github.com/ccorgz/reactivus"}
              target="_blank"
            >
              <Tag icon={<FaGithub />} color="dark" label={"git"} text />
            </Link>
          </Container>
        </Container>

        <Container gap="10px">
          <Input
            type="text"
            label="User"
            width="100%"
            value={credentials.user ?? ""}
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, user: e.target.value }));
            }}
            description={loginStatus.userMessage}
            descriptionColor={loginStatus.userStatus ?? "default"}
            status={loginStatus.userStatus ?? "default"}
          />

          <Input
            type="password"
            label="Password"
            width="100%"
            value={credentials.pwd ?? ""}
            password={{
              offIcon: <IoEyeOff />,
              onIcon: <IoEye />,
              seePwd: true,
            }}
            onChange={(e) => {
              setCredentials((prev) => ({
                ...prev,
                pwd: e.target.value,
              }));
            }}
            description={loginStatus.pwdMessage}
            descriptionColor={loginStatus.pwdStatus ?? "default"}
            status={loginStatus.pwdStatus ?? "default"}
          />
        </Container>

        <Container
          flexDirection="column"
          gap="10px"
          alignItems="flex-start"
          width="100%"
        >
          <Button
            label="Login"
            color="success"
            text
            width="100%"
            onClick={() => handleLoginSubmitData()}
          />
          <Button label="Register" color="danger" text width="100%" shadow />
        </Container>
      </Container>
    </main>
  );
}
