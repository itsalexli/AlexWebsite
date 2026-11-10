// "# label ———" heading: grey Playfair label followed by a thin rule.
export default function SectionHeader({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        width: "100%",
      }}
      className="section-header"
    >
      <span
        className="font-subheading"
        style={{
          color: "rgba(255, 255, 255, 0.5)",
          fontSize: "1rem",
          whiteSpace: "nowrap",
        }}
      >
        # {label}
      </span>
      <span
        style={{
          flex: 1,
          height: "1px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      />
    </div>
  );
}
