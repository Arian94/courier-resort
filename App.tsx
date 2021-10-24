/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
    Text,
    HStack,
    Center,
    Switch,
    useColorMode,
    NativeBaseProvider,
} from 'native-base';
import * as Keychain from "react-native-keychain";
import { LoginComponent } from './src/components/Login';
import { TabsComponent } from './src/components/Tabs';
import jwtDecode from "jwt-decode";
import { JwtPayload } from "jwt-decode";


// Color Switch Component
function ToggleDarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack space={2} alignItems="center">
            <Text>Dark</Text>
            <Switch
                isChecked={colorMode === 'light' ? true : false}
                onToggle={toggleColorMode}
                aria-label={
                    colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
                }
            />
            <Text>Light</Text>
        </HStack>
    );
}

const App = () => {
    const [credentials, setCredentials] = useState<false | Keychain.UserCredentials>(false);
    useEffect(() => {
        Keychain.getGenericPassword().then(pass => {
            setCredentials(pass)
        }).catch(e => console.log(e));
    }, [null])

    // async () => {
    //     try {
    //         const [token, setToken] = useState('');
    //         credentials = await Keychain.getGenericPassword();
    //         setyActive(credentials);
    //         // Retrieve the credentials
    //     } catch (error) {
    //         console.log("Keychain couldn't be accessed!", error);
    //     }
    // };

    if (credentials) {
        const decodedToken: JwtPayload = jwtDecode(credentials.password);
        const isExpired = decodedToken.exp! * 1000 < Date.now()

        console.log('Credentials successfully loaded for user ' + credentials.username);

        if (isExpired) {
            return <NativeBaseProvider>
                <Center flex={1} px="3">
                    <LoginComponent />
                </Center>
            </NativeBaseProvider>
        } else
            return (
                <NativeBaseProvider>
                    <Center flex={1} px="3">
                        <TabsComponent />
                    </Center>
                </NativeBaseProvider>
            );
    } else {
        console.log('No credentials stored');

        return <NativeBaseProvider>
            <Center flex={1} px="3">
                <LoginComponent />
            </Center>
        </NativeBaseProvider>
    }

    // return (
    //     <NativeBaseProvider>
    //         <Center
    //             _dark={{ bg: 'blueGray.900' }}
    //             _light={{ bg: 'blueGray.50' }}
    //             px={4}
    //             flex={1}>
    //             <VStack space={5} alignItems="center">
    //                 <NativeBaseIcon />
    //                 <Heading size="lg">Welcome to NativeBase</Heading>
    //                 <HStack space={2} alignItems="center">
    //                     <Text>Edit</Text>
    //                     <Code>App.tsx</Code>
    //                     <Text>and save to reload.</Text>
    //                 </HStack>
    //                 <Link href="https://docs.nativebase.io" isExternal>
    //                     <Text color="primary.500" underline fontSize={'xl'}>
    //                         Learn NativeBase
    //                     </Text>
    //                 </Link>
    //                 <ToggleDarkMode />
    //             </VStack>
    //         </Center>
    //     </NativeBaseProvider>
    // );
}
export default App;