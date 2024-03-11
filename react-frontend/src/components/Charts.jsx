import * as React from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './style.css';

export function PolarizingGenresHistogram({ genreNames, sdRatings }) {
    const data = {
      labels: genreNames,
      datasets: [
        {
          label: 'Standard Deviation of Ratings',
          data: sdRatings,
          backgroundColor: '#E0E0E0',
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#FFF", 
          },
          title: {
            display: true,
            text: 'Standard Deviation',
            color: '#FFF',
          },
        },
        x: {
          ticks: {
            color: "#FFF", 
          },
          title: {
            display: true,
            text: 'Genre Name',
            color: '#FFF',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  }

export function BestRatedGenresHistogram({ genreNames, ratings }) {
    const data = {
      labels: genreNames,
      datasets: [
        {
          label: 'Average Ratings',
          data: ratings,
          backgroundColor: '#E0E0E0',
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#FFF", 
          },
          title: {
            display: true,
            text: 'Average Rating',
            color: '#FFF',
          },
        },
        x: {
          ticks: {
            color: "#FFF", 
          },
          title: {
            display: true,
            text: 'Genre Name',
            color: '#FFF',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  }

export function MostReviewedGenresHistogram({ genreNames, reviewscount }) {
    const data = {
      labels: genreNames,
      datasets: [
        {
          label: 'Ratings Count',
          data: reviewscount,
          backgroundColor: '#E0E0E0',
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#FFF", 
          },
          title: {
            display: true,
            text: 'Ratings Count',
            color: '#FFF',
          },
        },
        x: {
          ticks: {
            color: "#FFF", 
          },
          title: {
            display: true,
            text: 'Genre Name',
            color: '#FFF',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  }

export function MostReleasedGenresHistogram({ genreNames, releasescount }) {
    const data = {
      labels: genreNames,
      datasets: [
        {
          label: 'Release Count',
          data: releasescount,
          backgroundColor: '#E0E0E0',
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#FFF", 
          },
          title: {
            display: true,
            text: 'Release Count',
            color: '#FFF',
          },
        },
        x: {
          ticks: {
            color: "#FFF", 
          },
          title: {
            display: true,
            text: 'Genre Name',
            color: '#FFF',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  }

export function PolarizingGenresLeaderboard({genreNames}) {
    return(
    <div className="polarizing-genres-leaderboard">
    {genreNames.slice(0, 3).map((item, index) => (
      <div key={item} className={`leaderboard-entry ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}>
        <span className="leaderboard-rank">{index + 1}</span>
        <span className="leaderboard-name">{item}</span>
      </div>))}
    </div>
)}

export function BestRatedGenresLeaderboard({genreNames}) {
    return(
    <div className="best-genres-leaderboard">
    {genreNames.slice(0, 3).map((item, index) => (
      <div key={item} className={`leaderboard-entry ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}>
        <span className="leaderboard-rank">{index + 1}</span>
        <span className="leaderboard-name">{item}</span>
      </div>))}
    </div>)
}

export function MostReviewedGenresLeaderboard({genreNames}) {
    return(
    <div className="most-reviewd-genres-leaderboard">
    {genreNames.slice(0, 3).map((item, index) => (
      <div key={item} className={`leaderboard-entry ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}>
        <span className="leaderboard-rank">{index + 1}</span>
        <span className="leaderboard-name">{item}</span>
      </div>))}
    </div>
)}

export function MostReleasedGenresLeaderboard({genreNames}) {
    return(
    <div className="most-released-genres-leaderboard">
    {genreNames.slice(0, 3).map((item, index) => (
      <div key={item} className={`leaderboard-entry ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}>
        <span className="leaderboard-rank">{index + 1}</span>
        <span className="leaderboard-name">{item}</span>
      </div>))}
    </div>
)}