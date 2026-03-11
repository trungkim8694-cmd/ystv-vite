import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
}

export function SEO({ title, description, schema }: SEOProps) {
  return (
    <Helmet>
      <title>{title} | Yến Sào Thượng Hạng</title>
      <meta name="description" content={description} />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
