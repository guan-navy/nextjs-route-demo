import NewsLists from "@/src/components/news-lists"
import { getLatestNews} from "@/src/lib/new"

export default async function page() {

  

  const news= await getLatestNews()
  // console.log(news)
  return (
    <>
    <NewsLists news={news}></NewsLists>
    </>
  )
}