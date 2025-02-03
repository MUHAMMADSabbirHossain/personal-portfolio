import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Volunteering = () => {

    const loadedVolunteerings = useLoaderData();
    const volunteerings = loadedVolunteerings;
    // console.log(volunteerings);
    const reversedVolunteerings = [...volunteerings].reverse();

    return (
        <div>
            <h2 className='text-center'>This is Volunteering page.</h2>

            <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 m-5'>
                {
                    reversedVolunteerings.map((volunteering) => <div key={volunteering._id}>
                        <div className="card max-w-96 glass mx-auto  hover:scale-105 ease-in-out duration-300 hover:bg-gray-900 hover:text-white hover:shadow-inner">
                            <figure className="px-5 pt-5"><img src={volunteering?.photoUrl} alt={volunteering?.title} className='shadow-2xl' /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{volunteering.title} </h2>
                                <div className="badge badge-secondary font-bold">{volunteering?.address.slice(0, 25)}</div>
                                {
                                    (volunteering?.time && volunteering?.time) ?
                                        <div>
                                            <time datetime="">at {volunteering?.time}</time>
                                            <datetime> on {volunteering?.date}</datetime>
                                        </div> :
                                        <></>
                                }

                                <p>{
                                    volunteering?.details.length < 100 ?
                                        volunteering?.details :
                                        volunteering?.details.slice(0, 100)
                                }... (Read More)</p>
                                {/* <p>{volunteering.details}</p> */}
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => handleBookmark(volunteering)}
                                        className="btn btn-primary">Bookmark</button>
                                    {/* <button className="btn btn-primary">Donate now!</button> */}
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