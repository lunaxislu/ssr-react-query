import axios, { AxiosError, AxiosResponse } from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface IAuth {
  email: string;
  password: string;
}
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "HTTLogin",
      type: "credentials",
      name: "CredentialsLogin",

      credentials: {},
      // credentials: {
      //   email: { label: "email", value: "", type: "text" },
      //   password: { type: "password" },
      //   passwordCheck: {},
      // },

      async authorize(credentials, req) {
        const { email, password } = credentials as IAuth;
        try {
          const { data } = await axios.post<IAuth, AxiosResponse>(
            "http://localhost:4000/auth/sign-in",
            {
              email,
              password,
            },
          );

          return data;
        } catch (err) {
          if (err instanceof AxiosError) {
            throw new Error(JSON.stringify(err.response?.data));
          }
          return null;
        }
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    // //무언가 데이터를 넘겨주고 싶으면 jwt 토큰에 데이터를 유지하고 session 에서 처리해줘야함
    async jwt({ token, user, session, trigger }) {
      // user라는 객체는 authorize에서 return 해준 값이다.
      // const payload = jwt.verify(user.token, "ijasidjf");
      // console.log(payload, "decoding한 payload임");
      //{ email: 'cmk0905@naver.com', iat: 1722326528, exp: 1722542528 }
      // iat: 1722326528, exp: 1722542528

      if (user) {
        token.role = "user";
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        return token;
      }
      return token;
    },

    async session({ session, token, user }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;

        return session;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth", // default로 생성된 로그인 page를 overriding 할 수 있다. https://next-auth.js.org/configuration/pages
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
export default NextAuth(authOptions);
