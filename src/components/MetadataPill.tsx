type PillVariant = "default" | "gold" | "mauve" | "blush";

interface MetadataPillProps {
  label: string;
  value: string;
  variant?: PillVariant;
}

const variantStyles: Record<PillVariant, string> = {
  default: "bg-hkm-blush text-hkm-text-light",
  gold: "bg-[#F5EDE2] text-hkm-primary",
  mauve: "bg-[#F0E0E8] text-hkm-mauve",
  blush: "bg-hkm-blush text-hkm-text-muted",
};

export default function MetadataPill({
  label,
  value,
  variant = "default",
}: MetadataPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${variantStyles[variant]}`}
    >
      <span className="opacity-70">{label}:</span>
      <span className="font-semibold">{value}</span>
    </span>
  );
}
