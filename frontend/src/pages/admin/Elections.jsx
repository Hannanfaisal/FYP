
import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import Modal from '../../components/Modal';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ClipLoader from "react-spinners/ClipLoader";




const Elections = () => {

    const [toggle, setToggle] = useState(false)
    const [parties, setParties] = useState([])
    const [candidates, setCandidates] = useState([])
    const [elections, setElections] = useState([])
    const [candidateList, setCandidatesList] = useState([])

    const [data, setData] = useState([])

    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(null)

    const [endDate, setEndDate] = useState(null)




    const minDate = Date.now()

    const [loader, setLoader] = useState(false)



    const toggleElections = () => {
        setToggle(!toggle);
    }

    const handleStartDate = (date) => {
        setStartDate(date)
    }

    const handleEndDate = (date) => {
        setEndDate(date)
    }

    const notifySuccess = (message) => {
        toast.success(message)
    }

    const notifyError = (message) => {
        toast.error(message);
    }



    const getParties = async () => {

        try {

            let response = await axios.get('http://localhost:5000/parties')

            if (response.status == 200) {
                setData(response.data)


            }
            else {
                console.log(response.status)
            }

        } catch (error) {
            console.log(error)
        }

    }



    const getCandidates = async () => {
        try {

            let response = await axios.get('http://localhost:5000/candidates')
            if (response.status == 200) {
                //  setCandidates(response.data.candidates)
            }
            else {
                console.log(response.status)
            }
        } catch (error) {
            console.log(error)
        }
    }



   

    const handleCheckBox = (e) => {
        const value = e.target.value
        const checked = e.target.checked
        const party = JSON.parse(value);

        if (checked) {
            setParties([...parties, party])
        }
        else {
            setParties(parties.filter((e) => e.name !== party.name))
        }
    }

    // const handleRadioButton = (e) =>{

    //     const value = e.target.value;
    //     const checked = e.target.checked
    //     const candidate = JSON.parse(value);
    //     console.log(candidate)
    //     if(checked){
    //           setCandidates([...candidates, candidate]);
    //     }
    //     else{
    //         setCandidates(candidates.filter((e)=>e.name !== candidate.name))
    //     }

    //     console.log(candidates)

    // }


    const handleRadioButton = (e) => {
        const candidateId = e.target.value;
        const checked = e.target.checked;



        if (checked) {
            const selectedCandidate = parties.flatMap(party => party.candidates).find(candidate => candidate._id === candidateId);
            if (selectedCandidate) {
                setCandidates(prevCandidates => [...prevCandidates, selectedCandidate]);
            }
        } else {
            setCandidates(prevCandidates => prevCandidates.filter(candidate => candidate._id !== candidateId));
        }
        console.log('candidates list:  ')
        console.log(candidates)
    }


    // const handleRadioButton = (e) => {
    //     const candidateId = e.target.value;
    //     const partyId = e.target.name;

    //     // Find the selected candidate
    //     const selectedCandidate = findCandidateById(candidateId, partyId);

    //     if (selectedCandidate) {
    //         setCandidates(prevCandidates => {
    //             // Update the selected candidate for the party
    //             return { ...prevCandidates, [partyId]: selectedCandidate };
    //         });
    //     }
    // // };

    // const handleRadioButton = (e) => {
    //     const candidateId = e.target.value;
    //     const partyId = e.target.name;

    //     // Find the selected candidate
    //     const selectedCandidate = findCandidateById(candidateId, partyId);

    //     if (selectedCandidate) {
    //         setCandidates(prevCandidates => {
    //             // Update the selected candidate for the party
    //             const updatedCandidates = { ...prevCandidates };
    //             updatedCandidates[partyId] = selectedCandidate;
    //             return updatedCandidates;
    //         });
    //     }

    //     let cand  = candidates && Object.values(candidates).map(candidate => {
    //         return candidate;
    //     }

    //     )

    //     setCandidatesList(cand)
    //     console.log(candidateList)

    //     // console.log(candidates)
    // };




    // const findCandidateById = (candidateId, partyId) => {
    //     const party = parties.find(party => party._id === partyId);
    //     if (party) {
    //         return party.candidates.find(candidate => candidate._id === candidateId);
    //     }
    //     return null;
    // };





    const getCurrentDateTime = () => {

        const now = new Date();

        return now;




    }

    const formatTime = (_date) => {
        let date = new Date(_date);

   
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        console.log(formattedTime);
        return formattedTime;
    }

    function convertTo12HourFormat(time24) {

        let [hours, minutes, seconds] = time24.split(':').map(Number);

        let period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; 
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        return `${hours}:${minutes}:${seconds} ${period}`;
    }







    const registerElection = async () => {

       setLoader(true)


        try {

            

            let status;


            if (!title || !startDate || !endDate) {
                setTimeout(notifyError('Enter all fields'), 2000)
                setLoader(false)
                return;
            }



            console.log(`Start time: ${convertTo12HourFormat(formatTime(startDate))}`)
            console.log(`End time: ${convertTo12HourFormat(formatTime(endDate))}`)

            if (endDate < startDate || formatTime(endDate) <= formatTime(startDate)) {



                console.log(startDate)
                console.log(endDate)

                setTimeout(notifyError('Please select correct end date'), 2000)
                setLoader(false)
                return;
            }




            console.log(getCurrentDateTime());
            console.log(startDate);

            if (getCurrentDateTime() > startDate) {
                status = 'in progress'
                console.log(status);
            }
            else {
                status = 'not started'
                console.log(status)
            }


            console.log(parties)


            let response = await axios.post('http://localhost:5000/register-election', {

                'title': title,
                'startDate': startDate,
                'endDate': endDate,
                'status': status,
                'parties': parties.map(party => party._id),// ["66110bb401e92f8833038256", "6611241d6e867b064bef5909"],
                'candidates': candidates.map(candidate => candidate._id) //["66110bb401e92f8833038256"]

            })

            if (response.status == 201) {
                notifySuccess('Election Registered!')
                document.getElementById('title').value = ''
                document.getElementById('startDate').value = ''
                document.getElementById('endDate').value = ''
                document.getElementById('link-checkbox').checked = false


                setEndDate("");
                setStartDate("");
                setTitle("")
                setCandidates([])
                setParties([])

                console.log(startDate);
                console.log('registered')
                setLoader(false)
            } else {
                console.log(response.status)
                setLoader(false)
            }

        } catch (error) {
            console.log(error)
            if (error.response.status === 409) {
                notifyError("Election already registered for this time slot");
                setLoader(false)

            } else {
                notifyError(error.message);
                setLoader(false)

            }

        }

    }


    const getElections = async () => {
        try {

            let response = await axios.get("http://localhost:5000/elections");
            if (response.status == 200) {
                setElections(response.data);
                localStorage.setItem("total_elections", response.data.length)
            }
            else {
                console.log(response.status);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (_date) => {

        const date = new Date(_date);

        const options = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        const formattedDate = date.toLocaleString('en-GB', options);
        return formattedDate

    }


    useEffect(() => {
        getParties()
        getElections()

      

    }, [])

    console.log(parties)


    return (
        <div className='flex justify-center'>
            <div className='w-full xl:w-[1700px]'>
                <div className='container'>
                    <button className='bg-green-700 px-2 py-1.5 rounded-md text-white font-medium flex items-center gap-1' onClick={toggleElections}> <IoIosAddCircleOutline /> CREATE ELECTION</button>
                </div>

                {
                    toggle == true ?

                        <div className='overflow-y-auto h-[350px] w-full bg-slate-50 border-2 border-slate-100 rounded-md mt-5 p-5'>

                            <form>

                                <div className='grid grid-flow-col gap-3'>
                                    <div>
                                        <label htmlFor='title' className=' font-medium text-lg'>Title</label>
                                        <input type='text' id='title' name='title' className=' w-full p-2 shadow-md outline-green-700 focus:shadow-none border rounded-md placeholder:text-slate-600 ' placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} />
                                    </div>

                                    <div className='flex flex-col '>

                                        <label htmlFor='StartDate' className=' font-medium text-lg'>Start Date</label>

                                        <DatePicker id='startDate' className='w-full p-2 border shadow-md rounded-md outline-green-700 focus:shadow-none ' placeholderText='Select start date' selected={startDate} onChange={handleStartDate} minDate={minDate} showTimeSelect showTimeInput timeFormat='hh:mm' dateFormat="dd/MM/YYYY; hh:mm aa" />


                                    </div>
                                </div>



                                <div className='grid grid-flow-col gap-2 mt-3 '>


                                    <div className='flex flex-col relative'>


                                        <label htmlFor='EndDate' className=' font-medium text-lg'>End Date</label>

                                        <DatePicker id='endDate' className='w-1/2 p-2 border shadow-md rounded-md outline-green-700 focus:shadow-none ' placeholderText='Select end date' selected={endDate} onChange={handleEndDate} showTimeSelect showYearDropdown showMonthDropdown dateFormat="dd/MM/YYYY; hh:mm aa" /> <SlCalender className='absolute left-[400px] bottom-[14px] text-slate-500' />

                                    </div>
                                </div>

                                <h2 className='font-semibold text-lg mt-3'>Select Parties</h2>


                                <div className='grid grid-flow-col mt-1 w-full gap-6'>





                                    <div className='grid  grid-cols-2 grid-flow-row gap-1 w-full'>

                                        {
                                            data.map((value, index) => {



                                                return <div className='bg-slate-100   px-5 py-1 flex items-center justify-between rounded-md gap-2' >
                                                    {value.name}  <input id="link-checkbox" className='w-4 h-4' value={JSON.stringify({ _id: value._id, name: value.name, candidates: value.candidates })} name='select-parties' type='checkbox' onChange={handleCheckBox} />
                                                </div>

                                            })
                                        }
                                    </div>








                                    <div className='border-2 px-1 py-2 rounded-md w-full'>

                                        {parties.length == 0 && <div className='italic text-slate-400 p-1'> Selected Parties </div>}

                                        <div className='grid  grid-cols-3 grid-flow-row gap-2'>
                                            {
                                                parties.map((value, index) => {
                                                    return <div className='bg-green-700 rounded-full flex justify-center text-center text-white p-1'>
                                                        {value.name}
                                                    </div>
                                                })
                                            }
                                        </div>

                                    </div>


                                </div>

                                <h2 className='font-semibold text-lg mt-3'>Select Candidates</h2>

                                <div className='grid  lg:grid-flow-col mt-1 w-full gap-6  justify-between'>




                                    <div className='border-2 rounded-md  flex  w-[440px] 2xl:w-[590px]'>

                                        {


                                            parties.map((value, index) => (
                                                <div key={index} className='px-4 py-3'>
                                                    <h2 className='font-semibold text-md italic'>{value.name}</h2>
                                                    {
                                                        value.candidates.map((val) => (
                                                            <div key={val._id} className='flex items-center justify-start gap-1'>
                                                                <input
                                                                    type='radio'
                                                                    name={`candidate${index}`}
                                                                    value={val._id}
                                                                    onChange={handleRadioButton}
                                                                />
                                                                <div>{val.name}</div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ))


                                        }
                                    </div>








                                    <div className='border-2 px-1 py-2 rounded-md w-[440px] 2xl:w-[590px] '>

                                        {candidates.length == 0 && <div className='italic text-slate-400 p-1'> Selected Candidates </div>}

                                        <div className='grid  grid-cols-2 grid-flow-row gap-2'>
                                            {
                                                candidates.map((value, index) => {
                                                    return <div className='bg-green-700 rounded-full flex justify-center text-white p-1'>
                                                        {value.name}
                                                    </div>
                                                })
                                            }
                                        </div>

                                    </div>


                                </div>


                            </form>




                            {/* {
                                
                // parties.map((value)=>{
                //     return <div>{value._id}</div>
                // })


                /* console.log(parties); */

                            }

                            <div className='w-full flex justify-start'>


                                <button className='mt-7 p-2 bg-green-700 rounded-md text-white w-1/5 outline hover:text-black font-semibold hover:outline-green-700' onClick={
                                    //                     ()=>{Swal.fire( { 
                                    //   title: "Do you want to proceed?",
                                    //   width: 430,

                                    //   showCancelButton: true,
                                    //   confirmButtonColor: '#15803D',
                                    //   confirmButtonText: "PROCEED",
                                    //   denyButtonText: `Don't save`
                                    // }).then((result) => {

                                    //   if (result.isConfirmed) {
                                    //     registerElection
                                    //     // Swal.fire("Saved!", "", "success");
                                    //   } else if (result.isDenied) {
                                    //     Swal.fire("Changes are not saved", "", "info");
                                    //   }
                                    // });
                                    registerElection


                                }> { loader ?  
                                    <ClipLoader
                                      color='white'
                                      loading={loader}
                                      cssOverride={{
                                        display: "block",
                                        margin: "0 auto",
                                        borderColor: "white",
                                      }}
                                      size={30}
                                      aria-label="Loading Spinner"
                                      data-testid="loader"
                                    /> : 'SUBMIT' }</button>
                            </div>




                        </div> : (<div></div>)
                }

                {toggle == false ?
                    <div className='mt-5  bg-slate-50 p-5 border-2 border-slate-100 rounded-md'>
                        <div className='overflow-y-auto h-[330px] '>


                            <h2 className=' font-semibold text-lg'>Ongoing Events</h2>

                            {
                                (() => {
                                    const inProgressElections = elections.filter((value) => value.status === 'in progress');
                                    if (inProgressElections.length === 0) {
                                        return <p className='text-slate-500 italic'>No ongoing events available</p>;
                                    }
                                    return inProgressElections.map((value) => (
                                        <div key={value.id} className='mt-2 mb-1 p-3 rounded-md bg-white shadow-md'>
                                            <h3 className='font-medium'>{value.title}</h3>
                                            <div className='flex gap-1 text-sm italic font-medium'>
                                                <p className='text-slate-600'>Start Date:</p>
                                                <p>{formatDate(value.startDate)}</p>
                                            </div>
                                            <div className='flex gap-1 text-sm italic font-medium'>
                                                <p className='text-slate-600'>End Date:</p>
                                                <p>{formatDate(value.endDate)}</p>
                                            </div>
                                        </div>
                                    ));
                                })()
                            }

                            <hr class="h-px my-2 w-1/3 bg-slate-300 border-0 " />

                            <h2 className=' font-semibold text-lg mt-3'>Upcoming Events</h2>

                            {
                                (() => {
                                    const inProgressElections = elections.filter((value) => value.status === 'not started');
                                    if (inProgressElections.length === 0) {
                                        return <p className='text-slate-500 italic'>No upcoming events available</p>;
                                    }
                                    return inProgressElections.map((value) => (
                                        <div key={value.id} className='mt-2 mb-1 p-3 rounded-md bg-white shadow-md'>
                                            <h3 className='font-medium'>{value.title}</h3>
                                            <div className='flex gap-1 text-sm italic font-medium'>
                                                <p className='text-slate-600'>Start Date:</p>
                                                <p>{formatDate(value.startDate)}</p>
                                            </div>
                                            <div className='flex gap-1 text-sm italic font-medium'>
                                                <p className='text-slate-600'>End Date:</p>
                                                <p>{formatDate(value.endDate)}</p>
                                            </div>
                                        </div>
                                    ));
                                })()
                            }




                            <h2 className=' font-semibold text-lg mt-3'>Completed</h2>

                            {
                                (() => {
                                    const inProgressElections = elections.filter((value) => value.status === 'completed');
                                    if (inProgressElections.length === 0) {
                                        return <p className='text-slate-500 italic'>No completed events available</p>;
                                    }
                                    return inProgressElections.map((value) => (
                                        <div key={value.id} className='mt-2 mb-1 p-3 rounded-md bg-white shadow-md'>
                                            <h3 className='font-medium'>{value.title}</h3>
                                            <div className='flex gap-1 text-sm italic font-medium'>
                                                <p className='text-slate-600'>Start Date:</p>
                                                <p>{formatDate(value.startDate)}</p>
                                            </div>
                                            <div className='flex gap-1 text-sm italic font-medium'>
                                                <p className='text-slate-600'>End Date:</p>
                                                <p>{formatDate(value.endDate)}</p>
                                            </div>
                                        </div>
                                    ));
                                })()
                            }

                            <hr class="h-px my-2 w-1/3 bg-slate-300 border-0 " />


                        </div>
                    </div> : <div></div>
                }



                <ToastContainer autoClose={1000} hideProgressBar={true} position='top-center' />

            </div>
            <div>

            </div>
        </div>
    )
}

export default Elections