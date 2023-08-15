import { useState } from "react";
import { FormControl, FormLabel, FormHelperText, Input, Text, Button, Stack, useColorMode } from "@chakra-ui/react"
import Navbar from "../Components/Navbar";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('')
    //const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { colorMode } = useColorMode()
    const { login, error, isLoading } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return(
        <div className="login">
            <Navbar />
            <Stack w={['96%', '75%', '30%']} alignContent='space-around' m='auto' mt={['10px', '15px', '20px']} padding={'10px'} backgroundColor={colorMode === "light" ? "gray.100" : "gray.700"} borderRadius='5px'>
                <Text textAlign="center" as="b" fontSize={'lg'}>Log In</Text>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <FormHelperText>Your email is never shared with anyone</FormHelperText>
                </FormControl>
                {/* TODO: USE ONLY USERNAME TO LOGIN
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' onChange={(e) => setUsername(e.target.value)} value={username}/>
                </FormControl> 
                */}
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                </FormControl>
                <Button disabled={isLoading} mt='4' mb='2' colorScheme='blue' onClick={handleSubmit} size='lg'>Log In</Button>
                { error && <div className="error">{error}</div>}
            </Stack>
        </div>
    )
}

export default Login