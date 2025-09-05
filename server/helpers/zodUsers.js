import zod from 'zod';

const schema = zod.object({
    username: zod.string(),
    email: zod.string(),
    password: zod.string()
})

export const validateUser = (user) => {
    return schema.safeParse(user)
}