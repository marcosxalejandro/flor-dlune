import { NextResponse } from 'next/server';

const PLAYLIST_ID = '1jEH89wpHJAlu8aDj5uYKX';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

async function getSpotifyAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Spotify token error:', errorText);
    throw new Error('Failed to get Spotify access token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getSpotifyAccessToken();

    // Fetch tracks directly (more reliable than the fields trick on /playlists)
    const tracksRes = await fetch(
      `${SPOTIFY_API_BASE}/playlists/${PLAYLIST_ID}/tracks?limit=50&fields=items(track(id,name,preview_url,duration_ms,artists(name),external_urls(spotify)))`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      }
    );

    if (!tracksRes.ok) {
      const errorBody = await tracksRes.text();
      console.error('Spotify tracks fetch error:', tracksRes.status, errorBody);
      throw new Error(`Spotify tracks fetch failed: ${tracksRes.status}`);
    }

    const tracksData = await tracksRes.json();

    // Transform into clean array
    const tracks = (tracksData.items || [])
      .filter((item: any) => item.track)
      .map((item: any) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists.map((a: any) => a.name).join(', '),
        previewUrl: item.track.preview_url, // 30s preview or null
        durationMs: item.track.duration_ms,
        spotifyUrl: item.track.external_urls?.spotify,
      }));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify playlist previews' },
      { status: 500 }
    );
  }
}
