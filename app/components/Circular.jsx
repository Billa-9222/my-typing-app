import React from "react";

export default function Circular({
  label = "label",
  value = "0",
  percent = 0,
  radius = 70,
  stroke = 8,
}) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="text-center">
      <defs>
        <linearGradient id="blueBackground" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient
          id="greenYellowGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#C7FF00" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>

      <circle
        stroke="url(#blueBackground)"
        fill="white"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="url(#greenYellowGradient)"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{
          strokeDashoffset,
          transition: "stroke-dashoffset 1s linear",
        }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="14"
        fill="black"
        className="font-bold"
      >
        {label}
      </text>
      <text
        x="50%"
        y="60%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="16"
        fill="black"
        className="font-bold"
      >
        {value}
      </text>
    </svg>
  );
}





