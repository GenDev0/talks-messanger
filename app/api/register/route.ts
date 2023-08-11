import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

import prismadb from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return new NextResponse("Missing Informations", { status: 400 });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: { email, name, hashedPassword: hashPassword },
    });
    const { hashedPassword, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error: any) {
    console.log("REGISTER_POST : ", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
