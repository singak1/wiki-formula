import { useState } from "react";
import { FormControl, FormLabel, FormHelperText, Input, Text, Button, Stack, useColorMode, useToast } from "@chakra-ui/react"
import Navbar from "../Components/Navbar";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { colorMode } = useColorMode()
    const { signup, isLoading, error } = useSignup()
    const toast = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, username, password)
    }

    return(
        <div className="signup">
            <Navbar />
            <Stack w={['96%', '75%', '30%']} alignContent='space-around' m='auto' mt={['10px', '15px', '20px']} padding={'10px'} backgroundColor={colorMode === "light" ? "gray.100" : "gray.700"} borderRadius='5px'>
                <Text textAlign="center" as="b" fontSize={'lg'}>Sign Up</Text>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <FormHelperText>Your email is never shared with anyone</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' onChange={(e) => setUsername(e.target.value)} value={username}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                </FormControl>
                <Button disabled={isLoading} mt='4' mb='2' colorScheme='blue' onClick={(e) => handleSubmit(e)} size='lg'>Sign Up</Button>
                {error && toast({title: 'Error',
                                    description: error,
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true})
            }
            </Stack>
        </div>
    )
}

export default Signup