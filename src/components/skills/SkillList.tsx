import { skillItems } from "#/data/skill.data";
import SkillCardItem from "./SkillCardItem";

function SkillList() {
  return (
    <>
      <ul className="basic-grid">
        {skillItems.map((skill, index) => (
          <SkillCardItem key={skill.alt} item={skill} index={index} />
        ))}
      </ul>
    </>
  );
}

export default SkillList;
