import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const Resume = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [resumeInfo, setResumeInfo] = useState({
        name: "",
        // age: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        summary: "",
        postTitle: "",
        compayName: "",
        duration: "",
        projectTitle: "",
        projectDuration: "",
        projectLink: "",
        porjectSummary: "",
        education: "",
        skills: "",
    });

    const { name, age, location, email, phone, linkedin, github, summary, postTitle, compayName, duration, projectTitle, projectDuration, projectLink, porjectSummary, education, skills } = resumeInfo;

    function handleResumeForm(event) {
        setResumeInfo((prev) => {
            // console.log(prev);
            let helper = { ...prev };
            helper[`${event.target.id}`] = event.target.value;
            console.log(helper);
            return helper;
        })
    }

    return (
        <div>
            <h1 className="text-5xl text-center font-bold">Resume...</h1>

            <section>
                <form >
                    {/* basic info */}
                    <div className='flex flex-col sm:flex-row justify-evenly'>
                        <div className='flex flex-col px-10 my-5'>
                            <label htmlFor="name">Name: </label>
                            <input type="text" name='name' id='name' placeholder='Your name' onChange={handleResumeForm} />

                            <label htmlFor="location">Location:</label>
                            <input type="text" name="" id="location" placeholder='city, country' onChange={handleResumeForm} />

                            <label htmlFor="email">Email: </label>
                            <input type="email" name='email' id='email' placeholder='example@mail.com' onChange={handleResumeForm} />
                        </div>

                        <div className='flex flex-col px-10 my-5'>
                            <label htmlFor="phone">Phone: </label>
                            <input type="tel" name="" id="phone" onChange={handleResumeForm} />

                            <label htmlFor="linkedin">LinkedIn: </label>
                            <input type="url" name="" id="linkedin" placeholder='https://www.linkedin.com/in/' onChange={handleResumeForm} />

                            <label htmlFor="github">GitHub: </label>
                            <input type="url" name='' id='github' placeholder='https://github.com/' onChange={handleResumeForm} />
                        </div>
                    </div>

                    {/* summary */}
                    <div>
                        <label htmlFor="summary">Summary: </label>
                        {/* <input type="text" name='' id='summary' placeholder='' onChange={handleResumeForm} /> */}

                        <textarea name="summary" id="summary" cols="40" rows="5" onChange={handleResumeForm} defaultValue={summary} placeholder=''></textarea>
                    </div>

                    {/* experience */}
                    <div className=''>
                        <label htmlFor="postTitle">Post Title: </label>
                        <input type="text" name="postTitle" id="postTitle" placeholder='' onChange={handleResumeForm} />

                        <label htmlFor="company-name">Company name: </label>
                        <input type="text" name="" id="company-name" placeholder='' onChange={handleResumeForm} />

                        <label htmlFor="duration">Duration: </label>
                        <input type="text" name="" id="duration" placeholder='from to year, city' onChange={handleResumeForm} />
                    </div>

                    {/* projects */}
                    <div className=''>
                        <label htmlFor="projectTitle">Title:
                        </label>
                        <input type="text" name="" id="projectTitle" placeholder='' onChange={handleResumeForm} />

                        <label htmlFor="projectDuration">Duration</label>
                        <input type="text" name="" id="projectDuration" placeholder='' onChange={handleResumeForm} />

                        <label htmlFor="projectLink">Link: </label>
                        <input type="text" name="" id="projectLink" onChange={handleResumeForm} />

                        <label htmlFor="porjectSummary">Summary: </label>
                        <input type="text" name="" id="porjectSummary" onChange={handleResumeForm} />
                    </div>

                    {/* education */}
                    <div>
                        <label htmlFor="education">Education: </label>
                        <textarea name="" id="education" cols="40" rows="5" defaultValue="" placeholder='' onChange={handleResumeForm}></textarea>
                    </div>

                    {/* skills */}
                    <div>
                        <label htmlFor="skills">Skills: </label>
                        <textarea name="" id="skills" cols="40" rows="5" placeholder='' defaultValue="" onChange={handleResumeForm}></textarea>
                    </div>
                </form>
            </section>

            <section>
                <h2 className='text-center'>Preview</h2>
                <div ref={componentRef} >
                    {/* basic info */}
                    <div>
                        <h2 className='text-center font-bold bg-blue-500'>{name}</h2>
                        <div className='flex justify-evenly'>
                            <p className=''>{email}</p>
                            <p>{location}</p>
                            <p>{phone}</p>
                            <p>{linkedin}</p>
                            <p>{github}</p>
                        </div>
                    </div>

                    {/* summary */}
                    <div>
                        <h2 className="uppercase">summary</h2>
                        <summary>{summary}</summary>
                        <hr />
                    </div>

                    {/* experience */}
                    <div>
                        <h2 className="uppercase">expreience</h2>
                        <hr />
                        <p>{postTitle}</p>
                        <p>{compayName}</p>
                        <p>{duration}</p>
                    </div>

                    {/* projects */}
                    <div>
                        <h2 className="uppercase">projects</h2>
                        <hr />
                        <p>{projectTitle}</p>
                        <p>{projectDuration}</p>
                        <p>{projectLink}</p>
                        <summary>{porjectSummary}</summary>
                    </div>
                    {/* education */}
                    <div>
                        <h2 className="uppercase">education</h2>
                        <hr />
                        <summary>{education}</summary>
                    </div>
                    {/* skills */}
                    <div>
                        <h2 className="uppercase">skills</h2>
                        <hr />
                        <summary>{skills}</summary>
                    </div>
                </div>
                <button className="btn" onClick={handlePrint}>Download</button>
            </section>
        </div >
    );
};

export default Resume;