export const authConfig = {
    pages: {
        signIn: "/login"
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin
            }
            return session
        },

        authorized({ auth, request }) {
            const user = auth?.user
            const isOnAdminPanel = request.nextUrl.pathname.startsWith('/admin')
            const isOnProductsPage = request.nextUrl.pathname.startsWith('/products')
            const isOnLoginPage = request.nextUrl.pathname.startsWith('/login')
            // console.log(auth?.user)


            //ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
            if (isOnAdminPanel && !user?.isAdmin) {
                return false;
            }


            // ONLY AUTHENTICATED USERS CAN REACH THE PRODUCTS PAGE

            // if (isOnProductsPage && !user) {
            //     return false;
            // }


            // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

            if (isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.nextUrl))
            }

            return true
        }
    }
}