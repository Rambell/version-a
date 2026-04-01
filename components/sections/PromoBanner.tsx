interface PromoBannerProps {
  imageUrl: string;
  alt?: string;
  href?: string;
}

export default function PromoBanner({ imageUrl, alt = 'Promoción', href = '#' }: PromoBannerProps) {
  return (
    <a href={href} className="block w-full rounded-2xl overflow-hidden mb-6 hover:opacity-95 transition-opacity">
      <img src={'https://adipa.cl/content/uploads/2026/04/banner1-1.webp'} alt={alt} className="w-full object-cover" />
    </a>
  );
}