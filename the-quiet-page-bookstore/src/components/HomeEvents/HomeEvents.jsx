function Events() {
    return (
        <section className="relative bg-[url('/images/home/events-image.png')] bg-cover bg-center bg-fixed py-12 rounded my-2">
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-dark/70 rounded"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-bg text-center mb-8">This Month at The Quiet Page</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Book Club Card */}
                    <div className="bg-bg/90 rounded-lg p-6 text-center flex flex-col items-center gap-3">
                        <h3 className="text-xl font-bold text-ink">Monthly Book Club</h3>
                        <p className="text-ink/80">
                            Currently reading: <span className="italic font-bold text-primary">Dracula</span> (1897) by Bram Stoker
                        </p>
                        <p className="text-ink/60 text-sm">Last Thursday of every month at 7 PM</p>
                        <button className="primary-button mt-auto">Join the Discussion</button>
                    </div>

                    {/* Author Meetup Card */}
                    <div className="bg-bg/90 rounded-lg p-6 text-center flex flex-col items-center gap-3">
                        <h3 className="text-xl font-bold text-ink">Author Meetup</h3>
                        <p className="text-ink/80">
                            Meet local author <span className="italic font-bold text-primary">Sarah Mitchell</span> for a reading and Q&A session
                        </p>
                        <p className="text-ink/60 text-sm">This Friday at 7 PM</p>
                        <button className="secondary-button mt-auto">See Event Details</button>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Events;