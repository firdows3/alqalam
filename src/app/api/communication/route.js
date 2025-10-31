import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const communications = await prisma.communication.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            grade: true,
            section: true,
          },
        },
        teacher: {
          select: {
            id: true,
            user: {
              select: {
                username: true, // ✅ fetch from related User
              },
            },
          },
        },
        parent: {
          select: {
            id: true,
            user: {
              select: {
                username: true, // ✅ same for parent
              },
            },
          },
        },
      },
    });

    return NextResponse.json(communications, { status: 200 });
  } catch (error) {
    console.error("Error fetching communications:", error);
    return NextResponse.json(
      { error: "Failed to fetch communications" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      studentId,
      date,
      homeworkSubjects,
      dailyStatus,
      needExtraHelp,
      teacherNote,
    } = body;

    // ✅ Fetch the student to get its teacherId and parentId
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    const newCommunication = await prisma.communication.create({
      data: {
        studentId,
        teacherId: student.teacherId,
        parentId: student.parentId,
        homeworkSubjects,
        dailyStatus,
        needExtraHelp,
        teacherNote,
        parentComment: "",
        createdAt: new Date(date || Date.now()),
      },
    });

    return NextResponse.json(
      { success: true, newCommunication },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating communication:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Update parent comment
export async function PUT(req) {
  try {
    const { id, parentComment } = await req.json();

    const updatedComm = await prisma.communication.update({
      where: { id },
      data: { parentComment },
    });

    return NextResponse.json(updatedComm, { status: 200 });
  } catch (error) {
    console.error("Error updating parent comment:", error);
    return NextResponse.json(
      { error: "Failed to update parent comment" },
      { status: 500 }
    );
  }
}
