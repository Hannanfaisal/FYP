


import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IoCloseCircle } from "react-icons/io5";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const Results = () => {
    const email = useSelector((state) => state.user.email)
    const user = useSelector((state) => state.user)
    const auth = useSelector((state) => state.user.auth)

    const [data, setData] = useState([])
    const [selectedResult, setSelectedResult] = useState(null)
    const [dialog, setDialog] = useState(false)
    const [selectedCandidate, setSelectedCandidate] = useState("")
    const [resultsByElection, setResultsByElection] = useState({})

    const notifyError = (status) => {
        toast.error(status)
    }

    const notifySuccess = (status) => {
        toast.success(status)
    }

    const formatDate = (date) => {
        const parsedDate = new Date(date)
        return `${parsedDate.getMonth() + 1}/${parsedDate.getDate()}/${parsedDate.getFullYear()}`
    }

    const formatDateYear=(date) => {
        const parsedDate = new Date(date)
        return `${parsedDate.getFullYear()}`
    }

    const getElections = async () => {
        try {
            let response = await axios.get("http://localhost:5000/elections")
            if (response.status === 200) {
                setData(response.data)
                console.log(data)
                localStorage.setItem('total_results', response.data.length)
            } else {
                console.log(response.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getResultByElectionList = async (id) => {
        try {
            let response = await axios.get(`http://localhost:5000/resultListByElection/${id}`)
            if (response.status === 200) {
                setResultsByElection(prevState => ({ ...prevState, [id]: response.data.results }))
            } else {
                console.log(response.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

   

    const getSliceColor = (value) => {
        if (value > 20) return '#228032'
        if (value > 10) return '#2bc235'
        return '#ff1500'
    }

    const getSelectedCandidate = async (id) => {
        try {
            let response = await axios.get(`http://localhost:5000/selected/candidate/${id}`)
            if (response.status === 200) {
                setSelectedCandidate(response.data.selectedCandidate)
            } else {
                console.log(response.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getElections()
    }, [])

    useEffect(() => {
        data.forEach((election) => {

            if(election.status === 'completed'){
                getSelectedCandidate(election._id)
            }
            if (election.status === 'in progress' || election.status === 'completed') {
                console.log('election id:')
                console.log(election._id)
                getResultByElectionList(election._id)
            }
        })
    }, [data])

    return (
        <div className='flex justify-center '>
            <div className='w-full lg:w-[1700px] bg-slate-50 border-2 border-slate-100 p-5 rounded-md'>
                <div>
                    <h1 className='font-semibold text-xl'>Results</h1>
                </div>
                <div className='mt-5' id='table'>
                    <table className='w-full'>
                        <thead className='bg-green-700 h-10 shadow-md'>
                            <tr className='text-md text-white text-start'>
                                <th className='font-semibold'>No.</th>
                                <th className='font-semibold'>Title</th>
                                <th className='font-semibold'>Date</th>
                                <th className='font-semibold'>Status</th>
                                <th className='font-semibold'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value, index) => (
                                (value.status === 'in progress' || value.status === 'completed') && (
                                    <tr className='text-center bg-slate-100 border-b-2' key={index}>
                                        <td className='p-2 font-semibold'>{index + 1}.</td>
                                        <td className='p-2'>{value.title}</td>
                                        <td>{formatDate(value.createdAt)}</td>
                                        <td className='italic text-white'>
                                            {value.status === 'completed' ?
                                                <div className='bg-red-700 rounded w-1/2 px-1 py-0.5 mx-auto'>{value.status.toUpperCase()}</div> :
                                                <div className='bg-green-700 rounded w-1/2 px-1 py-0.5 mx-auto'>{value.status.toUpperCase()}</div>
                                            }
                                        </td>
                                        <td>
                                            <button className='px-2 py-0.5 me-1 bg-red-600 text-white rounded' onClick={() => {
                                                setSelectedResult(value)
                                                setDialog(true)
                                            }}>
                                                VIEW
                                            </button>
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {dialog && (
                <div className='overflow-y-auto h-[400px] absolute min-xl:w-[1300px] rounded-md border bg-slate-200 p-5' id='result'>
                    <div className='flex justify-end'>
                        <div className='hover:cursor-pointer hover:scale-150 hover:duration-150 text-red-600' onClick={() => setDialog(false)}>
                            <IoCloseCircle size={20} />
                        </div>
                    </div>
                    <h2 className='font-semibold text-xl flex justify-center'>{selectedResult.title} {formatDateYear(selectedResult.startDate)} Results</h2>
                    <div className='mt-4'>
                        <div className='flex gap-3'>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Election: </h2>
                                <h2>{selectedResult.title}</h2>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>StartDate: </h2>
                                <h2>{formatDate(selectedResult.startDate)}</h2>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>EndDate: </h2>
                                <h2>{formatDate(selectedResult.endDate)}</h2>
                            </div>
                            <div className='flex gap-1'>
                                <h2 className='font-semibold text-slate-700'>Status: </h2>
                                <h2>{selectedResult.status.toUpperCase()}</h2>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div className='mt-5 w-full'>
                                <h2 className='font-semibold mb-3'>Participated Parties:</h2>
                                <table className='w-full '>
                                    <thead className='bg-green-700 text-white h-8'>
                                        <tr>
                                            <th>No.</th>
                                            <th>Parties</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-slate-100 '>
                                        {selectedResult.parties.map((value, index) => (
                                            <tr className='border-b-2 text-center' key={index}>
                                                <td className='p-1 font-semibold'>{index + 1}.</td>
                                                <td>{value.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='mt-5 w-full'>
                                <h2 className='font-semibold mb-3'>Participated Candidates:</h2>
                                <table className='w-full'>
                                    <thead className='bg-green-700 text-white h-8'>
                                        <tr>
                                            <th>No.</th>
                                            <th>Candidates</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-slate-100'>
                                        {selectedResult.candidates.map((value, index) => (
                                            <tr className='border-b-2 text-center' key={index}>
                                                <td className='p-1 font-semibold'>{index + 1}.</td>
                                                <td>{value.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <PieChart width={700} height={260}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={true}
                                data={resultsByElection[selectedResult._id] || []}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#228032"
                                label={({ name, value }) => `${name} (${value} Votes)`}
                                color='#030503'
                            >
                                {(resultsByElection[selectedResult._id] || []).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getSliceColor(entry.value)} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div className='flex mt-2 gap-2'>
                        <h2 className='font-semibold'>Elected Candidate: </h2>
                        {selectedResult.status === 'completed' ?  selectedCandidate : <h1 className='italic text-slate-700'>Not elected yet</h1>}
                    </div>
               
                </div>
            )}
            <ToastContainer autoClose={1000} hideProgressBar={true} position='top-center' />
        </div>
    )
}

export default Results
