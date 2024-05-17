import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Resume = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <h1 className="text-5xl text-center font-bold">Resume...</h1>
            <section>

            </section>
            <section ref={componentRef} >
                <p className='text-5xl text-center'>i want to download this as PDF...</p>
            </section>
            <button className="btn" onClick={handlePrint}>Download</button>
        </div>
    );
};

export default Resume;