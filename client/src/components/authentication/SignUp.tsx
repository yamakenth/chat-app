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
import { signUpUser } from "../../api";
import { useUserContext } from "../../context/UserProvider";
import { isEmptyObject } from "../../utils";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validate = (values: FormValues) => {
  const { name, email, password, confirmPassword } = values;
  const errors: FormikErrors<FormValues> = {};
  if (!name) {
    errors.name = "Name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (!confirmPassword) {
    errors.confirmPassword = "Password confirmation is required";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Password confirmation must match password";
  }
  return errors;
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserContext();
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { name, email, password } = values;
        const data = await signUpUser(name, email, password);
        toast({
          duration: 5000,
          isClosable: true,
          position: "bottom",
          status: "success",
          title: "Registration Successful",
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

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <VStack>
        <FormControl
          isRequired
          isInvalid={formik.touched.name && !!formik.errors.name}
        >
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="text"
            autoComplete="name"
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={formik.touched.email && !!formik.errors.email}
        >
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
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
              autoComplete="new-password"
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
        <FormControl
          isRequired
          isInvalid={
            formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
        >
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
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
          <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
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
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default SignUp;
