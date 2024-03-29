import {Request, Response} from "express";
import {IJobSeeker} from "../types/SchemaTypes";
import {StandardResponse} from "../dto/StandardResponse";
import JobSeekerModel from "../model/JobSeeker.model";
import tryCatch from "../utils/TryCatch";
import {CompanyModel} from "../model/Company.model";

export const createJobSeeker = tryCatch(async (req: Request, res: Response) => {
  const jobSeeker: IJobSeeker = req.body;
  console.log(req.body)
  const jobSeekerModel = new JobSeekerModel(jobSeeker);
  const savedJobSeeker = await jobSeekerModel.save();
  const response: StandardResponse<string> = {
    statusCode: 201,
    msg: "job seeker created successfully",
    data: savedJobSeeker._id
  }
  res.status(201).send(response)
});

export const updateJobSeeker = tryCatch(async (req: Request, res: Response) => {
  const foundJobSeeker = await JobSeekerModel.findOne({_id: req.params.id, deleteStatus: false});
  if (!foundJobSeeker) {
    res.status(404).send({
      statusCode: 404,
      msg: `${req.params.id} job seeker not found`
    });
    return;
  }
  await JobSeekerModel.findOneAndUpdate({_id: req.params.id}, req.body);
  res.status(204).send();
});

export const getJobSeeker = tryCatch(async (req: Request, res: Response) => {
  const jobSeeker = await JobSeekerModel.findOne({_id: req.params.id, deleteStatus: false})
    .populate({
      path: 'user',
      select: 'fName lName email'
    });
  if (!jobSeeker) {
    res.status(404).send({
      statusCode: 404,
      msg: `${req.params.id} job seeker not found`
    });
    return
  }
  const response: StandardResponse<any> = {
    statusCode: 200,
    msg: "OK",
    data: jobSeeker
  }
  res.status(201).send(response)
});

export const deleteJobSeeker = tryCatch(async (req: Request, res: Response) => {
  const jobSeeker = await JobSeekerModel.findOne({_id: req.params.id, deleteStatus: false});
  if (!jobSeeker) {
    res.status(404).send({
      statusCode: 404,
      msg: `${req.params.id} job seeker not found`
    });
    return;
  }
  await JobSeekerModel.findOneAndUpdate({_id: req.params.id}, {deleteStatus: true});
  res.status(204).send();
});

export const getAllJobSeekers = tryCatch(async (req: Request, res: Response) => {
  const query: any = req.query;
  const page: number = query.page || 1;
  const size: number = query.size || 10;
  const jobSeekers = await JobSeekerModel
    .find({deleteStatus: false})
    .limit(size)
    .skip(size * (page - 1))
    .populate({
      path: 'user',
      select: 'fName lName email'
    });
  const countDocuments = await JobSeekerModel.countDocuments({deleteStatus: false});
  const pageCount = Math.ceil(countDocuments / size);
  const response: StandardResponse<any> = {
    statusCode: 200,
    msg: "OK",
    data: jobSeekers,
    pageCount: pageCount
  }
  res.status(200).send(response);
});
