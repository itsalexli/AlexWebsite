// "# label ———" heading: italic grey label followed by a thin rule.
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
        style={{
          color: "rgba(255, 255, 255, 0.5)",
          fontFamily: "var(--font-title)",
          fontStyle: "italic",
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
