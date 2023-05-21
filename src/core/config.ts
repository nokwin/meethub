export const config = {
  passwordSalt: process.env.PASSWORD_SALT!,
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET!,
  },
};
