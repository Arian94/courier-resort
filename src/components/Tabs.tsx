import { Button, Text } from "native-base";
import React, { useState } from "react";
import { TouchableHighlight } from "react-native";

export const TabsComponent = () => {
    const tabs = ["To Do", "Delivered"];
    const [active, setActive] = useState(0);

    return <>{
        tabs.map((title, index) => {
            return <TouchableHighlight key={index}
                activeOpacity={0.6}
                underlayColor={"gray"}
                style={{ width: "50%", backgroundColor: active === index ? "green" : "gray" }}
                onPress={() => setActive(index)}>
                <Text style={{ paddingVertical: 10, textAlign: "center", color: "white", }}>{title}</Text>
            </TouchableHighlight>
        })
    }</>
}