import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

/* ===============================
   ZOD SCHEMA (Sesuai UI)
================================ */
const createCaseSchema = z.object({
  victimName: z.string().min(1, 'Nama korban wajib diisi'),
  caseType: z.string().min(1, 'Jenis kasus wajib diisi'),
  summary: z.string().min(1, 'Ringkasan kasus wajib diisi'),
  status: z.enum([
    'OPEN',
    'IN_PROGRESS',
    'UNDER_REVIEW',
    'CLOSED',
  ]).optional(),
});

/* ===============================
   GET /api/cases
   List & filter data kasus
================================ */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const status = searchParams.get('status');
    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;

    const [cases, total] = await Promise.all([
      prisma.case.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.case.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: cases,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET /cases error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data kasus' },
      { status: 500 }
    );
  }
}

/* ===============================
   POST /api/cases
   Tambah kasus baru
================================ */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createCaseSchema.parse(body);

    const newCase = await prisma.case.create({
      data: {
        victimName: validated.victimName,
        caseType: validated.caseType,
        summary: validated.summary,
        status: validated.status || 'OPEN',
      },
    });

    return NextResponse.json(
      { success: true, data: newCase },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /cases error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validasi gagal',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan kasus' },
      { status: 500 }
    );
  }
}