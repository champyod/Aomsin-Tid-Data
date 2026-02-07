
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dir = searchParams.get('dir') || 'analysis';

  // Construct path to public/data/{dir}
  // in Next.js, process.cwd() is the project root
  const dataDir = path.join(process.cwd(), 'public', 'data', dir);

  try {
    if (!fs.existsSync(dataDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs.readdirSync(dataDir)
      .filter(file => file.endsWith('.toml'))
      .map(file => ({
        name: file,
        path: `/data/${dir}/${file}`
      }));
    
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error listing files:", error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
