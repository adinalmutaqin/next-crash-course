import { server } from "../../../config";
import Meta from "../../../components/Meta";

const article = ({ article }) => {
  return (
    <div>
      <Meta description={article.excerpt} title={article.title} />
      <h3>{article.title}</h3>
      <p>{article.body}</p>
    </div>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(`${server}/api/articles/${context.params.id}`);
  const article = await res.json();

  return {
    props: {
      article,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();

  const paths = articles.map((article) => ({
    params: { id: article.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default article;
