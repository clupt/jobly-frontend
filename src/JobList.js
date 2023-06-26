import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import { useState, useEffect } from "react";
import JoblyApi from "./api";


/** JobList
*
* Handle searches and displays jobs
*
* state:
*     jobs:  [{title, company, salary, equity},...]
*     isSearching: t/f, querying to server for jobs list

* JobList ==> { JobCardList,  SearchForm }
*/

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currFilter, setCurrFilter] = useState(undefined);
  const [hasErrors, setHasErrors] = useState(false);

  //on first render, displays all companies
  useEffect(function fetchJobsOnLaunch() {
    async function getJobs() {
      try {
        const jobs = await JoblyApi.getJobs(currFilter);
        setJobs(jobs);
      } catch (error) {
        setHasErrors(true);
      }
      setIsSearching(false);
    }
    setIsSearching(true);
    setHasErrors(false);
    getJobs();
  }, [currFilter]);

  if (isSearching === true) {
    return <h1>I am searching for jobs...</h1>;
  }

  /** Update with search term and trigger rerender of company list */
  function handleJobSearch(searchTerms) {
    setCurrFilter(searchTerms);
  }

  //if currently looking for companies, show loading page
  //display valid companies and keep currfilter in searchbox
  return (
    <div className="JobList">
      <SearchForm
        handleSearch={handleJobSearch}
        currSearchTerms={currFilter}
      />
      {((jobs.length > 0) && !hasErrors)
        ? <JobCardList jobs={jobs} />
        : "Sorry, no results were found!"}
    </div>
  );
}

export default JobList;