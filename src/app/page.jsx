import { client } from "@/sanity/lib/client";
import {
  HOMEPAGE_QUERY,
  INFO_QUERY_BY_KEY,
  NEWS_QUERY_IN_HOMEPAGE,
  WORKS_QUERY_IN_HOMEPAGE,
} from "@/sanity/lib/queries";
import NewsList from "@/components/news/NewsList";
import { Title } from "@/app/about/page";
import Redirect from "@/components/Redirect";
import HomeWorkList from "@/components/home/HomeWorkList";
import ResponsiveHero from "@/components/home/ResponsiveHero";

const Home = async () => {
  const homePageVideo = await client.fetch(HOMEPAGE_QUERY);
  const news = await client.fetch(NEWS_QUERY_IN_HOMEPAGE);
  const works = await client.fetch(WORKS_QUERY_IN_HOMEPAGE);
  const info = await client.fetch(INFO_QUERY_BY_KEY, { key: "home" });
  return (
    <main>
      <ResponsiveHero video={homePageVideo} info={info} />
      <div className="pt-[7vh] md:pt-0 lg:pt-[190px]"></div>
      <HomeWorkList works={works} />
      <Redirect
        text="See more works →"
        href={`/work`}
        className="padding-x border-0 mb-[100px] md:mb-[200px] lg:mb-[400px] mt-[30px]"
      />
      <section className="padding-x">
        <Title title="What’s New" />
        <NewsList news={news} triggerMode="intersection" />
      </section>
      <Redirect
        text="Read more about what’s going on  →"
        href={`/news`}
        className="keep-reading-btn padding-x border-0 mb-[100px] md:mb-[200px] lg:mb-[400px] mt-[30px] lg:mt-[90px]"
      />
    </main>
  );
};

export default Home;
