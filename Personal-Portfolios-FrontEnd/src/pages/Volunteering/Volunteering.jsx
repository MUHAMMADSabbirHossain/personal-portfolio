import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Volunteering = () => {

    const loadedVolunteerings = useLoaderData();
    const volunteerings = loadedVolunteerings;
    console.log(volunteerings);

    return (
        <div>
            <h2 className='text-center'>This is Volunteering page.</h2>

            <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 m-5'>
                {
                    volunteerings.map((volunteering) => <div key={volunteering._id}>
                        <div className="card max-w-96 glass mx-auto">
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={volunteering.title} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{volunteering.title} <div className="badge badge-secondary font-bold">${volunteering.amount}</div>
                                </h2>
                                <p>{volunteering.details}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Bookmark</button>
                                    {/* <button className="btn btn-primary">Volunteering now!</button> */}
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </section>
        </div>
    );
};

export default Volunteering;