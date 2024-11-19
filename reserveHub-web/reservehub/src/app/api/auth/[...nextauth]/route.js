import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "email@example.com"},
                password: {label: "Password", type: "password"},

            },
            async authorize(credentials) {
                const user = {id: "1", name: "Test Admin", email: "TestAdmin@Res.com"};

                if (credentials.email === user.email && credentials.password === "password") {
                    return user
                } else {

                    return null;}
            }
        })
    ], pages: {
        login: "/signup",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.user = user
            }
            return token;
        },
        async session({session,token}) {
            session.user = token.user;
            return session
        },
    }
})


export { handler as GET, handler as POST};