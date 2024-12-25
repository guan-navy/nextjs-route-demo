import NewsLists from "@/src/components/news-lists";
import { getAllNews } from "@/src/lib/new";
export default async function NewsPage() {

  const news = await getAllNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsLists news={news}></NewsLists>
    </>
  );
}
