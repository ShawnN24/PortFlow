import React, { useEffect, useState } from 'react';
import GithubMetricButton from './GithubMetricButton';

export default function RepoMetrics() {
  const [starCount, setStarCount] = useState<number>(0);
  const [viewCount, setViewCount] = useState<number>(0);
  const [followCount, setFollowCount] = useState<number>(0);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/ShawnN24/Github-Traffic-API/refs/heads/cache/metrics.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setViewCount(data.PortFlow.traffic.total_views); // or data.total_uniques
      })
      .catch(() => {
        setViewCount(0);
      });
    fetch("https://github-traffic-api.onrender.com/traffic/PortFlow", {
      method: "GET",
      headers: {
        "github-traffic-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setViewCount(data.total_views); // or data.total_uniques
      })
      .catch(() => {
        setViewCount(0);
      });
    fetch("https://api.github.com/repos/ShawnN24/PortFlow")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStarCount(data.stargazers_count);
      })
      .catch(() => {
        setStarCount(0);
      })
    fetch("https://api.github.com/users/ShawnN24")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFollowCount(data.followers);
      })
      .catch(() => {
        setFollowCount(0);
      })
  }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center gap-4 mt-4">
        <div className='flex gap-4'>
          <GithubMetricButton count={starCount} name={'Stars'} textHREF={'https://github.com/ShawnN24/PortFlow'} numHREF={'https://github.com/ShawnN24/PortFlow/stargazers'} />
          <GithubMetricButton count={viewCount} name={'Views'} textHREF={'https://github.com/ShawnN24/PortFlow'} numHREF={'https://github.com/ShawnN24/Github-Traffic-API'} />
        </div>
        <GithubMetricButton count={followCount} name={'Follow @ ShawnN24'} textHREF={'https://github.com/ShawnN24'} numHREF={'https://github.com/ShawnN24?tab=followers'} />
      </div>
    </div>
  );
}