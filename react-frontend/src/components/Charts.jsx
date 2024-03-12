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
          cutout: '80%',
          borderWidth: 0,
        },
      ],
    };
    const defaultOptions = {
      maintainAspectRatio: true,
      aspectRatio: 1,
      plugins: {
          legend: {
              position: 'right',
              labels: {
                color: 'white', 
                font: {
                  size: 12 
                }
              }
          },
          tooltip: {
              titleFont: {
                  size: 14, 
                  color: 'white', 
              },
              bodyFont: {
                  size: 12, 
                  color: 'white', 
              }
          }
      },
      layout: {
          padding: {
              left: 50,
              right: 50,
          },
      },

    };
  return <Pie data={data} options={defaultOptions}/>;
  };

export const GenreHistogram = ({ data, selectedGenre }) => {
    const genreData = data.find(genre => genre.genre === selectedGenre);
  
    const chartData = {
      labels: ['Openness', 'Agreeableness', 'Emotional Stability', 'Conscientiousness', 'Extraversion'],
      datasets: [
        {
          label: `${selectedGenre} Personality Traits`,
          data: [
            genreData.avg_openness,
            genreData.avg_agreeableness,
            genreData.avg_emotional_stability,
            genreData.avg_conscientiousness,
            genreData.avg_extraversion,
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        x: {
          ticks: {
            color: 'white', 
          },
          title: {
            display: true,
            text: 'Personality Traits',
            color: 'white',
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)', 
          }
        },
        y: {
          beginAtZero: false, 
          suggestedMin: 3, 
          suggestedMax: 4, 
          ticks: {
            color: 'white', 
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)', 
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        }
      }
    };
    return <Bar data={chartData} options={options}/>;
  };

export const GenrePersonalitysHistogram = ({ personalityGenres, selectedTrait }) => {
    const chartData = {
      labels: personalityGenres.map(genre => genre.genre),
      datasets: [
        {
          label: `Average ${selectedTrait}`,
          data: personalityGenres.map(genre => genre[`avg_${selectedTrait.toLowerCase().replace(' ', '_')}`]),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        x: {
          ticks: {
            color: 'white', 
          },
          title: {
            display: true,
            text: 'Personality Traits',
            color: 'white',
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)', 
          }
        },
        y: {
          ticks: {
            color: 'white', 
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)', 
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        }
      }
    };

    return <Bar data={chartData} options={options} />;
  };