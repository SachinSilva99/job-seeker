import {FaFilter, FaSearch} from "react-icons/fa";
import JobCard from "../../components/cards/JobCard.tsx";
import {useEffect, useState} from "react";
import {getAllVacancies} from "../../service/get/GetAllVacancies.ts";

export interface Vacancy {
  company: string,
  jobTitle: string,
  description: string,
  category: string,
  subCategory: string,
  jobType: string,
  modality: string,
  salary?: number,
  endingDate: string,
  startingDate: string,
  deleteStatus: boolean
}

const HomeHero = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  useEffect(() => {
    const loadVacancies = async () => {
      const vacancies: Vacancy[] = await getAllVacancies(1, 10);
      setVacancies(vacancies);
    }
    loadVacancies();
  }, []);
  console.log(vacancies)
  return (
    <div className='px-4 md:px-8 lg:px-16 min-h-[90vh]'>
      <p className="text-lg mt-8 mb-4">
        Find your job now!
      </p>
      {/*search bar container*/}
      <div className='border-0 md:border-2 border-slate-300 flex
        flex-col md:flex-row gap-2 md:items-center justify-center  md:justify-between rounded-lg  mb-12 '>
        {/*search bar*/}
        <div className='flex gap-2 justify-between md:mx-4 '>
          <div className="flex items-center">
              <span className="absolute">
                <FaSearch color={'#CDC7C7'}/>
              </span>
            <input
              className='pl-8 py-1 border-b-2 border-slate-300 min-w-[300px] focus:outline-none'
              type="text"
              placeholder='Search job'
            />
          </div>
          <div className='block xl:hidden  cursor-pointer'>
            <FaFilter size={'40'} color={'#149BFC'}/>
          </div>
        </div>
        {/*filters*/}
        <div className={'gap-10 hidden items-center justify-center xl:flex mt-6'}>
          <div>
            <select id="jobType"
                    className="block w-full p-2 mb-6 text-sm focus:outline-none border-b-2 border-slate-300">
              <option selected>Job Type</option>
              <option value="fullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div className=''>
            <select id="modality"
                    className="block w-full p-2 mb-6 text-sm focus:outline-none border-b-2 border-slate-300">
              <option selected>Modality</option>
              <option value="inSite">In-Site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className=''>
            <select id="salaryRange"
                    className="block w-full p-2 mb-6 text-sm focus:outline-none border-b-2 border-slate-300">
              <option selected>Salary Range</option>
              <option value="salaryRange1">20K - 100k</option>
              <option value="salaryRange2">100k - 500k</option>
              <option value="salaryRange3">more than 1000K</option>
            </select>
          </div>
        </div>
        {/*search button and sort*/}
        <div>
          <div className='hidden items-center md:flex m-4'>
            <button className="bg-btnBlue h-[60px] w-40 text-white">
              Search
            </button>
            <div className='mx-4'>
              <select id="salaryRange"
                      className="block w-40 h-[60px]  text-sm focus:outline-none border-2 border-slate-300 px-8">
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='my-4 flex flex-col gap-8'>
        {vacancies.length !== 0 && (
          vacancies.map(vacancy =>
            <JobCard
            jobTitle={vacancy.jobTitle}
            company={vacancy.company}
            description={vacancy.description}
            category={vacancy.category}
            subCategory={vacancy.subCategory}
            jobType={vacancy.jobType}
            modality={vacancy.modality}
            endingDate={vacancy.endingDate}
            salary={vacancy.salary}
            startingDate={vacancy.startingDate}
            createdAt={vacancy.createdAt}

            />)
        )}
      </div>
    </div>
  );
};

export default HomeHero;
