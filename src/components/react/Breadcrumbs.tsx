interface Breadcrumb {
  title: string;
  url: string;
}
interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {breadcrumbs.map(({ title, url }, index) => (
          <li
            className="inline-flex items-center text-1.5xl font-bold text-darkgreen gap-1"
            key={index}
          >
            <a href={url}>{title}</a>
            {index != breadcrumbs.length - 1 && <span>{`>`}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
