export type TProject = {
    title: string;
    images: string[];
    description: string;
    technology: string[];
    liveLink: string;
    clientRepo: string;
    serverRepo?: string;
  };
  
  
  export type TUser = {
    name: string;
    email: string;
    password: string;
  };
  
  export type TBlog = {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: string;
};

export type TEducation = {
  degree: string;
  institution: string;
  department?: string;
  year?: string;
};

export type TExperience = {
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies?: string[];
};

export interface TSkill {
  _id?: string;
  category: "frontend" | "backend" | "tools" | "database"
  name: string;
  icon: string;
}


export type TAbout = {
  _id?: string;
  image: string;
  name: string;
  title: string;
  bio: string;
  education: TEducation[];
  experience?: TExperience[];
  address: string;
  resumeLink?: string;
};

  export type TRUser = {
    email: string;
    name: string;
    __v: number;
    _id: number;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type TMessage = {
    message: string;
    email: string;
    name: string;
     markAsRead?: boolean;
  };
  