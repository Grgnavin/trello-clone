import z from "zod";

export const usernameValidation = z
        .string()
        .min(3, "Username should have at least 3 characters")
        .max(25, "Username shouldn't have more than 25 characters")


export const UserSignupSchema = z.object({
        email: z.string().email(),
        username: usernameValidation,
        password: z.string()
                                .min(8, "Password must be at least 8 characters")
                                .max(20, "Password shouldn't have more than 20 characters")
})

export const UserSigninSchema = z.object({
        email: z.string(),
        password: z.string()
}) 