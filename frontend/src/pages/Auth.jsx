import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "@/utils/mutations";
import AuthService from "@/utils/auth";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [signinForm, setSigninForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { toast } = useToast();

  // using the useMutation hook to extract the login method
  const [login] = useMutation(LOGIN_USER);
  const [register] = useMutation(REGISTER_USER);

  const handleSigninChange = (e) => {
    const { id, value } = e.target;
    setSigninForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: {
          ...signinForm,
        },
      });

      const { token } = data.login;
      AuthService.login(token);

      setSigninForm({
        email: "",
        password: "",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed!!!",
        description: error.message,
      });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await register({
        variables: {
          ...signupForm,
        },
      });

      const { token } = data.register;
      AuthService.login(token);

      setSigninForm({
        email: "",
        password: "",
        username: "",
      });
    } catch (error) {
      console.error(error.message);
      toast({
        variant: "destructive",
        title: "Signup Failed!!!",
        description: error.message,
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <Tabs
          value={activeTab}
          // on value change prop has been passed with our state update function to make sure it changes the value on click as well
          onValueChange={setActiveTab}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card>
              <form onSubmit={handleSigninSubmit}>
                <CardHeader>
                  <CardTitle>Log In</CardTitle>
                  <CardDescription>
                    Access your account by entering your credentials.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@domain.com"
                      value={signinForm.email}
                      onChange={handleSigninChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="**********"
                      value={signinForm.password}
                      onChange={handleSigninChange}
                      required
                    />
                  </div>
                  <div className="pt-2 text-center text-sm">
                    Dont have an account?{" "}
                    <button
                      className="underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("signup");
                      }}
                    >
                      Sign up
                    </button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Log In
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <form onSubmit={handleSignupSubmit}>
                <CardHeader>
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>
                    Create a new account by filling out the form below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="john petrucci"
                      value={signupForm.username}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@dreamtheater.com"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="**********"
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                  <div className="pt-2 text-center text-sm">
                    Already have an account?{" "}
                    <button
                      className="underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("signin");
                      }}
                    >
                      Log In
                    </button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default Auth;
