import JobCard from "./JobCard";

/** JobCardList:
 *
 * takes in list of jobs and renders individual job cards
 *
 * props:
 *    - array of jobs:  [{title, companyName, salary, equity},...]
 *
 * state:
 *    - none
 *
 * { JobList, CompanyDetails } => JobCardList => JobCard */

function JobCardList({ jobs }) {

  return (
    <div className="JobCardList">
      {jobs.map(j => <JobCard key={j.id} jobData={j}/>)}
    </div>
  );
}
export default JobCardList;