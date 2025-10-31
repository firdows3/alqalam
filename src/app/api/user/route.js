import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    // Fetch all users grouped by role
    const teachers = await prisma.user.findMany({
      where: { role: "TEACHER" },
      include: {
        teacher: {
          include: { students: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const parents = await prisma.user.findMany({
      where: { role: "PARENT" },
      include: {
        parent: {
          include: { students: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    const students = await prisma.student.findMany({
      include: {
        parent: { select: { user: { select: { username: true } } } },
        teacher: { select: { user: { select: { username: true } } } },
      },
      orderBy: { id: "asc" },
    });
    return NextResponse.json(
      {
        success: true,
        teachers,
        parents,
        students,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const data = await req.json();
  const {
    username,
    password,
    role,
    grade,
    section,
    experience,
    phone,
    students,
  } = data;

  try {
    // 1️⃣ Create the base user
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already exists. Choose another one.",
        },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        role: role, // TEACHER, PARENT, STUDENT
      },
    });

    let roleData;

    if (role === "TEACHER") {
      // Create teacher
      const teacher = await prisma.teacher.create({
        data: {
          userId: newUser.id,
          grade: Number(grade) || 0,
          section: section || "",
          experience: Number(experience) || 0,
          phone: phone || "",
        },
      });
      console.log(teacher);

      roleData = teacher;
    } else if (role === "PARENT") {
      // Create parent
      const parent = await prisma.parent.create({
        data: {
          userId: newUser.id,
          phone: phone || "",
        },
      });

      // Create students under this parent
      if (students && Array.isArray(students)) {
        for (const s of students) {
          // Find the teacher for student's grade & section
          const teacher = await prisma.teacher.findFirst({
            where: { grade: Number(s.grade), section: s.section },
          });

          if (!teacher) {
            console.warn(
              `No teacher found for grade ${s.grade}, section ${s.section}`
            );
            continue; // skip student if no teacher assigned
          }

          await prisma.student.create({
            data: {
              grade: Number(s.grade),
              section: s.section,
              age: Number(s.age),
              parentId: parent.id,
              teacherId: teacher.id,
              // name or other info can be stored in Student model
              name: s.name,
            },
          });
        }
      }

      roleData = parent;
    }

    return NextResponse.json({ success: true, newUser, roleData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, username, password, role } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(username && { username }),
        ...(password && { password }),
        ...(role && { role }),
      },
    });

    return NextResponse.json({ success: true, updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
