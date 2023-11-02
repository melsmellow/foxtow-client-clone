"use client";
import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { LOCALHOST } from "@/constants";
import { loginUser } from "@/api/users/services";
import useCommonStore from "@/hooks/common/commonStore";

const LoginMainPage = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const LoginHolder = styled.div`
  position: absolute;
  width: 35%;
  height: 60%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 1rem;
`;

function LoginContent() {
  const { setShowLoader } = useCommonStore();
  const [show, setShow] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setShowLoader(false);
    setIsClient(true);
  }, []);

  const handleLogin = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    setShowLoader(true);
    let login = await loginUser(formData);

    if (login.data.data && login.data.data.access) {
      Swal.fire("Login Successful");
      const {
        data: {
          data: { access },
        },
      } = login;

      const {
        data: {
          user: {
            email,
            company: { name, _id },
          },
        },
      } = login;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", access);
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ email: email, company: name, companyId: _id })
        );
      }
      setShowLoader(false);
      push("/");
    } else if (login.data && login.data.message) {
      let message =
        login.data.message.charAt(0).toUpperCase() +
        login.data.message.slice(1);
      Swal.fire(message);
      setShowLoader(false);
    } else {
      Swal.fire("Login Failed");
      setShowLoader(false);
    }
  };

  return (
    <LoginMainPage>
      {isClient ? (
        <LoginHolder>
          <Box w="70%" mx="auto" mt="5rem">
            <form onSubmit={handleSubmit(handleLogin)}>
              <Input placeholder="Email" size="lg" {...register("email")} />
              <InputGroup size="lg" mt={"1rem"}>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <InputRightElement width="4.5rem">
                  <div
                    onClick={() => setShow((prev) => !prev)}
                    style={{ cursor: "pointer", marginTop: ".5rem" }}
                  >
                    {show ? (
                      <Icon as={AiFillEye} boxSize={8} />
                    ) : (
                      <Icon as={AiFillEyeInvisible} boxSize={8} />
                    )}
                  </div>
                </InputRightElement>
              </InputGroup>
              <Button colorScheme="blue" mt={"2rem"} type="submit">
                Login
              </Button>
            </form>
          </Box>
        </LoginHolder>
      ) : null}
    </LoginMainPage>
  );
}

export default LoginContent;
