import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const uploadDir = path.join(process.cwd(), '/public/uploads');

  try {
    await fs.promises.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directory:', error);
    return NextResponse.json({ error: 'Failed to create upload directory.' }, { status: 500 });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  try {
    const [fields, files] = await form.parse(req as any);
    const file = files.cover?.[0];

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }
    
    const filePath = file.newFilename;
    return NextResponse.json({ filename: filePath, url: `/uploads/${filePath}` });

  } catch (err) {
    console.error('Error parsing form:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
