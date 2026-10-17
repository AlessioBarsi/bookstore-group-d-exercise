function Hero() {
    return (
        <div className="bg-[url('/images/home/home-image.png')] text-center p-1">
            <h1 className="text-4xl font-bold text-ink text-center">The <span className="text-primary">Quiet</span> Page</h1>
            <div className="italic text-dark">Independent Bookstore</div>
            <div className="text-ink/80">Lost in a book? We'll help you stay there</div>


            <div className="flex justify-center gap-1 my-3">
                <button className="bg-dark text-secondary p-2 font-bold rounded">Online Store</button>
                <button className="bg-secondary text-primary p-2 font-bold rounded">Discover our Events</button>
            </div>
            <div className="text-dark text-sm mt-2">123 Bookworm Lane</div>

        </div>
    )
}

export default Hero;