import { useLoaderData } from 'react-router-dom';

const Donation = () => {

    const loadedDonations = useLoaderData();
    const donations = loadedDonations;
    console.log(donations);
    return (
        <div>
            <h2 className='text-center'>This is Donation page.</h2>

            <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 m-5'>
                {
                    donations.map((donation) => <div key={donation._id}>
                        <div className="card max-w-96 glass mx-auto">
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={donation.title} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{donation.title} <div className="badge badge-secondary font-bold">${donation.amount}</div>
                                </h2>
                                <p>{donation.details}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Bookmark</button>
                                    <button className="btn btn-primary">Donate now!</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </section>
        </div>
    );
};

export default Donation;