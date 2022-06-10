import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError,NotFoundError, UnauthenticatedError} from "../errors/index.js";
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from "mongoose";
import moment from "moment";

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

    const jobId = req.params.id;
    const job = await Job.findOne({_id: jobId});
    
    if(!job){
         throw new NotFoundError(`No job with id: ${jobId}`);
    }
    
    // check for permission 
    checkPermissions(req.user,job.createdBy);
    await job.remove();
    res.status(StatusCodes.OK).json({msg: 'Success! Job removed'});


}
const getAllJobs = async (req,res) => {

    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({jobs,totalJobs: jobs.length, numOfPages: 1});
   

}

// working on the update job
const updateJob= async (req,res) => {
    // make some change over here
    const jobId = req.params.id;
    
    const {company,position,status, jobLocation} = req.body;
    // find the job in the database by the jobid
    if(!company || !position){
        throw new BadRequestError('Please provide all values'); 
    }

    const job = await Job.findOne({_id: jobId});
    if(!job){
         throw new NotFoundError(`No job with id: ${jobId}`);

    }



    // checek for the permission
    checkPermissions(req.user , job.createdBy); 
    

    // update the information inside the job
    job.position = position;
    job.company  = company;
    job.jobLocation = jobLocation;
    job.status = status 
    await job.save();
    res.status(StatusCodes.OK).json({job});
      
}

const showStats = async(req,res) => {
    let stats = await Job.aggregate([
        {$match: {createdBy: mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {_id: '$status', count: {$sum: 1}} }

    ]);

    stats = stats.reduce((total ,current)=>{
        const {_id: title, count} = current;
        total[title] = count
        return total
      },{})

      // set up the default value for the status
      const defaultStats = {
          pending: stats.pending || 0 ,
          interview: stats.interview || 0,
          declined:  stats.declined || 0 ,
      }


      // Aggregation based on month and year 
    let monthlyApplications = await Job.aggregate(
        [
            {$match: {createdBy: mongoose.Types.ObjectId(req.user.userId)}},
            {
                $group : {
                    _id: {year: {$year: '$createdAt'}, month: {$month: '$createdAt'}},
                    count: {$sum: 1}
                }
            },
            {$sort: {'_id.year':-1 , '_id.month':-1}},
            {$limit: 6}
        ]
    ); 

    // convert date and month to a clean format to be rendered on the front-end 
    monthlyApplications =  monthlyApplications.map((item)=>{
        const {_id, count} = item;
        const {month,year} =_id;
        const date = moment().month(month -1 ).year(year)
        .format('MMM Y')
        return {date, count}

    })
    
      //javascript reduce over here 
      // return the number of pending, interview .....
    res.status(StatusCodes.OK).json({defaultStats , monthlyApplications});


}


export { createJob, deleteJob, getAllJobs, updateJob, showStats }



