const images = import.meta.glob<string>(
  '../assets/images/*.{png,jpg,jpeg,webp,svg}',
  {
    import: 'default',
    eager: true,
  }
);

export const getImageUrl = (name: string): string => {
  const path = `../assets/images/${name}`;

  const url = images[path];
  if (!url) {
    console.warn(`Image not found: ${name}`);
    return ''; // or fallback image
  }

  return url;
}

// utils/images.ts
export const getTourImage = (title: string, imageUrl?: string | null): string => {
  // 1. If we have a URL from Supabase/FastAPI, use it
  if (imageUrl) return imageUrl;
  
  // 2. Fallback to local assets based on title or a default
  // (Your existing getImageUrl logic here)
  return "/placeholder-tour.jpg"; 
};