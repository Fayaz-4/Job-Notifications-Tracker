function RoutePlaceholder({ title, subtitle }) {
  return (
    <article className="route-page">
      <h1 className="route-page__title">{title}</h1>
      <p className="route-page__subtitle">{subtitle}</p>
    </article>
  );
}

export default RoutePlaceholder;
