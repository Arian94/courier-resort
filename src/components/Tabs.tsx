import { Button, Center, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";
import { FoodOrder } from "../models/food-order";

const jsonWebSocket = (ws: WebSocket, orders: FoodOrder[], setOrders: React.Dispatch<React.SetStateAction<FoodOrder[]>>) => {
    ws.onopen = () => {
        console.log("Connection open ...");
    };
    ws.onmessage = (evt) => {
        console.log('im here', evt);
        orders ? setOrders([...orders, JSON.parse(evt.data)]) : setOrders([JSON.parse(evt.data)]);
    };
    ws.onclose = (evt) => {
        console.log("Connection closed.");
    };
};

const OrderComp = (foodOrders: FoodOrder[]) => {
    return <VStack key={1} space={5} alignItems="center">
        {
            foodOrders.map((foodOrder, index) => {
                return <Center key={index} flex={1} px="3">
                    Address: {foodOrder.address}
                    Order: {foodOrder.orders.map(order => {
                        return <Text>{order.name} - {order.numberOfMeals}</Text>
                    })}
                    Name: {foodOrder.receiver}
                    Total Price: {foodOrder.totalPrice}
                </Center>
            })
        }
    </VStack>
}

export const TabsComponent = (props: { token: string }) => {
    const tabs = ["To Do", "Delivered"];
    const [active, setActive] = useState(0);
    const [orders, setOrders] = useState<FoodOrder[]>([]);
    const [courierws, setCourierws] = useState<WebSocket>();

    useEffect(() => {
        setCourierws(new WebSocket("ws://10.0.2.2:8080/courierws", props.token));
    }, [])

    useEffect(() => {
        if (courierws)
            jsonWebSocket(courierws, orders, setOrders);
    }, [courierws])

    return <>{
        [header(tabs, active, setActive),
        orders.length ? OrderComp(orders) : <Text key={"no order"}>{"No Orders Yet..."}</Text>]
    }</>
}

const header = (tabs: string[], active: number, setActive: React.Dispatch<React.SetStateAction<number>>) => {
    return tabs.map((title, index) => {
        return <TouchableHighlight key={index}
            activeOpacity={0.6}
            underlayColor={"gray"}
            style={{ width: "50%", backgroundColor: active === index ? "green" : "gray" }}
            onPress={() => setActive(index)}> 
            <Text style={{ paddingVertical: 10, textAlign: "center", color: "white", }}>{title}</Text>
        </TouchableHighlight>
    })
}