import { Link } from "react-router-dom"
import { IconButton, Flex, Heading, Spacer, useColorMode, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Button } from "@chakra-ui/react"
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
            <Flex alignItems='center' zIndex='2' mb='4px' minWidth='max-content' gap='2' padding='4' borderBottom='2px' borderBottomColor='GrayText' position='sticky' top='0' backdropFilter='blur(6px)'>
            <IconButton aria-label="menu button" icon={<IoMenu />} onClick={onOpen} />
            <Drawer onClose={onClose} isOpen={isOpen} placement="left" size={"xs"}>
                <DrawerOverlay/>
                <DrawerContent textAlign="center" borderBottomRightRadius={'10px'} m="auto" backdropBlur='(6px)'>
                <DrawerCloseButton/>
                <DrawerHeader>{`Menu`}</DrawerHeader>
                <DrawerBody display="flex" flexDirection="column" alignItems="center" gap='10px' padding={'20px'}>
                <IconButton  
                        aria-label="home button"
                        onClick={goHome}
                        icon={<IoHome />}
                />
                <Link to="/standings/WDC"><Button>Driver Standings</Button></Link>
                <Link to="/standings/WCC"><Button>Constructor Standings</Button></Link>
                {user && (<div>
                    <span>{user.email}</span><Button ml='4px' onClick={handleClick}>Log Out</Button>
                </div>)}
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