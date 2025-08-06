
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdirSync } from 'fs';

const uploadDir = join(process.cwd(), '/public/uploads');

// Ensure the upload directory exists
try {
  mkdirSync(uploadDir, { recursive: true });
} catch (error) {
  console.error('Error creating upload directory:', error);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;
    const type: 'image' | 'resume' | null = data.get('type') as 'image' | 'resume' | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }
    if (!type) {
        return NextResponse.json({ error: 'Upload type not specified.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (type === 'resume') {
        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Invalid file type for resume. Only PDF is allowed.' }, { status: 400 });
        }
        const resumePath = join(process.cwd(), '/public/resume.pdf');
        await writeFile(resumePath, buffer);
        return NextResponse.json({ message: 'Resume uploaded successfully', url: '/resume.pdf' });
    }


    // Sanitize filename to prevent directory traversal
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const finalFilename = `${uniqueSuffix}-${sanitizedFilename}`;
    
    const filePath = join(uploadDir, finalFilename);

    await writeFile(filePath, buffer);

    const url = `/uploads/${finalFilename}`;

    return NextResponse.json({ filename: finalFilename, url: url });

  } catch (err) {
    console.error('Error handling upload:', err);
    let errorMessage = 'An unknown error occurred.';
    if (err instanceof Error) {
        errorMessage = err.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
