import FadeIn from "./FadeIn";

export default function PageHeader({ eyebrow, title, subtitle, icon }) {
  return (
    <section className="page-header">
      <div className="page-header-deco-1" />
      <div className="page-header-deco-2" />
      <div className="page-header-inner">
        <FadeIn>
          {icon && <div className="page-header-icon">{icon}</div>}
          <span className="section-kicker">{eyebrow}</span>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
          <div className="section-underline" />
        </FadeIn>
      </div>
    </section>
  );
}
