import { Link } from "react-router-dom"
import { Tooltip, IconButton, Flex, Heading, Spacer, useColorMode,Text, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Button } from "@chakra-ui/react"
import { BsSunFill, BsMoonFill } from "react-icons/bs"
import { IoMenu, IoHome } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    const goHome = () => {
        navigate("/");
    }
    return (
        <div className="nav-bar" >
            <Flex display={{base: "none", md :"flex"}} zIndex='2' mb='4px' minWidth='max-content' alignItems='center' gap='2' padding='4' borderBottom='2px' borderBottomColor='GrayText' >
                <Link to="/"><Heading as='h4' size='md' mr="4">WikiFormula</Heading></Link>
                <Spacer />
                <Link to="/standings/WDC"><Text fontSize={"h6"} size="md" m="auto">WDC Standings</Text></Link>
                <Spacer />
                {user && (<div>
                    <span>{user.email}</span><Button ml='4px' onClick={handleClick}>Log Out</Button>
                </div>)}
                {!user && (<div>
                    <Link to="/login"><Button>Log In</Button></Link>
                    <Link to="/signup"><Button>Sign Up</Button></Link>
                </div>)}
                <Tooltip label='Toggle Dark Mode'>
                    <IconButton aria-label="toggle dark mode" onClick={toggleColorMode}
                        borderRadius='30'
                        fontSize='20'
                        icon={colorMode === "light" ? <BsMoonFill /> : <BsSunFill />}
                    />
                </Tooltip>
            </Flex >
            <Flex alignItems='center' display={{base: "flex", md :"none"}} zIndex='2' mb='4px' minWidth='max-content' gap='2' padding='4' borderBottom='2px' borderBottomColor='GrayText' position='sticky' top='0' backdropFilter='blur(6px)'>
            <IconButton aria-label="menu button" icon={<IoMenu />} onClick={onOpen} />
            <Drawer onClose={onClose} isOpen={isOpen} placement="left" size={"xs"}>
                <DrawerOverlay/>
                <DrawerContent textAlign="center" borderBottomRightRadius={'10px'} maxH={'fit-content'} backdropBlur='(6px)'>
                <DrawerCloseButton/>
                <DrawerHeader>{`Menu`}</DrawerHeader>
                <DrawerBody display="flex" flexDirection="column" alignItems="center" gap='10px' padding={'20px'}>
                <IconButton  
                        aria-label="home button"
                        onClick={goHome}
                        icon={<IoHome />}
                />
                <Link to="/standings/WDC"><Button>WDC Standings</Button></Link>
                <Button onClick={handleClick}>Log Out</Button>
                <Link to="/login"><Button>Log In</Button></Link>
                <Link to="/signup"><Button>Sign Up</Button></Link>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
                <Spacer />
                <Link to="/"><Heading as='h4' size='md' mr="4">WikiFormula</Heading></Link>
                <Spacer />
                <IconButton onClick={toggleColorMode}
                        borderRadius='30'
                        fontSize='20'
                        icon={colorMode === "light" ? <BsMoonFill /> : <BsSunFill />}
                />
            </Flex>
        </div>
    )
}

export default Navbar