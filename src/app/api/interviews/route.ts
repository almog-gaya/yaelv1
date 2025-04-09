import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  console.log('API route called');
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  console.log('Requested filename:', filename);

  if (!filename) {
    console.log('No filename provided');
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  const publicDir = path.join(process.cwd(), 'public');
  const filePath = path.join(publicDir, filename);
  console.log('Looking for file at:', filePath);

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log('File not found at path:', filePath);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    console.log('File found, reading...');
    // Read file
    const fileBuffer = fs.readFileSync(filePath);
    console.log('File read successfully, size:', fileBuffer.length);
    
    // Set appropriate headers for docx file
    const headers = new Headers();
    headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    headers.set('Content-Length', fileBuffer.length.toString());

    console.log('Sending response with headers:', Object.fromEntries(headers.entries()));
    return new NextResponse(fileBuffer, {
      headers,
    });
  } catch (error: any) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'Error reading file', details: error?.message || 'Unknown error' }, { status: 500 });
  }
} 