import React, { useState } from 'react';
import { Button, FormControl, Input, Stack, WarningOutlineIcon } from "native-base";
import { loginCourier } from '../apis/login';
import * as Keychain from "react-native-keychain";

const login = (event: { email: string, password: string }) => {
    console.log(event);

    // const response = await loginCourier(event)
    // const token: false | Keychain.UserCredentials = await response.json()
    // await Keychain.setGenericPassword('token', token as any)
    // // .then(res => res.json())         // username: token, password: token
    // // Keychain.setGenericPassword('token', response);

    // return token
    console.log(event);

    loginCourier(event)
        .then(res => res.json())
        .then(res => {                                  // username: token, password: token
            Keychain.setGenericPassword('token', res)
            return res;
        })
        .catch(err => console.log(err));


    // return false;
};

export const LoginComponent = () => {
    const [username, setUsername] = useState('j.shahi@gm.com');
    const [password, setPassword] = useState('12345678');

    return <FormControl isRequired>
        <Stack mx="4">
            <FormControl.Label>Email</FormControl.Label>
            <Input type="text" value={username} placeholder="Email" onChangeText={(event) => setUsername(event)} />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Must be valid Email.
            </FormControl.ErrorMessage>

            <FormControl.Label marginTop="5">Password</FormControl.Label>
            <Input type="password" value={password} placeholder="password" onChangeText={(event) => setPassword(event)} />
            <FormControl.HelperText>
                Must be at least 8 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                At least 8 characters are required.
            </FormControl.ErrorMessage>
        </Stack>
        <Button marginTop="10" onPress={() => login({ email: username, password })}>Login</Button>
    </FormControl>
}
