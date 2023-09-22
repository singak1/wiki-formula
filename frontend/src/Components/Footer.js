import { Flex, Link, Text, Image, VStack, Icon } from "@chakra-ui/react"
import { IoMail, IoLogoGithub } from "react-icons/io5"

const Footer = () => {
    return(
        <VStack>
            <Flex justifyContent='center' alignItems='center' p={'2'}>
                <Text>Proudly made in</Text><Image borderRadius='15px' height='15px' width='50px' src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg`} /> <Text>by Akash</Text>
            </Flex>
            <Flex>
                <Link href='https://github.com/singak1/wiki-formula' isExternal mr='16px'><Icon as={IoLogoGithub} boxSize={6} color='gray.400'/></Link>
                <Link href='mailto:a97sin@gmail.com' isExternal><Icon as={IoMail} boxSize={6} color='gray.400'/></Link>
            </Flex>
            <Flex textAlign='center' maxW={['100%','70%']}>
                <Text color='gray.500'>This website is unofficial and is not associated in any way with the Formula 1 companies. F1, 
                    FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.
                    Please use the mail button to contact me.
                </Text>
            </Flex>
        </VStack>
    )
}

export default Footer