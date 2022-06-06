import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError,NotFoundError, UnauthenticatedError} from "../errors/index.js";

const createJob = async (req,res) => {
    const {company, position} = req.body;
    if(!company || !position){
        throw new BadRequestError('Please provide all value');
    }

    //The req user userId has been set up in the unauthenticated middle-ware
    req.body.createdBy = req.user.userId; 
    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json({job});

}


const deleteJob= async (req,res) => {
    res.send('delete job ')

}
const getAllJobs = async (req,res) => {

    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({jobs,totalJobs: jobs.length, numOfPages: 1});
   

}

// working on the update job
const updateJob= async (req,res) => {
    res.send('updateJob job ')
}

const showStats = async(req,res) => {
    res.send('show stats'); 
}


export { createJob, deleteJob, getAllJobs, updateJob, showStats }



