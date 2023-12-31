import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import { useUserContext } from "../../context";
import { isEmptyObject } from "../../utils";

const GUEST_CREDENTIALS = {
  email: "guest@example.com",
  password: "123456",
};

type FormValues = {
  email: string;
  password: string;
};

const validate = (values: FormValues) => {
  const { email, password } = values;
  const errors: FormikErrors<FormValues> = {};
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  return errors;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { email, password } = values;
        const data = await loginUser(email, password);
        toast({
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "success",
          title: "Login Successful",
        });
        setUser(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/chats");
      } catch (error) {
        toast({
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "error",
          title: "Error Occurred!",
          description: (error as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const populateGuestCredentials = async () => {
    await formik.setFieldValue("email", GUEST_CREDENTIALS.email);
    await formik.setFieldValue("password", GUEST_CREDENTIALS.password);
    const emailInput = document.querySelector("#email") as HTMLInputElement;
    emailInput?.focus();
    emailInput?.blur();
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <VStack>
        <FormControl
          isRequired
          isInvalid={formik.touched.email && !!formik.errors.email}
        >
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            autoComplete="email"
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={formik.touched.password && !!formik.errors.password}
        >
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
            />
            <InputRightElement>
              <Button
                bg="none"
                color="gray.500"
                onClick={() => setShowPassword(!showPassword)}
                variant="unstyled"
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="teal"
          isDisabled={!isEmptyObject(formik.errors)}
          isLoading={isLoading}
          loadingText="Submitting"
          mt="15px"
          type="submit"
          variant="solid"
          w="100%"
        >
          Login
        </Button>
        <Button
          colorScheme="teal"
          onClick={populateGuestCredentials}
          type="button"
          variant="outline"
          w="100%"
        >
          Populate with Guest Credentials
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
