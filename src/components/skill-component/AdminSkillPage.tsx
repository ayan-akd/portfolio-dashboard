/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Code, Server, Wrench } from "lucide-react";
import Image from "next/image";

// React Icons imports
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as RiIcons from "react-icons/ri";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as DiIcons from "react-icons/di";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";
import * as HiIcons from "react-icons/hi";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as TiIcons from "react-icons/ti";
import * as VscIcons from "react-icons/vsc";
import * as WiIcons from "react-icons/wi";
import { TSkill } from "@/types/types";
import { CustomModal } from "../modals/CustomModal";
import SkillForm from "../forms/SkillForm";

// Icon libraries mapping
const iconLibraries = {
  Fa: FaIcons,
  Si: SiIcons,
  Ri: RiIcons,
  Ai: AiIcons,
  Bi: BiIcons,
  Bs: BsIcons,
  Di: DiIcons,
  Gi: GiIcons,
  Go: GoIcons,
  Hi: HiIcons,
  Im: ImIcons,
  Io: IoIcons,
  Md: MdIcons,
  Ti: TiIcons,
  Vsc: VscIcons,
  Wi: WiIcons,
};

// Dynamic icon component
const DynamicIcon = ({
  iconName,
  className,
}: {
  iconName: string;
  className?: string;
}) => {
  // Handle URL-based icons
  if (iconName.startsWith("http")) {
    return (
      <Image
        src={iconName}
        alt="skill icon"
        width={32}
        height={32}
        className={`object-contain ${className || ""}`}
      />
    );
  }

  try {
    const prefix = iconName.substring(0, 2);
    const name = iconName;
    const IconLibrary = iconLibraries[prefix as keyof typeof iconLibraries];

    if (IconLibrary && IconLibrary[name as keyof typeof IconLibrary]) {
      const Icon = IconLibrary[name as keyof typeof IconLibrary] as any;
      return <Icon className={`text-2xl ${className || ""}`} />;
    }

    // Search through all libraries if prefix doesn't match
    for (const [, library] of Object.entries(iconLibraries)) {
      if (library[iconName as keyof typeof library]) {
        const Icon = library[iconName as keyof typeof library] as any;
        return <Icon className={`text-2xl ${className || ""}`} />;
      }
    }

    // Fallback to default icon
    return <Code className={`text-2xl ${className || ""}`} />;
  } catch (error) {
    console.error(`Error rendering icon: ${iconName}`, error);
    return <Code className={`text-2xl ${className || ""}`} />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "frontend":
      return <Code className="w-5 h-5" />;
    case "backend":
      return <Server className="w-5 h-5" />;
    case "tools":
      return <Wrench className="w-5 h-5" />;
    default:
      return <Code className="w-5 h-5" />;
  }
};

const AdminSkillPage = ({skillData}: { skillData: (TSkill)[] }) => {

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "backend":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "tools":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getSkillsByCategory = () => {
    const categories = {
      frontend: skillData.filter((skill) => skill.category === "frontend"),
      backend: skillData.filter((skill) => skill.category === "backend"),
      tools: skillData.filter((skill) => skill.category === "tools"),
    };
    return categories;
  };

  const skillsByCategory = getSkillsByCategory();


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
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Skill
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Frontend Skills */}
          {skillsByCategory.frontend.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-foreground">Frontend</h2>
                <Badge variant="secondary">
                  {skillsByCategory.frontend.length}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {skillsByCategory.frontend.map((skill) => (
                  <SkillCard
                    key={skill._id}
                    skill={skill}
                    getCategoryColor={getCategoryColor}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Backend Skills */}
          {skillsByCategory.backend.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-foreground">Backend</h2>
                <Badge variant="secondary">
                  {skillsByCategory.backend.length}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {skillsByCategory.backend.map((skill) => (
                  <SkillCard
                    key={skill._id}
                    skill={skill}
                    getCategoryColor={getCategoryColor}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tools Skills */}
          {skillsByCategory.tools.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-foreground">Tools</h2>
                <Badge variant="secondary">
                  {skillsByCategory.tools.length}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {skillsByCategory.tools.map((skill) => (
                  <SkillCard
                    key={skill._id}
                    skill={skill}
                    getCategoryColor={getCategoryColor}
                  />
                ))}
              </div>
            </div>
          )}
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
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <DynamicIcon iconName={skill.icon} className="text-primary" />
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
              content={
                <SkillForm
                  data={skill}
                  edit={true}
                />
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSkillPage;
