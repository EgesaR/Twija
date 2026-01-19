const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className='py-14 max-w-6xl mx-auto px-5'>
    <h2 className='text-3xl font-semibold mb-6'>{title}</h2>
    {children}
  </section>
);
export default Section;