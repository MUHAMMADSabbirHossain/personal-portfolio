import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaGithub, FaMapLocationDot, FaLinkedin, FaSquarePhone, FaUserGraduate } from "react-icons/fa6";
import { MdEmail, MdSummarize } from "react-icons/md";
import { FaFileDownload, FaProjectDiagram } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { GrUserExpert } from "react-icons/gr";

const Resume = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [resumeInfo, setResumeInfo] = useState({
        name: "",
        // age: "",
        location: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        summary: "",
        postTitle: "",
        companyName: "",
        duration: "",
        projectTitle: "",
        projectDuration: "",
        projectLink: "",
        porjectSummary: "",
        education: "",
        skills: "",
    });

    const { name, age, location, email, phone, linkedin, github, summary, postTitle, companyName, duration, projectTitle, projectDuration, projectLink, porjectSummary, education, skills } = resumeInfo;

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
        <div className='mx-10'>
            <h1 className="text-5xl text-center font-bold">Resume...</h1>

            <div className="flex flex-col w-full border-opacity-50">
                <div className="grid card bg-base-300 rounded-box place-items-center">

                    {/* input */}
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
                            <div className='flex justify-center'>
                                <label htmlFor="summary">Summary: </label>
                                <textarea name="summary" id="summary" cols="40" rows="5" onChange={handleResumeForm} defaultValue={summary} placeholder=''></textarea>
                                {/* <input type="text" name='' id='summary' placeholder='' onChange={handleResumeForm} /> */}
                            </div>

                            <div className='flex flex-col md:flex-row justify-evenly my-5'>
                                {/* experience */}
                                <div className='flex flex-col space-y-1' >
                                    <label htmlFor="postTitle">Post Title: </label>
                                    <input type="text" name="postTitle" id="postTitle" placeholder='' onChange={handleResumeForm} />

                                    <label htmlFor="companyName">Company name: </label>
                                    <input type="text" name="" id="companyName" placeholder='' onChange={handleResumeForm} />

                                    <label htmlFor="duration">Duration: </label>
                                    <input type="text" name="" id="duration" placeholder='from to year, city' onChange={handleResumeForm} />
                                </div>

                                {/* projects */}
                                <div className='flex flex-col space-y-1'>
                                    <label htmlFor="projectTitle">Project Title:
                                    </label>
                                    <input type="text" name="" id="projectTitle" placeholder='' onChange={handleResumeForm} />

                                    <label htmlFor="projectDuration">Duration: </label>
                                    <input type="text" name="" id="projectDuration" placeholder='' onChange={handleResumeForm} />

                                    <label htmlFor="projectLink">Link: </label>
                                    <input type="text" name="" id="projectLink" onChange={handleResumeForm} />

                                    <label htmlFor="porjectSummary">Summary: </label>
                                    <input type="text" name="" id="porjectSummary" onChange={handleResumeForm} />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row justify-evenly my-5'>
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
                            </div>
                        </form>
                    </section>
                </div>

                <div className="divider">Preview</div>

                <div className="grid card bg-base-300 rounded-box place-items-center mb-5">
                    <section>
                        <div ref={componentRef} className='m-20'>
                            {/* basic info */}
                            <div>
                                <h2 className='text-center font-bold'>{name}</h2>
                                <div className='flex justify-evenly flex-wrap'>
                                    {
                                        location &&
                                        <span className='flex items-center'>
                                            <FaMapLocationDot />
                                            <address className='mx-1'>{location}</address>
                                        </span>
                                    }
                                    {
                                        email &&
                                        <span className='flex items-center'>
                                            <MdEmail />
                                            <a href={`mailto:${email}`} className='mx-1'>{email}</a>
                                        </span>
                                    }
                                    {
                                        phone &&
                                        <span className='flex items-center'>
                                            <FaSquarePhone />
                                            <a href={`tel:${phone}`} className='mx-1'>{phone}</a>
                                        </span>

                                    }
                                    {
                                        linkedin &&
                                        <span className='flex items-center'>
                                            <FaLinkedin />
                                            <a href={`${linkedin}`} target='_blank' className='mx-1'>{linkedin}</a>
                                        </span>
                                    }
                                    {
                                        github &&
                                        <span className='flex items-center'>
                                            <FaGithub />
                                            <a href={`${github}`} target='_blank' className='mx-1'>{github}</a>
                                        </span>
                                    }
                                </div>
                            </div>

                            {/* summary */}
                            <div>
                                < div className='flex items-center'>
                                    <h2 className="uppercase mx-1">summary</h2><MdSummarize />
                                </div>
                                <hr />
                                <summary>{summary}</summary>
                            </div>

                            {/* experience */}
                            <div>
                                <div className='flex items-center'>
                                    <h2 className="uppercase mx-1">expreience</h2><GrUserExpert />
                                </div>
                                <hr />
                                <div className='flex justify-between'>
                                    <p>{postTitle}</p>
                                    <p>{duration}</p>
                                </div>
                                <p>{companyName}</p>
                            </div>

                            {/* projects */}
                            <div>
                                <div className='flex items-center'>
                                    <h2 className="uppercase mx-1">projects</h2><FaProjectDiagram />
                                </div>
                                <hr />
                                <div className='flex justify-between'>
                                    <p>{projectTitle}</p>
                                    <p>{projectDuration}</p>
                                </div>
                                <p>{projectLink}</p>
                                <summary>{porjectSummary}</summary>
                            </div>
                            {/* education */}
                            <div>
                                <div className='flex items-center'>
                                    <h2 className="uppercase mx-1">education</h2>
                                    <FaUserGraduate />
                                </div>
                                <hr />
                                <summary>{education}</summary>
                            </div>
                            {/* skills */}
                            <div>
                                <div className='flex items-center'>
                                    <h2 className="uppercase mx-1">skills</h2>
                                    <GiSkills />
                                </div>
                                <hr />
                                <summary>{skills}</summary>
                            </div>
                        </div >
                        <div className='flex justify-center'>
                            <button className="btn m-2" onClick={handlePrint}>
                                Download PDF
                                <FaFileDownload />
                            </button>
                        </div>
                    </section >
                </div>
            </div>

        </div >
    );
};

export default Resume;