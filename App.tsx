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
import { TouchableHighlight } from 'react-native';
import * as Keychain from "react-native-keychain";
import { isExpired, useJwt } from "react-jwt";
import { LoginComponent } from './src/components/Login';
import { TabsComponent } from './src/components/Tabs';
// import * as Jwt from "jsonwebtoken";
import * as jwt from "jwt-decode";

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

// const Tabs = (tabs: string[], active: number, setActive: React.Dispatch<React.SetStateAction<number>>) => {
//     return tabs.map((title, index) => {
//         return <TouchableHighlight key={index}
//             activeOpacity={0.6}
//             underlayColor={"gray"}
//             style={{ width: "50%", backgroundColor: active === index ? "green" : "gray" }}
//             onPress={() => setActive(index)}>
//             <Text style={{ paddingVertical: 10, textAlign: "center", color: "white", }}>{title}</Text>
//         </TouchableHighlight>;
//     })
// }

// const parseJwt = (str: string) => {
//     return str.split("").map(function (val: string) {
//         return val.charCodeAt(0);
//     });
// }

const App = () => {
    const [credentials, setCredentials] = useState<false | Keychain.UserCredentials>(false);
    useEffect(() => {
        Keychain.getGenericPassword().then(pass => {
            // if (pass) {
                // const isExpired = useJwt(pass.password);
                // if (!isExpired)
                    setCredentials(pass)
            // }

            // console.log('ine', pass); setCredentials(pass)

        }).catch(e => console.log('wtf', e));
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
        console.log('credentials', credentials);

        // const decodedToken = jwt.default.decode(credentials.password);
        // console.log('manam', decodedToken);
        let isExpired = true
        
        // console.log('decoded', decodedToken);

        // const expired = decodedToken.isExpired * 1000 < Date.now()
        // const expired = isExpired(credentials.password);
        // const { isExpired } = decodedToken;
        console.log(
            'Credentials successfully loaded for user ' + credentials.username
        );
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




// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * Generated with the TypeScript template
//  * https://github.com/react-native-community/react-native-template-typescript
//  *
//  * @format
//  */

// // import AsyncStorage from '@react-native-community/async-storage';
// import React, { useState } from 'react';
// import {
//     Button,
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableHighlight,
//     useColorScheme,
//     View,
// } from 'react-native';
// import * as Keychain from 'react-native-keychain';
// import {
//     Colors,
//     DebugInstructions,
//     Header,
//     LearnMoreLinks,
//     ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// // import { loginCourier } from './components/api';
// // import { isExpired } from "react-jwt";
// // import { Box, Center, FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';


// const Section: React.FC<{
//     title: string;
// }> = ({ children, title }) => {
//     // const isDarkMode = true;
//     const isDarkMode = useColorScheme() === 'dark';
//     return (
//         <View style={styles.sectionContainer}>
//             <Text
//                 style={[
//                     styles.sectionTitle,
//                     {
//                         color: isDarkMode ? Colors.white : Colors.black,
//                     },
//                 ]}>
//                 {title}
//             </Text>
//             <Text
//                 style={[
//                     styles.sectionDescription,
//                     {
//                         color: isDarkMode ? Colors.light : Colors.dark,
//                     },
//                 ]}>
//                 {children}
//             </Text>
//         </View>
//     );
// };

// // const MyComponent = (props: PropsWithChildren) => {
// //     return (
// //         <View {...props} style={{ flex: 1, backgroundColor: '#fff' }}>
// //             <Text>My Component</Text>
// //         </View>
// //     );
// // }



// const App = () => {
//     const tabs = ["To Do", "Delivered"];
//     const [active, setActive] = useState(0);
//     const isDarkMode = useColorScheme() === 'dark';
//     // const isDarkMode = true;


//     const backgroundStyle = {
//         backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//     };

//     // async () => {
//     //     try {
//             // const [token, setToken] = useState('');
//             // const credentials = await Keychain.getGenericPassword();
//             // // Retrieve the credentials
//             // if (credentials) {
//             //     const expired = isExpired(credentials.password);
//             //     const [username, setUsername] = useState('');
//             //     const [password, setPassword] = useState('');
//             //     console.log(
//             //         'Credentials successfully loaded for user ' + credentials.username
//             //     );
//             //     if (expired) {
//             //         return <SafeAreaView>
//             //             {/* <NativeBaseProvider> */}
//             //             {/* <Center flex={1} px="3"> */}
//             //                 {loginForm}
//             //             {/* </Center> */}
//             //         </SafeAreaView>
//             //         {/* </NativeBaseProvider> */ }
//             //     } else
//                     return (
//                         // <NativeBaseProvider>
//                         <SafeAreaView>
//                             {/* <Center flex={1} px="3"> */}
//                                 <View
//                                     style={
//                                         {
//                                             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//                                             display: "flex", flexDirection: "row", justifyContent: "space-between",
//                                             marginTop: 20, ...styles.boxWithShadow
//                                         }
//                                     }>
//                                     {Tabs(tabs, active, setActive)}
//                                     {/* <Section title="Step One">
//                                     Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//                                     screen and then come back to see your edits.
//                                 </Section> */}
//                                 </View>
//                             {/* </Center> */}
//                         </SafeAreaView>
//                     );
//                 {/* </NativeBaseProvider> */ }
//             // } else {
//             //     console.log('No credentials stored');
//             //     return <SafeAreaView>
//             //         {/* <NativeBaseProvider> */}
//             //         {/* <Center flex={1} px="3"> */}
//             //             {loginForm}
//             //         {/* </Center> */}
//             //         {/* </NativeBaseProvider> */}
//             //     </SafeAreaView>
//             // }
//     //     } catch (error) {
//     //         console.log("Keychain couldn't be accessed!", error);
//     //     }
//     // };


//     {/* <SafeAreaView style={backgroundStyle}>
//                 <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//                 <ScrollView
//                     contentInsetAdjustmentBehavior="automatic"
//                     style={backgroundStyle}>
//                     <View
//                         style={
//                             {
//                                 backgroundColor: isDarkMode ? Colors.black : Colors.white,
//                                 display: "flex", flexDirection: "row", justifyContent: "space-between",
//                                 marginTop: 20, ...styles.boxWithShadow
//                             }
//                         }>
//                         {Tabs(tabs, active, setActive)} */}
//     {/* <Section title="Step One">
//                         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//                         screen and then come back to see your edits.
//                     </Section> */}
//     //         </View>
//     //     </ScrollView>
//     // </SafeAreaView>
// };

// // const loginForm = () => {
// //     return (
// //         <Text>{"lm"}</Text>
//         // <Box
//         //     w={{
//         //         base: "90%",
//         //         md: "25%",
//         //     }}
//         // >
//         //     <FormControl isRequired>
//         //         <Stack mx="4">
//         //             <FormControl.Label>Password</FormControl.Label>
//         //             <Input type="password" value="12345" placeholder="password" />
//         //             <FormControl.HelperText>
//         //                 Must be atleast 6 characters.
//         //             </FormControl.HelperText>
//         //             <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
//         //                 Atleast 6 characters are required.
//         //             </FormControl.ErrorMessage>
//         //         </Stack>
//         //     </FormControl>
//         // </Box>
// //     )
// // }


// const styles = StyleSheet.create({
//     sectionContainer: {
//         marginTop: 32,
//         paddingHorizontal: 24,
//     },
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: '600',
//     },
//     sectionDescription: {
//         marginTop: 8,
//         fontSize: 18,
//         fontWeight: '400',
//     },
//     highlight: {
//         fontWeight: '700',
//     },
//     boxWithShadow: {
//         // borderColor: 'red', // if you need 
//         // borderWidth: 1,
//         overflow: 'hidden',
//         shadowColor: 'red',
//         shadowRadius: 10,
//         shadowOpacity: 1,
//         elevation: 50
//     }
// });

// export default App;