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
