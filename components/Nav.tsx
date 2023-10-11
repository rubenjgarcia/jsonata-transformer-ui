import { CogIcon } from "@heroicons/react/outline";

const navigation = [{ name: "How to use it", href: "#how-to-use-it" }];


export default function Nav() {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="relative pt-6 pb-8 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav
            className="relative flex items-center justify-between sm:h-10 md:justify-center"
            aria-label="Global"
          >
            <div className="hidden md:flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between md:w-auto w-4 h-4 fill-white">
                <CogIcon className="w-4 h-4"/>
              </div>
            </div>
            <div className="hidden md:flex space-x-10">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-200 hover:text-pink-400"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
              <span className="inline-flex rounded-md shadow">
                <a
                  href="https://github.com/boyney123/eventbridge-transformer"
                  target="_blank"
                  className="inline-flex items-center px-4 py-2 border text-base font-medium rounded-md text-gray-200 border-yellow-500 hover:border-yellow-200 bg-transparent "
                  rel="noreferrer"
                >
                  View on GitHub &rarr;
                </a>
              </span>
            </div>
          </nav>
        </div>

        <main className="mt-10 md:mt-24 mx-auto max-w-7xl px-4 ">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                JSONata Transformer
              </span>{" "}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-200 font-light sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transform your JSON with JSONata
            </p>
            <p className="hidden md:block mt-3 max-w-md mx-auto text-base text-gray-400 font-light  md:mt-5 md:text-lg md:max-w-3xl">
              Enter your origin JSON, create your transformers, preview it.
            </p>
            <p className="block md:hidden mt-3 max-w-md mx-auto text-base text-yellow-400 opacity-50 font-light  md:mt-5 md:text-lg md:max-w-3xl">
              ⚠️ This tool is best viewed on a bigger screen ⚠️
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
