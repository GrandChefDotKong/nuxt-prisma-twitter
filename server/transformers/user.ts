import { User } from "~~/types/user";

export const userTransformer = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    profileImage: user.profileImage
  } as User
}