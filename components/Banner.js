/* eslint-disable prettier/prettier */
/* This example requires Tailwind CSS v2.0+ */
import { InformationCircleIcon } from '@heroicons/react/outline'

export default function Banner() {
  return (
    <div className="rounded-lg bg-cyan-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-cyan-800 p-2">
              <InformationCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">Website under construction 🚧</span>
              <span className="hidden md:inline">This website is under construction 🚧</span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="https://legacy.iqfareez.com"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-cyan-600 shadow-sm hover:bg-cyan-50"
            >
              Visit legacy website
            </a>
          </div>
          <div className="flex p-2 sm:-mr-2"></div>
        </div>
      </div>
    </div>
  )
}
