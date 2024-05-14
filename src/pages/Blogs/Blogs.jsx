import { Helmet } from "react-helmet-async";

const Blogs = () => {
  return (
    <div className="w-[90%] mx-auto py-16 lg:py-20 space-y-20">
      <Helmet>
        <title>CH | Blogs</title>
      </Helmet>
      <div className="grid gap-10 row-gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="mb-3">
            <a
              href="/"
              aria-label="Article"
              className="inline-block transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-4xl ">
                What is an access token and refresh token?
              </p>
            </a>
          </div>
          <div className="text-base  md:text-lg">
            <p >
              Imagine you entering a building with a keycard (access token). It grants temporary access to specific areas (resources) for a limited time. A security guard (authorization server) verifies your identity and issues the keycard.
            </p>
            <div className="space-y-2 mt-4">
              <li className="list-inside font-bold list-disc ">Access Token:
              </li>
              <p>Short-lived credential for authorized access to resources.
                Often transmitted in HTTP requests (e.g., authorization header).
                Expires quickly (e.g., minutes) for security reasons.</p>
              <li className="pt-2 list-inside font-bold list-disc ">Refresh Token:
              </li>
              <p>Longer-lived credential used to obtain new access tokens.
                Not used directly to access resources.
                Stored securely on the client-side.</p>
            </div>

          </div>
        </div>
        <div className="flex flex-col space-y-8 lg:col-span-3">
          <div>
            <div className="mb-3">
              <a
                href="/"
                aria-label="Article"
                className="inline-block transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-2xl">
                  How do they work?
                </p>
              </a>
            </div>
            <div className="space-y-2 mt-4">
              <p>Imagine logging in to an app (Login). The app sends your info to a secure server (Authorization) to confirm it is you. If valid, the server grants you two passes: a short-term one to access resources right away (Access Token) and a longer-term one to get new short-term passes later (Refresh Token). The app uses the short-term pass for API requests (API Requests). When that pass expires, the app checks for the longer-term pass (Client-Side Storage). If it has it, the app can get a new short-term pass from the server (Refresh) without you needing to log in again. If not, you will need to log in again.</p>

            </div>
          </div>
          <div>
            <div className="mb-3">
              <a
                href="/"
                aria-label="Article"
                className="inline-block transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-2xl">
                  Where should we store them on the client side?
                </p>
              </a>
            </div>
            <p className="mb-4 text-base  md:text-lg">
              We can store them in Cookies, Local Storage but these are less secure. Especially we should not store them in Local Storage, as it is easy to crack by script. Then what are the best options to store it?
            </p>

            <p className="pb-2"><span className="font-bold text-base md:text-lg ">Secure Enclaves: </span> Hardware-backed security for refresh tokens (e.g., WebAssembly, Trusted Execution Environments).

            </p>
            <p><span className="font-bold text-base md:text-lg ">Federated Authentication:</span> Third-party providers (e.g., Google, Facebook) handle secure storage and refresh.
            </p>

          </div>
        </div>
      </div>


      <div className="grid gap-10 row-gap-8  lg:grid-cols-5">
        <div className="col-span-2">
          <div className="mb-3">
            <a
              href="/"
              aria-label="Article"
              className="inline-block  transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-2xl">
                What is Express JS?
              </p>
            </a>
          </div>
          <p className="mb-4 text-base  md:text-lg">
            Express.js is like a toolbox that simplifies building web applications and APIs with Node.js. It provides pre-built tools for handling common tasks like routing (directing users to the right pages), handling different request types (like sending or receiving data), and managing data flow within your application. Think of it as a set of shortcuts that make development faster and easier.
          </p>
        </div>
        <div className="col-span-3">
          <div className="mb-3">
            <a
              href="/"
              aria-label="Article"
              className="inline-block  transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              <p className="font-sans text-xl font-extrabold leading-none tracking-tight lg:text-2xl">

                What is Nest JS
              </p>
            </a>
          </div>
          <p className="mb-4 text-base  md:text-lg">
            NestJS builds on top of Express.js, offering even more structure and organization for complex applications. Imagine NestJS as a more advanced toolbox that adds features like compartments to organize your tools (modules) and a way to easily share tools between different parts of your project (dependency injection). It also supports TypeScript, which helps catch errors early on and makes your code more readable. So, while Express.js is great for getting started quickly, NestJS is ideal for larger projects that require better maintainability and scalability.
          </p>

        </div>
      </div>
    </div>

  );
};
export default Blogs