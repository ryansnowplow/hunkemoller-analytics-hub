interface Field {
  name: string;
  displayName: string;
  type: string;
  fieldType: "dimension" | "measure";
  description: string;
  sql?: string;
}

interface FieldTableProps {
  fields: Field[];
}

export default function FieldTable({ fields }: FieldTableProps) {
  if (fields.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-hkm-border-light">
      <table className="w-full text-sm">
        <thead>
          <tr className="sticky top-0 bg-hkm-blush text-left">
            <th className="px-4 py-3 font-semibold text-hkm-primary">Field Name</th>
            <th className="px-4 py-3 font-semibold text-hkm-primary">Type</th>
            <th className="px-4 py-3 font-semibold text-hkm-primary">Description</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr
              key={field.name}
              className={index % 2 === 0 ? "bg-hkm-white" : "bg-[#F6EDED]"}
            >
              <td className="px-4 py-3">
                <code className="text-xs font-mono bg-hkm-blush text-hkm-primary px-1.5 py-0.5 rounded">
                  {field.name}
                </code>
                {field.displayName !== field.name && (
                  <span className="block text-xs text-hkm-text-muted mt-0.5">
                    {field.displayName}
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full ${
                    field.fieldType === "dimension"
                      ? "bg-[#F0E0E8] text-hkm-mauve"
                      : "bg-[#F5EDE2] text-hkm-primary"
                  }`}
                >
                  {field.fieldType}
                </span>
                <span className="block text-[11px] text-hkm-text-muted mt-0.5">
                  {field.type}
                </span>
              </td>
              <td className="px-4 py-3 text-hkm-text-light max-w-lg">
                {field.description}
                {field.sql && (
                  <code className="block text-xs font-mono bg-hkm-code-bg text-hkm-blush px-2 py-1.5 rounded mt-2 whitespace-pre-wrap">
                    {field.sql}
                  </code>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
