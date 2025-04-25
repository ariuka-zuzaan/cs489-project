import { Request, Response } from "express";
import * as projectController from "../../controllers/project.controller";
import { ProjectService } from "../../services/project.service";
import { Project } from "../../models/project.entity";
import { ProjectResponseDTO } from "../../dtos/project.dto";
import { UserResponseDTO } from "../../dtos/user.dto";
import { User } from "models/user.entity";

jest.mock("../../services/project.service");
const mockService = new ProjectService() as jest.Mocked<ProjectService>;

const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("ProjectController", () => {
  beforeEach(() => jest.clearAllMocks());

  it("GET /projects - should return all projects", async () => {
    const req = { query: { page: "1", limit: "10" } } as unknown as Request;
    const res = mockRes();
    const projects = [
      {
        id: 1,
        name: "Project B",
        description: "Sample project description",
        startDate: new Date("2025-12-1"),
        endDate: new Date("2022-11-1"),
        createdBy: { id: 1, email: "", firstName: "", lastName: "", password: "" } as User,
        tasks: [],
      },
    ] as Project[];

    mockService.getProjects.mockResolvedValue({
      projects: projects,
      total: 1,
    });
    // (projectController as any).projectService = mockService;

    await projectController.getProjects(req, res);
    expect(res.json).toHaveBeenCalledWith({
      data: projects,
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    });
  });

  //   it("GET /projects/:id - should return one project", async () => {
  //     const req = { params: { id: "1" } } as unknown as Request;
  //     const res = mockRes();
  //     const project = { id: 1, name: "Single Project" } as Project;

  //     mockService.getProjectById = jest.fn().mockResolvedValue(project);
  //     (projectController as any).projectService = mockService;

  //     await projectController.getProjectById(req, res);
  //     expect(res.json).toHaveBeenCalledWith(project);
  //   });

  //   it("POST /projects - should create a project", async () => {
  //     const req = {
  //       body: { name: "New Project" },
  //       user: { id: 1 },
  //     } as any;
  //     const res = mockRes();
  //     const created = {
  //       id: 1,
  //       name: "New Project",
  //       description: "",
  //       startDate: "2025-04-01",
  //       endDate: "2025-04-02",
  //       user: { id: 1, email: "test@gmail.com", firstName: "test", lastName: "user", roleName: "developer" } as UserResponseDTO,
  //     } as ProjectResponseDTO;

  //     mockService.createProject.mockResolvedValue(created);
  //     (projectController as any).projectService = mockService;

  //     await projectController.createProject(req, res);
  //     expect(res.status).toHaveBeenCalledWith(201);
  //     expect(res.json).toHaveBeenCalledWith(created);
  //   });

  //   it("PUT /projects/:id - should update a project", async () => {
  //     const req = {
  //       params: { id: "1" },
  //       body: { name: "Updated Project" },
  //       user: { id: 1 },
  //     } as any;
  //     const res = mockRes();
  //     const updated = {
  //       id: 1,
  //       name: "New Project",
  //       description: "",
  //       startDate: "2025-04-01",
  //       endDate: "2025-04-02",
  //       user: { id: 1, email: "test@gmail.com", firstName: "test", lastName: "user", roleName: "developer" } as UserResponseDTO,
  //     } as ProjectResponseDTO;

  //     mockService.updateProject.mockResolvedValue(updated);
  //     (projectController as any).projectService = mockService;

  //     await projectController.updateProject(req, res);
  //     expect(res.json).toHaveBeenCalledWith(updated);
  //   });

  //   it("DELETE /projects/:id - should delete a project", async () => {
  //     const req = {
  //       params: { id: "1" },
  //       user: { id: 1 },
  //     } as any;
  //     const res = mockRes();

  //     mockService.deleteProject.mockResolvedValue();
  //     (projectController as any).projectService = mockService;

  //     await projectController.deleteProject(req, res);
  //     expect(res.status).toHaveBeenCalledWith(204);
  //     expect(res.json).toHaveBeenCalledWith();
  //   });
});
