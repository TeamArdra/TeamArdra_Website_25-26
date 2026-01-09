import React from "react";

export default function BoardCard({ member, index, width, height }) {
  return (
    <div
      className="flex-shrink-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-3xl border border-blue-500/30 shadow-2xl overflow-hidden backdrop-blur-sm"
      style={{ 
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        {/* Placeholder for image */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-6 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">{index + 1}</span>
        </div>
        
        {/* Member info */}
        <h3 className="text-white text-lg md:text-xl font-bold tracking-wider uppercase mb-2 text-center">
          {member.name}
        </h3>
        <p className="text-blue-300 text-sm md:text-base tracking-widest uppercase text-center">
          {member.role}
        </p>
      </div>
    </div>
  );
}