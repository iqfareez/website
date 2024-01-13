import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Typewriter from 'typewriter-effect'

// import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const headingColorClass =
    'bg-gradient-to-r from-yellow-600 to-red-600 dark:bg-gradient-to-l dark:from-emerald-500 dark:to-lime-600'
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1
            className={`mb-8 bg-clip-text text-4xl font-extrabold leading-[60px] tracking-tight text-transparent ${headingColorClass} md:text-7xl md:leading-[86px]`}
          >
            Welcome Aboard
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
          <Typewriter
            className="font-mono"
            options={{
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 25,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("I'm Fareez Iqmal")
                .pauseFor(2100)
                .deleteChars(12)
                .typeString('software engineer')
                .pauseFor(2100)
                .deleteChars(17)
                .typeString('also a hobbyist maker')
                .pauseFor(2100)
                .deleteAll()
                .typeString('I love tech')
                .pauseFor(2100)
                .deleteChars(4)
                .typeString('to build things')
                .pauseFor(2100)
                .start()
            }}
          />
          <p>While you're here, why don't you visit...</p>
          <div className="flex flex-col space-y-1">
            <Link href="/projects" className="hover:underline">
              {/*<Twemoji emoji="hammer-and-wrench" />*/}
              <span className="ml-2">🏗️ Stuffs that I've built?</span>
            </Link>
            <Link href="/blog" className="hover:underline">
              {/*<Twemoji emoji="memo" />*/}
              <span className="ml-2">✒️ My writings</span>
            </Link>

            <Link href="/about" className="hover:underline">
              {/*<Twemoji emoji="face-with-monocle" />*/}
              <span className="ml-2">👨🏼‍💻 More about me and myself</span>
            </Link>
          </div>
        </div>
        <ul className="mt-8 divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
