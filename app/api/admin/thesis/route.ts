import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    // Check if user is admin
    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "abstract",
      "authorName",
      "advisorName",
      "department",
      "program",
      "categoryId",
      "degreeLevel",
      "submissionDate",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Generate citation with proper author formatting
    const submissionYear = new Date(body.submissionDate).getFullYear();
    const authors = body.authorName.includes(',') 
      ? body.authorName.split(',').map((name: string) => name.trim())
      : [body.authorName.trim()];
    
    let authorCitation;
    if (authors.length === 1) {
      authorCitation = authors[0];
    } else if (authors.length === 2) {
      authorCitation = `${authors[0]} & ${authors[1]}`;
    } else {
      authorCitation = `${authors[0]} et al.`;
    }
    
    const citation = `${authorCitation} (${submissionYear}). ${body.title}. ${body.program}, ${body.university || "State University"}.`;

    // Create thesis in database
    const thesis = await prisma.thesis.create({
      data: {
        title: body.title,
        abstract: body.abstract,
        authorName: body.authorName,
        authorEmail: body.authorEmail || null,
        studentId: body.studentId || null,
        advisorName: body.advisorName,
        coAdvisorName: body.coAdvisorName || null,
        committeeMembers: body.committeeMembers || [],
        department: body.department,
        program: body.program,
        university: body.university || "State University",
        degreeLevel: body.degreeLevel,
        categoryId: body.categoryId,
        keywords: body.keywords || [],
        language: body.language || "English",
        submissionDate: new Date(body.submissionDate),
        defenseDate: body.defenseDate ? new Date(body.defenseDate) : null,
        status: body.status || "APPROVED",
        citation: citation,
        uploadedByUserId: currentUser.id,
        approvalDate: body.status === "APPROVED" ? new Date() : null,
        approvedBy: body.status === "APPROVED" ? currentUser.id : null,
      },
    });

    // Fetch the complete thesis with relations
    const completeThesis = await prisma.thesis.findUnique({
      where: { id: thesis.id },
      include: {
        category: true,
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Thesis created successfully",
      thesis: completeThesis,
    });
  } catch (error) {
    console.error("Error creating thesis:", error);
    return NextResponse.json(
      { 
        message: "Internal server error", 
        error: error instanceof Error ? error.message : "Unknown error",
        details: error
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = {};
    
    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { authorName: { contains: search, mode: "insensitive" } },
        { department: { contains: search, mode: "insensitive" } },
        { abstract: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get thesis with pagination
    const [thesis, total] = await Promise.all([
      prisma.thesis.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: true,
          uploadedBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              downloads: true,
              favorites: true,
              ratings: true,
            },
          },
        },
      }),
      prisma.thesis.count({ where }),
    ]);

    return NextResponse.json({
      thesis,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching thesis:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Thesis ID is required" },
        { status: 400 }
      );
    }

    // Update thesis
    const updatedThesis = await prisma.thesis.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
        defenseDate: updateData.defenseDate ? new Date(updateData.defenseDate) : null,
        submissionDate: updateData.submissionDate ? new Date(updateData.submissionDate) : undefined,
      },
      include: {
        category: true,
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Thesis updated successfully",
      thesis: updatedThesis,
    });
  } catch (error) {
    console.error("Error updating thesis:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Thesis ID is required" },
        { status: 400 }
      );
    }

    // Delete thesis (chapters will be deleted automatically due to cascade)
    await prisma.thesis.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Thesis deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting thesis:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}