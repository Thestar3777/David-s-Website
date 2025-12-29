// lib/youtube.ts
export function extractYouTubeId(urlOrId: string) {
  const match = urlOrId.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : urlOrId;
}

export function getThumbnailUrls(idOrUrl: string) {
  const id = extractYouTubeId(idOrUrl);
  return {
    max: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    hq: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    id,
  };
}