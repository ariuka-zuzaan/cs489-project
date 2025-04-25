import { ProjectService } from "../../services/project.service";
import { projectRepo } from "../../repositories/project.repository"; // adjust import if needed
import { Project } from "models/project.entity";
import { User } from "models/user.entity";

jest.mock("../../repositories/project.repository");

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
