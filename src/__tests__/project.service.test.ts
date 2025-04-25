import { ProjectService } from "../services/project.service";
import { projectRepo } from "../repositories/project.repository";
import { Project } from "../models/project.entity";
import { User } from "../models/user.entity";
import { userRepo } from "../repositories/user.repository";
import { createProject } from "../controllers/project.controller";
import { CreateProjectDTO, ProjectResponseDTO } from "../dtos/project.dto";
import { HttpException } from "../exceptions/http.exception";

jest.mock("../repositories/project.repository");

describe("ProjectService - getProjects", () => {
  let projectService: ProjectService;

  beforeEach(() => {
    projectService = new ProjectService();
  });

  it("should return paginated projects and total count", async () => {
    const mockProjects: Project[] = [
      {
        id: 1,
        name: "Project B",
        description: "Sample project description",
        startDate: new Date("2025-12-1"),
        endDate: new Date("2022-11-1"),
        createdBy: { id: 1, email: "", firstName: "", lastName: "", password: "" } as User,
        tasks: [],
      },
    ];
    const mockTotal = 1;

    (projectRepo.findAndCount as jest.Mock).mockResolvedValue([mockProjects, mockTotal]);

    const page = 1;
    const limit = 1;

    const result = await projectService.getProjects(page, limit);

    expect(projectRepo.findAndCount).toHaveBeenCalledWith({
      skip: 0,
      take: 1,
      order: { id: "DESC" },
    });

    expect(result).toEqual({
      projects: mockProjects,
      total: mockTotal,
    });
  });
});

//create project

describe("createProject", () => {
  beforeEach(() => {
    (userRepo.findOneBy as jest.Mock) = jest.fn().mockImplementation(() => Promise.resolve(null));
    (projectRepo.save as jest.Mock) = jest.fn();
    projectService = new ProjectService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  let projectService: ProjectService;
  const createProjectDTO: CreateProjectDTO = {
    userId: 1,
    name: "Test Project",
    description: "A test project",
    startDate: "2025-05-01",
    endDate: "2025-05-10",
  };

  const mockUser: User = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "hashed",
    projects: [],
    tasks: [],
    role: {
      id: 1,
      name: "manager",
      users: [],
    },
  };

  const mockProject: Project = {
    id: 1,
    name: "Test Project",
    description: "A test project",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-10"),
    createdBy: mockUser,
    tasks: [],
  };

  const expectedResponse = {
    description: "A test project",
    name: "Test Project",
  };

  it("should create a project successfully", async () => {
    (userRepo.findOneBy as jest.Mock).mockResolvedValue(mockUser);
    (projectRepo.save as jest.Mock).mockResolvedValue(mockProject);

    const result = await projectService.createProject(createProjectDTO);

    expect(userRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(expect.objectContaining(expectedResponse));
  });
});
