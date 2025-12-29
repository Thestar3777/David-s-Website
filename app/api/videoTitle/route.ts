
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`
    );
    if (!res.ok) return NextResponse.json({ title: null }, { status: res.status });
    const data = await res.json();
    return NextResponse.json({ title: data.title ?? null });
  } catch (err) {
    return NextResponse.json({ title: null }, { status: 500 });
  }
}