import NextAuth, { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { Admin } from "@/models/Admin.mjs";
import { mongooseConnect } from "@/lib/mongoose";
import bcrypt from "bcrypt";

async function isAdminEmail(email) {
  await mongooseConnect(); 
  const admin = await Admin.findOne({ email });
  return !!admin; 
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? ""
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await mongooseConnect();
          const { email, password } = credentials;
          const user = await Admin.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (!passwordMatch) {
            return null;
          }

          return user;

        } catch (error) {
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session }) => {
      if (await isAdminEmail(session?.user?.email)) {
        session.user.role = "admin";
        return session;
      } else {
        return null;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  }
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user.role !== 'admin') {
    res.writeHead(401, { Location: '/error' });
    res.end();
    return false;
    // res.status(401).json({ error: 'No session found' });
    // return; 
  }
  return true;
}