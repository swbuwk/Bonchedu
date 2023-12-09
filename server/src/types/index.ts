export interface RequestWithUser extends Request {
    user: RequestUser
}

export interface RequestUser {
    id: string
    username: string
    roles: RequestUserRole[]
}

interface RequestUserRole {
    id: string,
    name: string,
    description: string
}