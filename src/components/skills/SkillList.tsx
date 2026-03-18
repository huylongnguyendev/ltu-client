import { skillItems } from "#/data/skill.data";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "@tanstack/react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";

function SkillList() {
  return (
    <>
      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillItems.map((skill) => (
          <li key={skill.name} className="group">
            <Card className="hover:shadow-lg dark:shadow-accent smooth">
              <CardContent className="relative">
                <LazyLoadImage
                  src={skill.img}
                  alt={skill.alt}
                  className="absolute w-full h-100 transition-opacity duration-500"
                  onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                  style={{ opacity: 0 }}
                />
              </CardContent>
              <CardHeader>
                <Link
                  to={skill.url}
                  className="group-hover:text-primary smooth"
                >
                  <CardTitle>{skill.name}</CardTitle>
                </Link>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SkillList;
