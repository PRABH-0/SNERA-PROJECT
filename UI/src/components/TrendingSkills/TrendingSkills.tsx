import React, { useEffect, useState } from "react";
import type { TrendingSkill } from "./TrendingSkill";


const TrendingSkills: React.FC = () => {
  const [skills, setSkills] = useState<TrendingSkill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await fetch("/api/trending-skills");
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error("Failed to load trending skills:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="trending-card">
        <h3>Trending Skills</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <aside
      className="
        trending-card 
        bg-[var(--card-bg)] 
        p-5 
        rounded-xl 
        shadow-lg 
        border 
        border-[var(--border-color)]
        w-[320px]
        sticky top-[80px]
        h-fit
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2 text-lg">
          <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
          </svg>
          Trending Skills
        </h3>
      </div>

      {/* Skill items */}
      {skills.map((skill, index) => (
        <div
          key={index}
          className="
            trending-item 
            flex 
            justify-between 
            items-center 
            py-3 
            border-b 
            border-[var(--border-color)]
          "
        >
          {/* Skill Info */}
          <div>
            <span className="font-semibold text-[var(--text-primary)] text-[15px]">
              {skill.skillName}
            </span>

            <div className="flex gap-5 text-xs mt-1">
              <div className="text-[var(--text-secondary)]">
                <span className="font-bold text-[var(--text-primary)]">
                  {skill.projectCount}
                </span>{" "}
                Projects
              </div>

              <div className="text-[var(--text-secondary)]">
                <span className="font-bold text-[var(--text-primary)]">
                  {skill.developerCount}
                </span>{" "}
                Developers
              </div>
            </div>
          </div>

          {/* Growth Percentage */}
          <div
            className="
              flex 
              items-center 
              gap-1 
              text-green-500 
              font-bold
            "
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M7 14l5-5 5 5z" />
            </svg>
            +{skill.growthPercentage}%
          </div>
        </div>
      ))}
    </aside>
  );
};

export default TrendingSkills;
