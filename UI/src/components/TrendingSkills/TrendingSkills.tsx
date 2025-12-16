// src/components/TrendingSkills/TrendingSkills.tsx
import React, { useEffect, useState } from "react";
import "./TrendingSkills.css";

// Define the type for skill data
interface TrendingSkill {
  skillName: string;
  projectCount: number;
  developerCount: number;
  growthPercentage: number;
}

const TrendingSkills: React.FC = () => {
  const [skills, setSkills] = useState<TrendingSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch trending skills from API
  const fetchTrendingSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get user token from localStorage (same as your Home.tsx)
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user.accessToken;
      
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(
        "https://localhost:44300/api/Project/GetTrendingSkills",
        {
          method: "GET",
          headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: TrendingSkill[] = await response.json();
      setSkills(data);
      
    } catch (err: any) {
      console.error("Failed to fetch trending skills:", err);
      setError(err.message || "Failed to load trending skills");
      
      // Fallback to sample data if API fails
      setSkills([
        { skillName: "React", projectCount: 4, developerCount: 0, growthPercentage: 20 },
        { skillName: "Node.Js", projectCount: 2, developerCount: 0, growthPercentage: 10 },
        { skillName: "Java", projectCount: 1, developerCount: 1, growthPercentage: 100 },
        { skillName: "JavaScript", projectCount: 1, developerCount: 0, growthPercentage: 5 },
        { skillName: "C#", projectCount: 1, developerCount: 0, growthPercentage: 5 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchTrendingSkills();
    
    // Optional: Refresh data every 5 minutes
    const interval = setInterval(() => {
      fetchTrendingSkills();
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  // Format growth percentage with color based on value
  const getGrowthClass = (growth: number) => {
    if (growth >= 20) return "growth-positive growth-high";
    if (growth >= 10) return "growth-positive growth-medium";
    return "growth-positive";
  };

  if (loading) {
    return (
      <aside className="trending-skills-section" id="trendingSkillsSection">
        <div className="trending-header">
          <h3 className="trending-title">
            <svg className="trending-title-icon" viewBox="0 0 24 24">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
            </svg>
            Trending Skills
          </h3>
          <button className="close-trending" id="closeTrending">
            &times;
          </button>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading trending skills...</p>
        </div>
      </aside>
    );
  }

  if (error && skills.length === 0) {
    return (
      <aside className="trending-skills-section" id="trendingSkillsSection">
        <div className="trending-header">
          <h3 className="trending-title">
            <svg className="trending-title-icon" viewBox="0 0 24 24">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
            </svg>
            Trending Skills
          </h3>
          <button className="close-trending" id="closeTrending">
            &times;
          </button>
        </div>
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={fetchTrendingSkills} className="retry-btn">
            Try Again
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="trending-skills-section" id="trendingSkillsSection">
      <div className="trending-header">
        <h3 className="trending-title">
          <svg className="trending-title-icon" viewBox="0 0 24 24">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
          </svg>
          Trending Skills
        </h3>
        <button 
          className="close-trending" 
          onClick={() => {
            const section = document.getElementById('trendingSkillsSection');
            if (section) section.style.display = 'none';
          }}
          title="Close panel"
        >
          &times;
        </button>
      </div>
      
      {skills.slice(0, 8).map((skill, index) => ( // Show only top 8 skills
        <div className="trending-item" key={index}>
          <div className="trending-skill-info">
            <span className="trending-skill-name">{skill.skillName}</span>
            <div className="trending-skill-stats">
              <div className="trending-stat">
                <span className="trending-stat-value">{skill.projectCount}</span>
                <span>Projects</span>
              </div>
              <div className="trending-stat">
                <span className="trending-stat-value">{skill.developerCount}</span>
                <span>Developers</span>
              </div>
            </div>
          </div>
          <div className={`trending-growth ${getGrowthClass(skill.growthPercentage)}`}>
            <svg className="growth-icon" viewBox="0 0 24 24">
              <path d="M7 14l5-5 5 5z" />
            </svg>
            +{skill.growthPercentage}%
          </div>
        </div>
      ))}
      
      {skills.length === 0 && !loading && !error && (
        <div className="empty-state">
          <p>No trending skills data available</p>
        </div>
      )}
    </aside>
  );
};

export default TrendingSkills;