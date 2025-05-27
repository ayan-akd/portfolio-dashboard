"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Code, Server, Wrench, Database } from "lucide-react";
import Image from "next/image";
import { TSkill } from "@/types/types";
import { CustomModal } from "../modals/CustomModal";
import SkillForm from "../forms/SkillForm";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "frontend":
      return <Code className="w-5 h-5" />;
    case "backend":
      return <Server className="w-5 h-5" />;
    case "tools":
      return <Wrench className="w-5 h-5" />;
    case "database":
      return <Database className="w-5 h-5" />;
    default:
      return <Code className="w-5 h-5" />;
  }
};

const AdminSkillPage = ({ skillData }: { skillData: TSkill[] }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "backend":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "tools":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "database":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getCategoryHeaderColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "text-blue-600";
      case "backend":
        return "text-green-600";
      case "tools":
        return "text-purple-600";
      case "database":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getSkillsByCategory = () => {
    const categories = {
      frontend: skillData.filter((skill) => skill.category === "frontend"),
      backend: skillData.filter((skill) => skill.category === "backend"),
      tools: skillData.filter((skill) => skill.category === "tools"),
      database: skillData.filter((skill) => skill.category === "database"),
    };
    return categories;
  };

  const skillsByCategory = getSkillsByCategory();

  const CategorySection = ({ 
    category, 
    skills, 
    icon, 
    title 
  }: { 
    category: string; 
    skills: TSkill[]; 
    icon: React.ReactNode; 
    title: string; 
  }) => {
    if (skills.length === 0) return null;

    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className={getCategoryHeaderColor(category)}>
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <Badge variant="secondary">
            {skills.length}
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <SkillCard
              key={skill._id}
              skill={skill}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Skill Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your technical skills and proficiency levels
          </p>
        </div>

        {/* Add New Skill Modal */}
        <CustomModal
          trigger={
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Skill
            </Button>
          }
          content={<SkillForm edit={false} />}
          title="Add New Skill"
        />
      </div>

      {/* Skills Display */}
      {skillData.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Code className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No skills found
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Start building your skill portfolio by adding your first skill.
            </p>
            <CustomModal
              trigger={
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Skill
                </Button>
              }
              content={<SkillForm edit={false} />}
              title="Add New Skill"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Frontend Skills */}
          <CategorySection
            category="frontend"
            skills={skillsByCategory.frontend}
            icon={<Code className="w-6 h-6" />}
            title="Frontend"
          />

          {/* Backend Skills */}
          <CategorySection
            category="backend"
            skills={skillsByCategory.backend}
            icon={<Server className="w-6 h-6" />}
            title="Backend"
          />

          {/* Tools Skills */}
          <CategorySection
            category="tools"
            skills={skillsByCategory.tools}
            icon={<Wrench className="w-6 h-6" />}
            title="Tools"
          />

          {/* Database Skills */}
          <CategorySection
            category="database"
            skills={skillsByCategory.database}
            icon={<Database className="w-6 h-6" />}
            title="Database"
          />
        </div>
      )}
    </div>
  );
};

// Skill Card Component
const SkillCard = ({
  skill,
  getCategoryColor,
}: {
  skill: TSkill;
  getCategoryColor: (category: string) => string;
}) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center p-1">
              <Image
                src={skill.icon}
                alt={`${skill.name} icon`}
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <CardTitle className="text-lg">{skill.name}</CardTitle>
              <Badge
                className={`flex gap-2 items-center text-xs ${getCategoryColor(
                  skill.category
                )}`}
              >
                {getCategoryIcon(skill.category)} {skill.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">

          {/* Action Buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <CustomModal
              title="Edit Skill"
              trigger={
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              }
              content={<SkillForm data={skill} edit={true} />}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSkillPage;
