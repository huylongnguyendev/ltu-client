import type { SkillItem } from "#/@types/skills.type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Link } from "@tanstack/react-router";

function SkillCardItem({ item, index }: { item: SkillItem; index: number }) {
  return (
    <>
      <li className="group">
        <Link
          to={item.url}
          search={{
            type: item.name.toLocaleUpperCase() as any,
            page: 1,
          }}
        >
          <Card className="hover:shadow-lg dark:shadow-accent smooth">
            <CardContent>
              <img
                src={item.img}
                alt={item.alt}
                className="w-full h-44 object-contain transition-opacity duration-500"
                loading={index > 3 ? "lazy" : "eager"}
                onLoad={(e) => (e.currentTarget.style.opacity = "1")}
              />
            </CardContent>
            <CardHeader>
              <CardTitle className="group-hover:text-primary smooth">
                {item.name}
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </li>
    </>
  );
}

export default SkillCardItem;
