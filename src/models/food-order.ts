export interface FoodOrder {
    _id: number
    email: string
    orders: {
        name: string
        numberOfMeals: number
    }[]
    address: string
    receiver: string
    orderDate: string
    orderState: number
    totalPrice: number
    receiverPhoneNumber: number
}