import { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { fail, ok } from '@/lib/response';
import { optionsResponse } from '@/lib/cors';

export const dynamic = 'force-dynamic';

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return fail('Không tìm thấy file tải lên', 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    
    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Generate a unique filename using timestamp
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const ext = cleanFileName.split('.').pop() || 'png';
    const filename = `product_${timestamp}.${ext}`;
    const filePath = join(uploadDir, filename);

    // Save file to public/uploads
    await writeFile(filePath, buffer);

    const fileUrl = `http://localhost:3000/uploads/${filename}`;
    return ok({ url: fileUrl }, 'Tải ảnh lên thành công');
  } catch (error: any) {
    return fail('Lỗi tải ảnh lên', 500, error.message);
  }
}
