import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), '/public/uploads');

// Ensure the upload directory exists
fs.mkdirSync(uploadDir, { recursive: true });

async function parseFormData(req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
    return new Promise((resolve, reject) => {
        const form = formidable({
            uploadDir,
            keepExtensions: true,
        });

        form.parse(req as any, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                resolve({ fields, files });
            }
        });
    });
}


export async function POST(req: NextRequest) {
  try {
    const { fields, files } = await parseFormData(req);
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
