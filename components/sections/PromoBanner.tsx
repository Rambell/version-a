interface PromoBannerProps {
  imageUrl: string;
  alt?: string;
  href?: string;
}

export default function PromoBanner({ imageUrl, alt = 'Promoción', href = '#' }: PromoBannerProps) {
  return (
    <a href={href} className="block w-full rounded-2xl overflow-hidden mb-6 hover:opacity-95 transition-opacity">
      <img src={imageUrl} alt={alt} className="w-full object-cover" />
    </a>
  );
}