import siteMetadata from '@/data/siteMetadata'
import projectsDataHighlights from '@/data/projects/highlight'
import projectsDataApps from '@/data/projects/apps'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Projects
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Wondering how I spent my free time?
        </p>
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
        Highlights
      </h2>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {projectsDataHighlights.map((d) => (
            <Card
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
            />
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
        Apps
      </h2>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {projectsDataApps.map((d) => (
            <Card
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
            />
          ))}
        </div>
      </div>
    </>
  )
}
