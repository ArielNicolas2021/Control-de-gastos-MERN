import zod from 'zod';

const schema = zod.object({
    userID: zod.string(),
    date: zod.string(),
    amount: zod.number(),
    item: zod.string(),
    type: zod.string()
})

export const validateItem = (item) => {
    return schema.safeParse(item)
}

export const parcialItem = (item) => {
    return schema.partial().safeParse(item)
}