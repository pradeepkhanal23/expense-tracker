import heroImg from "../assets/images/finance.jpg";

const Hero = () => {
  return (
    <main>
      <section className="w-full h-full p-5 md:p-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-10 lg:flex-row md:space-x-10 ">
            <div className="flex flex-col justify-center space-y-4 flex-1">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter ">
                  Take Control of Your Expenses
                </h1>
                <p className="text-justify text-muted-foreground md:text-xl">
                  Our expense tracker helps you stay on top of your finances and
                  make informed decisions about your spending.
                </p>
              </div>
              <a
                href="#"
                className="w-full md:w-1/2 md:mr-auto inline-flex h-10  items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get Started
              </a>
            </div>
            <div className="flex-1">
              <img
                src={heroImg}
                alt="Hero"
                className="w-full md:w-2/3 mx-auto lg:w-full lg:order-last"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Hero;
