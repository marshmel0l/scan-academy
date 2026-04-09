// Logo — Scan Academy logo from public folder
interface LogoProps {
  /** Applied directly to the <img> element (Navbar usage) */
  className?: string;
  /** Also applied to the <img> element  (Footer usage alias) */
  imgClassName?: string;
}

export function Logo({ className, imgClassName }: LogoProps) {
  const resolvedClass = imgClassName ?? className ?? 'h-11 w-11 object-contain';
  return (
    <img
      src="/logo.png"
      alt="Scan Academy"
      className={resolvedClass}
      draggable={false}
    />
  );
}
