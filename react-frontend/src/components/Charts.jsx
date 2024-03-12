import * as React from "react";
import { Bar, Pie } from 'react-chartjs-2';
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

export function GenrePieChart ({ genreData }) {
    const data = {
      labels: ['5 stars', 'between 4 and 5', 'between 3 and 4', 'between 2 and 3', 'between 1 and 2', 'less than 1 star'],
      datasets: [
        {
          data: [
            genreData['5 stars'],
            genreData['between 4 and 5'],
            genreData['between 3 and 4'],
            genreData['between 2 and 3'],
            genreData['between 1 and 2'],
            genreData['less than 1 star'],
          ],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#C9CBCF',
          ],
          hoverOffset: 4,
        },
      ],
    };
    const options = {
        plugins: {
            legend: {
                position: 'right',
            },
        },
        radius: '120%', 
        maintainAspectRatio: false,
    };

  
    return <Pie data={data} />;
  };