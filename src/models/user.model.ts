export interface User {
    name: string,
    email: string,
    contact: string,
    cnic: string,
    password?: string,
    address:string,
    imageURL?: string,
    $key?: string
}