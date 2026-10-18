function Hero() {
  return (
    <div className="flex flex-col md:flex-row min-h-[40vh]">
      {/* Left half */}
      <div
        className="
          relative md:w-1/2
          bg-[url('/images/home/home-image-2.png')] bg-cover bg-center
          flex flex-col justify-center items-center text-center
          px-6 py-8
        "
      >
        {/* Overlay layer */}
        <div className="absolute inset-0 bg-bg/65"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-ink mb-1">
            The <span className="text-primary">Quiet</span> Page
          </h1>
          <div className="italic md:text-2xl text-dark mb-1">Independent Bookstore</div>
          <div className="text-ink/80 md:text-xl mb-4">Lost in a book? We'll help you stay there</div>

          <div className="flex gap-3 mb-4">
            <button className="primary-button">Online Store</button>
            <button className="secondary-button">Discover our Events</button>
          </div>
          <div className="text-ink md:text-xl font-bold text-sm">Come visit us at 1518 Bookworm Lane</div>
        </div>
      </div>

      {/* Right half: Image */}
      <div className="md:w-1/2">
        <img
          src="/images/home/home-image-1.png"
          alt="The Quiet Page Bookstore"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
export default Hero;