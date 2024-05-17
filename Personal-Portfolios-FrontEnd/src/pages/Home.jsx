import landingBgImg from "../assets/wavy-black-white-background.jpg";

const Home = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${landingBgImg})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to Micro-Services</h1>
                    <p className="mb-5">Our platform leverages microservices Operating independently, our Tailwind CSS component library, resume builder, and volunteering service ensure seamless integration for web development, career enhancement, and community involvement.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Home;