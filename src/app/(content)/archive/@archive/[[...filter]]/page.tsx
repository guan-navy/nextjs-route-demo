import NewsLists from "@/src/components/news-lists";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/src/lib/new";
import Link from "next/link";
import React, { Suspense } from "react";
import { DUMMY_NEWS } from "@/dummy-news";
async function FilterHeader({ year, month }: { year: string; month: string }) {
  const availableYears = await getAvailableNewsYears();
  let links: string[] = availableYears;

  if (year && !month) {
    // news = await getNewsForYear(year);
    links = getAvailableNewsMonths(year);
  }

  if (year && month) {
    // news = await getNewsForYearAndMonth(year, month);
    links = [];
  }
  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link: string) => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
async function FilterNews({ year, month }: { year: string; month: string }) {
  let news: typeof DUMMY_NEWS | undefined;
  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }
  let newsContent = <>暂无新闻</>;
  if (news && news.length > 0) {
    newsContent = <NewsLists news={news}></NewsLists>;
  }
  return newsContent;
}

export default async function Page({
  params,
}: {
  params: Promise<{ filter?: string[] }>;
}) {
  const { filter = [] } = await params;
  const selectYear = filter[0];
  const selectMonth = filter[1];

  const availableMonths = selectYear ? getAvailableNewsMonths(selectYear) : [];

  const availableYears = await getAvailableNewsYears();

  if (
    (selectYear && !availableYears.includes(selectYear)) ||
    (selectMonth && !availableMonths.includes(selectMonth))
  ) {
    throw new Error("未找到相关新闻");
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <FilterHeader year={selectYear} month={selectMonth} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <FilterNews year={selectYear} month={selectMonth} />
      </Suspense>
    </>
  );
}
