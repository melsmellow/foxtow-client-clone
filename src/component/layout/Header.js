"use client";
import {
  Avatar,
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const HeaderContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "60px",
  padding: ".2rem 1rem .2rem 1rem",
  display: "flex",
  justifyContent: "space-between",
  border: `solid 1px ${theme.colors.gray[200]}`,
  backgroundColor: theme.colors.gray[50],
  position: "relative",
}));

const UserDetailsHolder = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 8,
}));

const CompanyName = styled(Text)(({ theme }) => ({
  fontWeight: "bold",
}));

function Header() {
  const [isClient, setIsClient] = useState(false);
  const { push } = useRouter();
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire("Logout Successful");
    if (typeof window !== undefined) {
      localStorage.clear();
    }
    push("/login");
  };
  let userData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;

  useEffect(() => {
    setIsClient(true);
    if (!userData) {
      push("/login");
    }
  }, [userData]);

  return (
    <HeaderContainer>
      <div>Logo Here</div>
      <UserDetailsHolder>
        {isClient ? (
          <Popover placement="auto" style={{ width: "20px" }}>
            {userData ? (
              <>
                <PopoverTrigger>
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                </PopoverTrigger>
                <PopoverContent width={"150px"}>
                  <PopoverArrow />
                  <PopoverBody>
                    <Button onClick={handleLogout}>Logout</Button>
                  </PopoverBody>
                </PopoverContent>
              </>
            ) : (
              <Button onClick={() => push("/login")}>Login</Button>
            )}
            <div>
              {userData?.email}
              <CompanyName>{userData?.company}</CompanyName>
            </div>
          </Popover>
        ) : null}
        {/* {userData ? (
          
        ) : null} */}
      </UserDetailsHolder>
    </HeaderContainer>
  );
}

export default Header;
