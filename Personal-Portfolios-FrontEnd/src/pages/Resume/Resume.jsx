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
            <h1 className="text-5xl text-center font-bold p-5">Resume...</h1>

            <div className="flex flex-col w-full border-opacity-50">
                <div className="grid card bg-base-300 rounded-box place-items-center w-max sm:w-full mx-auto">

                    {/* input */}
                    <section>
                        <form >
                            {/* basic info */}
                            <div className='flex flex-col sm:flex-row justify-evenly'>
                                <div className='flex flex-col px-10 my-5'>
                                    {/* <label htmlFor="name">Name: </label>
                                    <input type="text" name='name' id='name' placeholder='Your name' onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>
                                        <label
                                            htmlFor="name"
                                            className="input input-bordered flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                            <input
                                                type="text" name='name'
                                                id='name'
                                                className="grow"
                                                placeholder="Your full name"
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>

                                    {/* <label htmlFor="location">Location:</label>
                                    <input type="text" name="" id="location" placeholder='city, country' onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Location</span>
                                        </label>
                                        <label
                                            htmlFor="location"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text" name='location'
                                                id='location'
                                                className="grow"
                                                placeholder="City, Country"
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>

                                    {/* <label htmlFor="email">Email: </label>
                                    <input type="email" name='email' id='email' placeholder='example@mail.com' onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <label
                                            htmlFor="email"
                                            className="input input-bordered flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                            <input
                                                type="email" name='email'
                                                id='email'
                                                className="grow"
                                                placeholder="example@mail.com"
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>

                                </div>

                                <div className='flex flex-col px-10 my-5'>
                                    {/* <label htmlFor="phone">Phone: </label>
                                    <input type="tel" name="" id="phone" onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone</span>
                                        </label>
                                        <label
                                            htmlFor="phone"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="tel" name='phone'
                                                id='phone'
                                                className="grow"
                                                placeholder=""
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>

                                    {/* <label htmlFor="linkedin">LinkedIn: </label>
                                    <input type="url" name="" id="linkedin" placeholder='https://www.linkedin.com/in/' onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">LinkedIn</span>
                                        </label>
                                        <label
                                            htmlFor="linkedin"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="url" name='linkedin'
                                                id='linkedin'
                                                className="grow"
                                                placeholder="https://www.linkedin.com/in/"
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>

                                    {/* <label htmlFor="github">GitHub: </label>
                                    <input type="url" name='' id='github' placeholder='https://github.com/' onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">GitHub</span>
                                        </label>
                                        <label
                                            htmlFor="github"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text" name='github'
                                                id='github'
                                                className="grow"
                                                placeholder="https://github.com/"
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* summary */}
                            {/* <label htmlFor="summary">Summary: </label>
                                <textarea name="summary" id="summary" cols="40" rows="5" onChange={handleResumeForm} defaultValue={summary} placeholder=''></textarea> */}
                            {/* <input type="text" name='' id='summary' placeholder='' onChange={handleResumeForm} /> */}
                            <label
                                htmlFor="summary"
                                className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Summary</span>
                                </div>
                                <textarea
                                    name="summary"
                                    id="summary"
                                    onChange={handleResumeForm}
                                    defaultValue={summary}
                                    className="textarea textarea-bordered h-24" placeholder="Write the summary of realted skills..."></textarea>
                            </label>

                            <div className='flex flex-col md:flex-row justify-evenly my-5'>
                                {/* experience */}
                                <div className='flex flex-col space-y-1' >
                                    {/* <label htmlFor="postTitle">Post Title: </label>
                                    <input type="text" name="postTitle" id="postTitle" placeholder='' onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Post Title</span>
                                        </label>
                                        <label
                                            htmlFor="postTitle"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text" name='postTitle'
                                                id='postTitle'
                                                className="grow"
                                                placeholder=""
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>

                                    {/* <label htmlFor="companyName">Company name: </label>
                                    <input type="text" name="" id="companyName" placeholder='' onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Company Name</span>
                                        </label>
                                        <label
                                            htmlFor="companyName"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text" name='companyName'
                                                id='companyName'
                                                className="grow"
                                                placeholder=""
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>

                                    {/* <label htmlFor="duration">Duration: </label>
                                    <input type="text" name="" id="duration" placeholder='from to year, city' onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Duration</span>
                                        </label>
                                        <label
                                            htmlFor="duration"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text" name='duration'
                                                id='duration'
                                                className="grow"
                                                placeholder="from to year, city"
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>
                                </div>

                                {/* projects */}
                                <div className='flex flex-col space-y-1'>
                                    {/* <label htmlFor="projectTitle">Project Title:
                                    </label>
                                    <input type="text" name="" id="projectTitle" placeholder='' onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Project Title</span>
                                        </label>
                                        <label
                                            htmlFor="projectTitle"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text" name='projectTitle'
                                                id='projectTitle'
                                                className="grow"
                                                placeholder=""
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>

                                    {/* <label htmlFor="projectDuration">Duration: </label>
                                    <input type="text" name="" id="projectDuration" placeholder='' onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Project Duration</span>
                                        </label>
                                        <label
                                            htmlFor="projectDuration"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text" name='projectDuration'
                                                id='projectDuration'
                                                className="grow"
                                                placeholder=""
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>

                                    {/* <label htmlFor="projectLink">Link: </label>
                                    <input type="text" name="" id="projectLink" onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Project Link</span>
                                        </label>
                                        <label
                                            htmlFor="projectLink"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text" name='projectLink'
                                                id='projectLink'
                                                className="grow"
                                                placeholder=""
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>

                                    {/* <label htmlFor="porjectSummary">Summary: </label>
                                    <input type="text" name="" id="porjectSummary" onChange={handleResumeForm} /> */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Project Summary</span>
                                        </label>
                                        <label
                                            htmlFor="porjectSummary"
                                            className="input input-bordered flex items-center gap-2">
                                            <input
                                                type="text" name='porjectSummary'
                                                id='porjectSummary'
                                                className="grow"
                                                placeholder=""
                                                onChange={handleResumeForm} />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row justify-evenly my-5 gap-5'>
                                {/* education */}
                                {/* <label htmlFor="education">Education: </label>
                                    <textarea name="" id="education" cols="40" rows="5" defaultValue="" placeholder='' onChange={handleResumeForm}></textarea> */}
                                <label
                                    htmlFor="education"
                                    className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Education</span>
                                    </div>
                                    <textarea
                                        name="education"
                                        id="education"
                                        onChange={handleResumeForm}
                                        defaultValue=""
                                        className="textarea textarea-bordered h-24" placeholder="Write the summary of education..."></textarea>
                                </label>

                                {/* skills */}
                                {/* <label htmlFor="skills">Skills: </label>
                                    <textarea name="" id="skills" cols="40" rows="5" placeholder='' defaultValue="" onChange={handleResumeForm}></textarea> */}
                                <label
                                    htmlFor="skills"
                                    className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Skills</span>
                                    </div>
                                    <textarea
                                        name="skills"
                                        id="skills"
                                        onChange={handleResumeForm}
                                        defaultValue=""
                                        className="textarea textarea-bordered h-24" placeholder="Write the summary of education..."></textarea>
                                </label>
                            </div>
                        </form>
                    </section>
                </div>

                <div className="divider">Preview</div>

                <div className="grid card bg-base-300 rounded-box place-items-center mb-5 w-max sm:w-full mx-auto">
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
                            {
                                summary &&
                                <div>
                                    < div className='flex items-center'>
                                        <h2 className="uppercase mx-1 font-bold">summary</h2><MdSummarize />
                                    </div>
                                    <hr />
                                    <summary>{summary}</summary>
                                </div>
                            }

                            {/* experience */}
                            {
                                (postTitle || duration || companyName) &&
                                <div>
                                    <div className='flex items-center'>
                                        <h2 className="uppercase mx-1 font-bold">expreience</h2><GrUserExpert />
                                    </div>
                                    <hr />
                                    <div className='flex justify-between'>
                                        <p>{postTitle}</p>
                                        <p>{duration}</p>
                                    </div>
                                    <p>{companyName}</p>
                                </div>
                            }

                            {/* projects */}
                            {
                                (projectTitle || projectDuration || porjectSummary) &&

                                <div>
                                    <div className='flex items-center'>
                                        <h2 className="uppercase mx-1 font-bold">projects</h2><FaProjectDiagram />
                                    </div>
                                    <hr />
                                    <div className='flex justify-between'>
                                        <p>{projectTitle}</p>
                                        <p>{projectDuration}</p>
                                    </div>
                                    <p>{projectLink}</p>
                                    <summary>{porjectSummary}</summary>
                                </div>
                            }

                            {/* education */}
                            {
                                education &&
                                <div>
                                    <div className='flex items-center'>
                                        <h2 className="uppercase mx-1 font-bold">education</h2>
                                        <FaUserGraduate />
                                    </div>
                                    <hr />
                                    <summary>{education}</summary>
                                </div>
                            }
                            {/* skills */}
                            {
                                skills &&
                                <div>
                                    <div className='flex items-center'>
                                        <h2 className="uppercase mx-1 font-bold">skills</h2>
                                        <GiSkills />
                                    </div>
                                    <hr />
                                    <summary>{skills}</summary>
                                </div>
                            }
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